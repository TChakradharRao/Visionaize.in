/* eslint-disable prettier/prettier */
import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { seedEnquiries, Enquiry } from "@/lib/seed-enquiries";

function requireAuth() {
  return localStorage.getItem("adminAuth") === "true";
}

function EnquiryDashboard() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<Enquiry[]>([]);

  useEffect(() => {
    if (!requireAuth()) {
      window.location.href = "/admin/login";
      return;
    }
    // load static seed for now
    setItems(seedEnquiries.slice().sort((a, b) => b.id - a.id));
  }, []);

  const filtered = useMemo(() => {
    if (!query) return items;
    const q = query.toLowerCase();
    return items.filter((it) =>
      [it.name, it.company, it.email, it.phone, it.sourcePage, String(it.formId)]
        .filter(Boolean)
        .some((s) => s!.toLowerCase().includes(q)),
    );
  }, [items, query]);

  function exportCsv() {
    const header = ["ID", "Name", "Company", "Phone", "Email", "Source Page", "Form ID", "Submitted At", "Message"];
    const rows = filtered.map((r) => [
      r.id,
      r.name,
      r.company || "",
      r.phone || "",
      r.email || "",
      r.sourcePage || "",
      r.formId || "",
      r.submittedAt,
      (r.message || "").replace(/\n/g, " "),
    ]);
    const csv = [header, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `enquiries-${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <AdminLayout title="Enquiry Dashboard">
      <div className="mb-4 flex gap-3">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name / email / phone / page / form id" className="flex-1 rounded-xl border px-4 py-3 shadow-sm focus:outline-none" />
        <button onClick={exportCsv} className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#92C122] to-[#0A78B9] text-white shadow-md">Export CSV</button>
      </div>

      <div className="bg-white border rounded-2xl shadow-lg overflow-hidden">
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-50 text-left text-xs text-gray-600">
            <tr>
              <th className="px-4 py-3 w-12">ID</th>
              <th className="px-4 py-3 w-48">Name</th>
              <th className="px-4 py-3 w-48">Company</th>
              <th className="px-4 py-3 w-36">Phone</th>
              <th className="px-4 py-3 w-56">Email</th>
              <th className="px-4 py-3 w-40">Source Page</th>
              <th className="px-4 py-3 w-24">Form ID</th>
              <th className="px-4 py-3 w-44">Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="border-t hover:bg-gray-50 align-top">
                <td className="px-4 py-4 font-medium text-gray-700">{r.id}</td>
                <td className="px-4 py-4 break-words whitespace-normal">
                  <div className="font-semibold text-gray-800">{r.name}</div>
                  {r.message && <div className="text-sm text-gray-500 mt-1">{r.message}</div>}
                </td>
                <td className="px-4 py-4 break-words whitespace-normal text-gray-700">{r.company}</td>
                <td className="px-4 py-4 break-words whitespace-normal text-gray-700">{r.phone}</td>
                <td className="px-4 py-4 break-words whitespace-normal text-gray-700">{r.email}</td>
                <td className="px-4 py-4 break-words whitespace-normal">
                  {r.sourcePage ? (
                    <a href={r.sourcePage} target="_blank" rel="noopener noreferrer" className="text-[#0A78B9] font-medium">View Page</a>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
                <td className="px-4 py-4 text-gray-700">{r.formId}</td>
                <td className="px-4 py-4 text-gray-600">{new Date(r.submittedAt).toLocaleString()}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={8} className="px-4 py-6 text-center text-gray-500">No enquiries match your search.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
export const Route = createFileRoute("/admin/enquiries")({
 head: () => ({ meta: [{ title: "Enquiry Dashboard" }] }),
 component: EnquiryDashboard,
})
