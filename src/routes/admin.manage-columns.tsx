/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable no-empty */

import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { seedColumns, ColumnDef } from "@/lib/seed-admin";

function requireAuth() {
  return localStorage.getItem("adminAuth") === "true";
}

function ManageColumns() {
  const [columns, setColumns] = useState<ColumnDef[]>(() => {
    try {
      const raw = localStorage.getItem('adminColumns');
      if (raw) return JSON.parse(raw) as ColumnDef[];
    } catch (e) {}
    return seedColumns;
  });

  const [key, setKey] = useState('');
  const [label, setLabel] = useState('');
  const [type, setType] = useState<'text' | 'number' | 'date'>('text');

  function addColumn() {
    if (!key || !label) return alert('Key and label required');
    const next = [...columns, { key, label, type, enabled: true }];
    setColumns(next);
    localStorage.setItem('adminColumns', JSON.stringify(next));
    setKey(''); setLabel(''); setType('text');
  }

  function toggleEnabled(i: number) {
    const next = columns.slice();
    next[i].enabled = !next[i].enabled;
    setColumns(next);
    localStorage.setItem('adminColumns', JSON.stringify(next));
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

        <h3 className="font-medium mt-6 mb-3 text-gray-800">Existing Columns</h3>
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
              {columns.map((c, i) => (
                <tr key={c.key} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-700">{c.key}</td>
                  <td className="px-4 py-3">{c.label}</td>
                  <td className="px-4 py-3">{c.type}</td>
                  <td className="px-4 py-3">
                    <input type="checkbox" checked={c.enabled} onChange={() => toggleEnabled(i)} />
                  </td>
                  <td className="px-4 py-3"><button onClick={() => alert('Saved')} className="px-3 py-1 rounded bg-white border text-sm">Save</button></td>
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
