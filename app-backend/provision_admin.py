"""Operator-only command: python provision_admin.py existing-user@example.com"""
import argparse
from app.database.database import SessionLocal
from app.models import User, Role

if __name__ == "__main__":
    parser=argparse.ArgumentParser(description="Grant bank admin access to an existing verified account")
    parser.add_argument("email")
    args=parser.parse_args()
    with SessionLocal() as db:
        user=db.query(User).filter(User.email == args.email).first()
        if not user:
            parser.error("Register the account first; no matching user exists")
        role=db.query(Role).filter(Role.name == "Admin").first()
        if not role:
            role=Role(name="Admin"); db.add(role); db.flush()
        user.role_id=role.id
        db.commit()
        print("Bank admin access granted to",args.email)
