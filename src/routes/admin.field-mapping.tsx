/* eslint-disable prettier/prettier */
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { api, getCurrentUserRole } from "@/lib/api";
import type { MappedForm } from "@/lib/api";

function requireEditor() {
  return getCurrentUserRole() === "admin" || getCurrentUserRole() === "editor";
}

function FieldMapping() {
  const [forms, setForms] = useState<MappedForm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!requireEditor()) {
      window.location.href = '/admin/enquiries';
      return;
    }

    api.admin.mappedForms()
      .then((res) => setForms(res.items))
      .finally(() => setLoading(false));
  }, []);

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
                  <td className="px-4 py-3 text-[#0A78B9] font-medium">{f.formName} (External ID: {f.externalFormId})</td>
                  <td className="px-4 py-3">{f.mappedFields}</td>
                  <td className="px-4 py-3 text-gray-600">{new Date(f.lastUpdated).toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => alert('Edit mapping not implemented yet')} className="px-3 py-1 rounded bg-gradient-to-r from-[#92C122] to-[#0A78B9] text-white text-sm cursor-pointer">Edit Mapping</button>
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