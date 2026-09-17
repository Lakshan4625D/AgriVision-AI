import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import api from "../api/axios";
export default function AdminRoute() {
 const [status, setStatus] = useState("loading");
 useEffect(() => { let active = true; api.get("/auth/me").then(r => { if (active) setStatus(r.data.is_admin ? "allowed" : "denied"); }).catch(() => { if (active) setStatus("denied"); }); return () => { active = false; }; }, []);
 if (!localStorage.getItem("access_token")) return <Navigate to="/admin/login" replace />;
 if (status === "loading") return <p className="p-8" role="status">Verifying bank administrator access?</p>;
 return status === "allowed" ? <Outlet /> : <Navigate to="/admin/login" replace />;
}
