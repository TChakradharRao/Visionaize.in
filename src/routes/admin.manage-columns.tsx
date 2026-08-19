/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { api, getCurrentUserRole } from "@/lib/api";
import { seedColumns } from "@/lib/seed-admin";
import type { ColumnDef } from "@/lib/api";

function requireEditor() {
  return getCurrentUserRole() === "admin" || getCurrentUserRole() === "editor";
}

function ManageColumns() {
  const [columns, setColumns] = useState<ColumnDef[]>(seedColumns);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!requireEditor()) {
      window.location.href = '/admin/enquiries';
      return;
    }

    api.admin.columns().then((res) => {
      if (res.items.length) setColumns(res.items);
    }).finally(() => setLoading(false));
  }, []);

  const [key, setKey] = useState('');
  const [label, setLabel] = useState('');
  const [type, setType] = useState<'text' | 'number' | 'date'>('text');

  function addColumn() {
    if (!key || !label) return alert('Key and label required');
    const next = [...columns, { key, label, type, enabled: true }];
    setColumns(next);
    setKey(''); setLabel(''); setType('text');
  }

  function toggleEnabled(i: number) {
    const next = columns.slice();
    next[i].enabled = !next[i].enabled;
    setColumns(next);
  }

  async function saveColumns() {
    setSaving(true);
    try {
      await api.admin.saveColumns(columns);
      alert('Columns saved');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Unable to save columns');
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminLayout title="Manage Columns">
      <div className="bg-white border rounded-2xl p-6 shadow-lg">
        <h3 className="font-medium mb-4 text-gray-800">Add New Column</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <input placeholder="eg: product_name" value={key} onChange={(e) => setKey(e.target.value)} className="rounded-xl border px-4 py-3 shadow-sm" />
          <input placeholder="Label" value={label} onChange={(e) => setLabel(e.target.value)} className="rounded-xl border px-4 py-3 shadow-sm" />
          <select value={type} onChange={(e) => setType(e.target.value as any)} className="rounded-xl border px-4 py-3 shadow-sm">
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="date">Date</option>
          </select>
        </div>
        <div>
          <button onClick={addColumn} className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#92C122] to-[#0A78B9] text-white shadow-md">Add Column</button>
        </div>
          <div className="mt-4">
            <button onClick={saveColumns} disabled={saving} className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#0A78C1] to-[#1E7EC8] text-white shadow-md">{saving ? 'Saving…' : 'Save Columns'}</button>
          </div>
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs text-gray-600 bg-gray-50">
              <tr>
                <th className="px-4 py-3">Key</th>
                <th className="px-4 py-3">Label</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Enabled</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="px-4 py-6 text-center text-gray-500">Loading columns...</td></tr>
              ) : columns.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-6 text-center text-gray-500">No columns configured.</td></tr>
              ) : columns.map((c, i) => (
                <tr key={c.key} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-700">{c.key}</td>
                  <td className="px-4 py-3">{c.label}</td>
                  <td className="px-4 py-3">{c.type}</td>
                  <td className="px-4 py-3">
                    <input type="checkbox" checked={c.enabled} onChange={() => toggleEnabled(i)} />
                  </td>
                  <td className="px-4 py-3"><button disabled className="px-3 py-1 rounded bg-white border text-sm text-gray-400">Save</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

export const Route = createFileRoute("/admin/manage-columns")({
  head: () => ({ meta: [{ title: "Manage Columns" }] }),
  component: ManageColumns,
});
