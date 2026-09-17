import SeverityBadge from "../../components/ui/SeverityBadge";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Search, FileText, LogOut } from "lucide-react";
import api from "../../api/axios";
import { useAuthStore } from "../../store/authStore";
import type { AnalysisResponse } from "../../types/analysis";

type Profile = { id: number; full_name: string; email: string; phone: string | null; created_at: string; scan_count: number; is_admin: boolean };
type Report = { scan_id: number; explanation: string; claim_note: string; source: string; claim?: { amount: number; loss_percent: number; explanation: string; status: string; inputs: Record<string, string> } };
const money = (n: number) => new Intl.NumberFormat("en-IN", {style: "currency", currency: "INR"}).format(n);
const date = (s: string) => new Date(s).toLocaleString();
const fieldClass = "w-full rounded-lg border border-slate-300 bg-white p-3 text-sm focus:outline-blue-600";
const buttonClass = "rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white disabled:opacity-50";

export default function AdminPage() {
 const navigate = useNavigate();
 const logout = useAuthStore(s => s.logout);
 const [search, setSearch] = useState("");
 const [query, setQuery] = useState("");
 const [offset, setOffset] = useState(0);
 const [users, setUsers] = useState<Profile[]>([]);
 const [total, setTotal] = useState(0);
 const [profile, setProfile] = useState<Profile | null>(null);
 const [scans, setScans] = useState<AnalysisResponse[]>([]);
 const [scanOffset, setScanOffset] = useState(0);
 const [scanTotal, setScanTotal] = useState(0);
 const [scan, setScan] = useState<AnalysisResponse | null>(null);
 const [report, setReport] = useState<Report | null>(null);
 const [error, setError] = useState("");
 const [loading, setLoading] = useState(true);
 const [scanLoading, setScanLoading] = useState(false);
 const [reportLoading, setReportLoading] = useState(false);
 const [busy, setBusy] = useState(false);
 const [reload, setReload] = useState(0);
 useEffect(() => {
   const controller = new AbortController();
   api.get("/admin/users", {params: {search: query, offset}, signal: controller.signal}).then(r => { setUsers(r.data.users); setTotal(r.data.total); }).catch(() => {if (!controller.signal.aborted) setError("Unable to load profiles. Please retry.");}).finally(() => {if (!controller.signal.aborted) setLoading(false);});
   return () => controller.abort();
 }, [query, offset, reload]);
 useEffect(() => {
   if (!profile) return;
   const controller = new AbortController();
   api.get(`/admin/users/${profile.id}/scans`, {params: {offset: scanOffset}, signal: controller.signal}).then(r => {setScans(r.data.scans); setScanTotal(r.data.total);}).catch(() => {if (!controller.signal.aborted) setError("Unable to load scan history. Please retry.");}).finally(() => {if (!controller.signal.aborted) setScanLoading(false);});
   return () => controller.abort();
 }, [profile, scanOffset, reload]);
 useEffect(() => {
   if (!scan) return;
   const controller = new AbortController();
   api.get(`/admin/scans/${scan.id}/report`, {signal: controller.signal}).then(r => setReport(r.data)).catch(() => {if (!controller.signal.aborted) setError("Unable to load the report. Please retry.");}).finally(() => {if (!controller.signal.aborted) setReportLoading(false);});
   return () => controller.abort();
 }, [scan, reload]);
 function selectProfile(u: Profile) {setProfile(u); setScans([]); setScan(null); setReport(null); setScanOffset(0); setScanTotal(0); setScanLoading(true); setError("");}
 async function estimate(event: FormEvent<HTMLFormElement>) {
   event.preventDefault();
   if (!scan) return;
   const form = new FormData(event.currentTarget);
   const data = Object.fromEntries(form.entries());
   setBusy(true); setError("");
   try {const r = await api.post(`/admin/scans/${scan.id}/estimate`, data); setReport(r.data);}
   catch {setError("Estimate could not be calculated. Check all policy and yield fields and try again.");}
   finally {setBusy(false);}
 }
 function download() {
   if (!report || !scan || !profile) return;
   const content = ["AGRIVISION AI | PMFBY BANK REVIEW", `Generated: ${new Date().toISOString()}`, `User: ${profile.full_name} (${profile.email})`, `Scan: #${scan.id} | ${date(scan.created_at)} | ${scan.image_name}`, `Location: ${scan.latitude}, ${scan.longitude}`, "", "AI RESULTS SUMMARY", report.explanation, "", report.claim_note, "", report.claim ? `${report.claim.status}\nEstimated claim: ${money(report.claim.amount)}\n${report.claim.explanation}\n${Object.entries(report.claim.inputs).map(([k,v]) => `${k}: ${v}`).join("\n")}` : "Claim amount: awaiting policy and yield inputs", "", "Confirm enrollment, notified crop/season/unit, insured area, official yield evidence and prior payments with the insurer. A scan is supporting evidence, not an approved claim.", `Guidance: ${report.source}`].join("\n");
   const url = URL.createObjectURL(new Blob([content], {type: "text/plain;charset=utf-8"}));
   const a = document.createElement("a"); a.href=url; a.download=`pmfby-scan-${scan.id}.txt`; a.click(); URL.revokeObjectURL(url);
 }
 return <div className="min-h-screen bg-slate-50 text-slate-800">
  <header className="border-b bg-white px-6 py-5"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4"><div className="flex items-center gap-3"><ShieldCheck className="text-blue-700" size={32}/><div><h1 className="text-xl font-bold">AgriVision ? Bank portal</h1><p className="text-sm text-slate-500">PMFBY crop damage & claim review</p></div></div><button className="flex items-center gap-2 text-sm" onClick={() => {logout(); navigate("/admin/login");}}><LogOut size={18}/>Sign out</button></div></header>
  <main className="mx-auto max-w-7xl space-y-6 p-6">
   <div><h2 className="text-3xl font-bold">Farmer & scan review</h2><p className="mt-2 text-slate-500">Review registered profiles, inspect AI findings and prepare a provisional claim report.</p></div>
   {error && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4">{error} <button className="underline" onClick={() => {setError(""); setReload(n => n+1);}}>Retry</button></div>}
   <div className="grid items-start gap-6 lg:grid-cols-[330px_1fr]">
    <aside className="rounded-2xl border bg-white p-5">
     <h3 className="mb-4 font-semibold">User profiles <span className="text-slate-400">({total})</span></h3>
     <form className="mb-4 flex gap-2" onSubmit={e => {e.preventDefault();setLoading(true);setQuery(search);setOffset(0);setReload(n=>n+1);}}><input aria-label="Search profiles by name or email" className={fieldClass} value={search} onChange={e=>setSearch(e.target.value)} placeholder="Name or email"/><button aria-label="Search" className={buttonClass}><Search size={18}/></button></form>
     {loading ? <p role="status">Loading profiles?</p> : users.length === 0 ? <p className="text-sm text-slate-500">No profiles found.</p> : users.map(u=><button key={u.id} disabled={busy} onClick={()=>selectProfile(u)} className={`mb-2 w-full rounded-xl border p-3 text-left ${profile?.id===u.id ? "border-blue-500 bg-blue-50" : "border-slate-100 hover:bg-slate-50"}`}><span className="block font-medium">{u.full_name}</span><span className="block break-all text-xs text-slate-500">{u.email}</span><span className="mt-2 block text-xs">{u.scan_count} scans ? {u.is_admin ? "Administrator" : "User"}</span></button>)}
     <div className="mt-3 flex justify-between"><button disabled={offset===0 || loading} onClick={()=>{setLoading(true);setOffset(offset-25);}} className="text-sm disabled:opacity-30">Previous</button><button disabled={offset+25>=total || loading} onClick={()=>{setLoading(true);setOffset(offset+25);}} className="text-sm disabled:opacity-30">Next</button></div>
    </aside>
    <section className="space-y-5">
     {!profile ? <div className="rounded-2xl border bg-white p-12 text-center text-slate-500"><FileText className="mx-auto mb-4" size={36}/>Select a profile to review its scan reports.</div> : <>
      <div className="rounded-2xl border bg-white p-5"><h3 className="text-xl font-semibold">{profile.full_name}</h3><p className="break-all text-sm text-slate-500">{profile.email} ? {profile.phone || "Phone not provided"}</p><p className="mt-2 text-xs text-slate-500">User #{profile.id} ? Joined {date(profile.created_at)}</p></div>
      <div className="overflow-hidden rounded-2xl border bg-white"><h3 className="p-5 font-semibold">Scan history ({scanTotal})</h3>{scanLoading ? <p className="p-5" role="status">Loading scans?</p> : scans.length===0 ? <p className="p-5 text-slate-500">This user has no saved scans.</p> : <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-slate-50 text-slate-500"><tr><th className="p-3">Scan / crop</th><th className="p-3">Stress</th><th className="p-3">Severity</th><th className="p-3">Report</th></tr></thead><tbody>{scans.map(s=><tr key={s.id} className="border-t"><td className="p-3">#{s.id} ? {s.crop_type}<span className="block text-xs text-slate-500">{date(s.created_at)}</span></td><td className="p-3">{s.stress_class}</td><td className="p-3"><SeverityBadge label={s.severity_label} /></td><td className="p-3"><button disabled={busy} className="font-medium text-blue-700" onClick={()=>{setScan(s);setReport(null);setReportLoading(true);setError("");setReload(n=>n+1);}}>Review</button></td></tr>)}</tbody></table></div>}<div className="flex justify-between p-4"><button disabled={scanOffset===0 || scanLoading} onClick={()=>{setScanLoading(true);setScanOffset(scanOffset-25);}} className="text-sm disabled:opacity-30">Previous</button><button disabled={scanOffset+25>=scanTotal || scanLoading} onClick={()=>{setScanLoading(true);setScanOffset(scanOffset+25);}} className="text-sm disabled:opacity-30">Next</button></div></div>
      {reportLoading && <p role="status">Preparing report?</p>}
      {report && scan && <article className="space-y-5 rounded-2xl border bg-white p-6"><div className="flex flex-wrap justify-between gap-3"><h3 className="text-xl font-semibold">Quick report ? Scan #{scan.id}</h3><button className={buttonClass} onClick={download}>Download report</button></div>
       <p className="text-sm text-slate-500">{scan.image_name} ? Coordinates: {scan.latitude}, {scan.longitude}</p>
       <div className="rounded-xl bg-blue-50 p-4"><h4 className="mb-2 font-semibold">AI result explanation</h4><p className="text-sm leading-6">{report.explanation}</p></div>
       <div><h4 className="font-semibold">PMFBY yield-loss estimate</h4><p className="mt-2 text-sm leading-6 text-slate-600">{report.claim_note}</p></div>
       <form key={scan.id} onSubmit={estimate} onChange={()=>setReport(r=>r ? {...r,claim:undefined} : r)} className="grid gap-4 sm:grid-cols-2">
        {[["policy_reference","Policy / enrollment reference"],["season","Notified crop & season (e.g. Paddy, Kharif 2026)"],["insurance_unit","Notified insurance unit"],["sum_insured","Total sum insured for covered area (INR)"],["threshold_yield","Official threshold yield (kg/ha)"],["actual_yield","Official actual unit yield (kg/ha)"]].map(([name,label])=><label key={name} className="text-sm font-medium">{label}<input className={`${fieldClass} mt-1`} name={name} required disabled={busy} maxLength={100} type={name.includes("yield") || name==="sum_insured" ? "number" : "text"} min={name==="actual_yield" ? "0" : "0.01"} max={name==="sum_insured" ? "1000000000" : "1000000"} step="0.01"/></label>)}
        <label className="flex items-start gap-2 text-sm sm:col-span-2"><input type="checkbox" required disabled={busy}/>I have checked the policy and entered official yields for the same notified crop, season and insurance unit.</label>
        <button className={buttonClass} disabled={busy}>{busy ? "Calculating?" : "Calculate provisional claim"}</button>
       </form>
       {report.claim && <div role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 p-5"><p className="text-sm">Provisional claim estimate</p><p className="my-2 text-3xl font-bold">{money(report.claim.amount)}</p><p className="text-sm leading-6">{report.claim.explanation}</p><p className="mt-2 text-xs">{report.claim.status}</p></div>}
       <p className="text-xs leading-5 text-slate-500">Confirm enrollment, insured area, notified coverage, yield evidence and prior payments with the insurer. This report supports review and does not approve a claim. Inputs are used for this report only; download it to retain the estimate. <a className="text-blue-700 underline" href={report.source} target="_blank" rel="noreferrer">PMFBY calculation guidance</a></p>
      </article>}
     </>}
    </section>
   </div>
  </main>
 </div>;
}
