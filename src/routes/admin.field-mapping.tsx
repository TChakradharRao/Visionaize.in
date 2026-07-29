/* eslint-disable prettier/prettier */
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { seedMappedForms } from "@/lib/seed-admin";
import AdminLayout from "@/components/admin/AdminLayout";

function requireAuth() {
  return localStorage.getItem("adminAuth") === "true";
}

function FieldMapping() {
  const forms = useMemo(() => seedMappedForms, []);

  return (
    <AdminLayout title="Field Mapping">
      <div className="bg-white border rounded-2xl p-6 shadow-lg">
        <h3 className="font-medium mb-4 text-gray-800">Mapped Forms</h3>
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs text-gray-600 bg-gray-50">
              <tr>
                <th className="px-4 py-3">Provider</th>
                <th className="px-4 py-3">Form</th>
                <th className="px-4 py-3">Mapped Fields</th>
                <th className="px-4 py-3">Last Updated</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {forms.map((f) => (
                <tr key={f.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-700">{f.provider}</td>
                  <td className="px-4 py-3 text-[#0A78B9] font-medium">{f.formName} (ID: {f.id})</td>
                  <td className="px-4 py-3">{f.mappedFields}</td>
                  <td className="px-4 py-3 text-gray-600">{new Date(f.lastUpdated).toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => alert('Edit mapping not implemented yet')} className="px-3 py-1 rounded bg-gradient-to-r from-[#92C122] to-[#0A78B9] text-white text-sm">Edit Mapping</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

export const Route = createFileRoute("/admin/field-mapping")({
  head: () => ({ meta: [{ title: "Field Mapping" }] }),
  component: FieldMapping,
});

