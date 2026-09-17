import os
import unittest
os.environ.update(APP_NAME="test", APP_VERSION="1", HOST="localhost", PORT="8001", MYSQL_HOST="localhost", MYSQL_PORT="3306", MYSQL_DATABASE="test", MYSQL_USER="test", MYSQL_PASSWORD="test")
from fastapi import FastAPI
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
from app.database.database import Base, get_db
from app.models import User, Role
from app.models.analysis import Analysis
from app.api.admin import router as admin_router
from app.api.analysis import router as analysis_router
from app.api.auth import router as auth_router
from app.core.security import token_for, hash_password, verify_password
from app.services.claim_service import ClaimInputs, estimate_claim

class AdminTests(unittest.TestCase):
    def setUp(self):
        self.engine = create_engine("sqlite://", connect_args={"check_same_thread":False}, poolclass=StaticPool)
        Base.metadata.create_all(self.engine)
        self.db = sessionmaker(bind=self.engine)()
        self.db.add_all([Role(id=1,name="Admin"),Role(id=4,name="Farmer")])
        self.db.add_all([User(id=1,full_name="Bank",email="bank@example.com",password="legacy",role_id=1),User(id=2,full_name="Farmer",email="farmer@example.com",password="legacy",role_id=4)])
        self.db.add(Analysis(id=1,user_id=2,image_name="crop.jpg",crop_type="Paddy",quality="good",stage="flowering",stage_confidence=.8,stress_class="disease",stress_confidence=.9,severity=40,severity_label="moderate",latitude=11,longitude=77))
        self.db.commit()
        app=FastAPI()
        for router in [admin_router,analysis_router,auth_router]: app.include_router(router)
        app.dependency_overrides[get_db]=lambda:self.db
        self.client=TestClient(app)
    def tearDown(self):
        self.client.close(); self.db.close(); self.engine.dispose()
    def headers(self, uid): return {"Authorization":"Bearer "+token_for(self.db.get(User,uid))}
    def test_admin_access(self):
        self.assertEqual(self.client.get("/admin/users").status_code,401)
        self.assertEqual(self.client.get("/admin/users",headers=self.headers(2)).status_code,403)
        r=self.client.get("/admin/users",headers=self.headers(1))
        self.assertEqual(r.status_code,200)
        self.assertEqual(r.json()["total"],2)
        self.assertNotIn("password",str(r.json()))
    def test_registration_cannot_promote(self):
        r=self.client.post("/auth/register",json={"full_name":"Intruder","email":"x@example.com","password":"password","role_id":1})
        self.assertEqual(r.status_code,403)
    def test_admin_login_and_legacy_migration(self):
        r=self.client.post("/auth/admin/login",json={"email":"farmer@example.com","password":"legacy"})
        self.assertEqual(r.status_code,403)
        r=self.client.post("/auth/admin/login",json={"email":"bank@example.com","password":"legacy"})
        self.assertEqual(r.status_code,200)
        self.assertTrue(self.db.get(User,1).password.startswith("pbkdf2_sha256$"))
        self.assertTrue(verify_password("legacy",self.db.get(User,1).password))
    def test_scan_ownership(self):
        self.assertEqual(self.client.get("/analysis/user/1",headers=self.headers(2)).status_code,403)
        self.assertEqual(self.client.get("/analysis/1").status_code,401)
        self.assertEqual(self.client.get("/analysis/1",headers=self.headers(2)).status_code,200)
    def test_report_and_estimate(self):
        data={"policy_reference":"P1","insurance_unit":"Unit A","season":"Paddy Kharif 2026","sum_insured":"100000","threshold_yield":"2000","actual_yield":"1500"}
        r=self.client.post("/admin/scans/1/estimate",headers=self.headers(1),json=data)
        self.assertEqual(r.status_code,200)
        self.assertEqual(r.json()["claim"]["amount"],25000)
        self.assertIn("saved AI",r.json()["explanation"])
        data["actual_yield"]="2500"
        self.assertEqual(estimate_claim(ClaimInputs(**data))["amount"],0)
        data["actual_yield"]="0"
        self.assertEqual(estimate_claim(ClaimInputs(**data))["amount"],100000)
        data["threshold_yield"]="0"
        self.assertEqual(self.client.post("/admin/scans/1/estimate",headers=self.headers(1),json=data).status_code,422)
    def test_new_scan_retains_explanation(self):
        data={"user_id":2,"image_name":"new.jpg","crop_type":"Paddy","quality":"good","stage":"flowering","stage_confidence":0.8,"stress_class":"disease","stress_confidence":0.9,"severity":0.4,"severity_label":"moderate","latitude":11,"longitude":77,"ai_explanation":"Visible lesions affect part of the leaf."}
        result=self.client.post("/analysis",headers=self.headers(2),json=data)
        self.assertEqual(result.status_code,200)
        scan_id=result.json()["id"]
        report=self.client.get(f"/admin/scans/{scan_id}/report",headers=self.headers(1))
        self.assertIn(data["ai_explanation"],report.json()["explanation"])
        data["user_id"]=1
        self.assertEqual(self.client.post("/analysis",headers=self.headers(2),json=data).status_code,403)

    def test_role_revocation_and_bad_token(self):
        headers=self.headers(1)
        self.db.get(User,1).role_id=4
        self.db.commit(); self.db.expire_all()
        self.assertEqual(self.client.get("/admin/users",headers=headers).status_code,403)
        self.assertEqual(self.client.get("/admin/users",headers={"Authorization":"Bearer forged"}).status_code,401)

if __name__ == "__main__": unittest.main()
