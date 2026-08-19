/* eslint-disable prettier/prettier */
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { api, getCurrentUserRole } from "@/lib/api";
import type { ColumnDef, ContactSubmission } from "@/lib/api";
import { getAccessToken } from '@/lib/api';

function requireAuth() {
  if (typeof window === 'undefined') return false;
  return Boolean(getAccessToken() || window.localStorage.getItem('visionaize_access_token'));
}

function EnquiryDashboard() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<ContactSubmission[]>([]);
  const [columns, setColumns] = useState<ColumnDef[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    async function loadEnquiries() {
      setLoading(true);
      try {
        const res = await api.admin.contactList({ page, pageSize, q: query || undefined });
        setItems(res.items || []);
        setTotal(res.total || 0);

        try {
          const colRes = await api.admin.columns();
          if (colRes.items.length > 0) {
            setColumns(colRes.items.filter((c) => c.enabled));
          }
        } catch (columnErr) {
          console.warn('Admin columns endpoint unavailable, using default columns:', columnErr);
          setColumns([
            { key: 'name', label: 'Name', type: 'text', enabled: true },
            { key: 'company', label: 'Company', type: 'text', enabled: true },
            { key: 'phone', label: 'Phone', type: 'text', enabled: true },
            { key: 'email', label: 'Email', type: 'text', enabled: true },
          ]);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        if (message.includes("401") || message.includes("403")) {
          window.location.href = '/admin/login';
          return;
        }
        setError('Unable to load enquiries. Please try again later.');
        console.error('Enquiry load failed:', err);
      } finally {
        setLoading(false);
      }
    }

    if (!requireAuth()) {
      window.location.href = '/admin/login';
      return;
    }

    loadEnquiries();
  }, [page, query]);

  const visibleColumns = useMemo(() => {
    return columns.length
      ? columns.filter((c) => c.enabled)
      : [
          { key: 'name', label: 'Name', type: 'text', enabled: true },
          { key: 'company', label: 'Company', type: 'text', enabled: true },
          { key: 'phone', label: 'Phone', type: 'text', enabled: true },
          { key: 'email', label: 'Email', type: 'text', enabled: true },
        ];
  }, [columns]);

  const getValue = (item: ContactSubmission, key: string) => {
    const value = (item as Record<string, unknown>)[key];
    if (value !== undefined && value !== null && key !== 'payload') return String(value);
    const payloadValue = item.payload?.[key as string];
    return payloadValue !== undefined && payloadValue !== null ? String(payloadValue) : "";
  };

  const filtered = items;

  function exportCsv() {
    const header = ["ID", ...visibleColumns.map((c) => c.label), "Message", "Source Page", "Submitted At"];
    (async () => {
      try {
        const all = await api.admin.contactList({ page: 1, pageSize: total || 10000, q: query || undefined });
        const rows = (all.items || []).map((r) => [
          r.id,
          ...visibleColumns.map((c) => getValue(r, c.key)),
          (r.message || "").replace(/\n/g, " "),
          r.source_page || "",
          r.created_at,
        ]);
        const csv = [header, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""') }`).join(",")).join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `enquiries-${new Date().toISOString().slice(0,10)}.csv`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      } catch (err) {
        console.error('Export failed', err);
        setError('Export failed.');
      }
    })();
  }

  const canExport = getCurrentUserRole() !== 'viewer';

  return (
    <AdminLayout title="Enquiry Dashboard">
      {error && (
        <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}
      {loading ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-600">
          Loading enquiries...
        </div>
      ) : (
        <>
          <div className="mb-4 flex gap-3">
            <input value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} placeholder="Search by name / email / phone / page / form id" className="flex-1 rounded-xl border px-4 py-3 shadow-sm focus:outline-none" />
            {canExport && (
              <button onClick={exportCsv} className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#92C122] to-[#0A78B9] text-white shadow-md cursor-pointer">Export CSV</button>
            )}
          </div>

          

          <div className="bg-white border rounded-2xl shadow-lg overflow-x-auto">
            <table className="min-w-[960px] w-full table-auto text-sm">
              <thead className="bg-gray-50 text-left text-xs text-gray-600">
                <tr>
                  <th className="px-4 py-3 w-12 text-center">S.No</th>
                  {visibleColumns.map((column) => (
                    <th key={column.key} className="px-4 py-3">{column.label}</th>
                  ))}
                  <th className="px-4 py-3 w-72 text-left">Message</th>
                  <th className="px-4 py-3 w-40 text-left">Source Page</th>
                  <th className="px-4 py-3 w-44 text-right">Submitted At</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, index) => (
                  <tr key={r.id} className="border-t hover:bg-gray-50 align-top">
                    <td className="px-4 py-4 font-medium text-gray-700 text-center">{(page - 1) * pageSize + index + 1}</td>
                    {visibleColumns.map((column) => (
                      <td key={column.key} className="px-4 py-4 break-words whitespace-normal text-gray-700">
                        {getValue(r, column.key) || <span className="text-gray-400">—</span>}
                      </td>
                    ))}
                    <td className="px-4 py-4 break-words text-gray-700 max-w-xl">{r.message}</td>
                    <td className="px-4 py-4 break-words whitespace-normal text-left">
                      {r.source_page ? (
                        <a href={r.source_page} target="_blank" rel="noopener noreferrer" className="text-[#0A78B9] font-medium">View Page</a>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-gray-600 text-right whitespace-nowrap">{new Date(r.created_at).toLocaleString()}</td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={visibleColumns.length + 4} className="px-4 py-6 text-center text-gray-500">No enquiries match your search.</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-600">Showing {(total === 0) ? 0 : (page - 1) * pageSize + 1}–{Math.min(page * pageSize, total)} of {total} enquiries</div>
            <div className="flex gap-2">
              <button onClick={async () => { if (page <= 1) return; setPage(page - 1); }} disabled={page === 1} className="px-3 py-2 rounded-xl border bg-white hover:bg-gray-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block align-middle">
                  <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="px-3 py-2 rounded-xl border bg-white">Page {page}</div>
              <button onClick={async () => { const max = Math.max(1, Math.ceil(total / pageSize)); if (page >= max) return; setPage(page + 1); }} disabled={page >= Math.ceil(total / pageSize)} className="px-3 py-2 rounded-xl border bg-white hover:bg-gray-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block align-middle">
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
}
export const Route = createFileRoute("/admin/enquiries")({
  head: () => ({ meta: [{ title: "Enquiry Dashboard" }] }),
  component: EnquiryDashboard,
});