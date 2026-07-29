/* eslint-disable prettier/prettier */
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import { seedEnquiries } from "@/lib/seed-enquiries";
import { seedMappedForms } from "@/lib/seed-admin";
import AdminLayout from "@/components/admin/AdminLayout";

function requireAuth() {
  return localStorage.getItem("adminAuth") === "true";
}

function Analytics() {
  const trend = useMemo(() => {
    // count enquiries per date
    const counts: Record<string, number> = {};
    seedEnquiries.forEach((e) => {
      const d = e.submittedAt.slice(0, 10);
      counts[d] = (counts[d] || 0) + 1;
    });
    return Object.entries(counts).sort(([a], [b]) => a.localeCompare(b));
  }, []);

  const topForms = useMemo(() => {
    const counts: Record<string, number> = {};
    seedMappedForms.forEach((f) => {
      counts[f.formName] = (counts[f.formName] || 0) + f.mappedFields;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 6);
  }, []);

  return (
    <AdminLayout title="Analytics">
        <div className="bg-white border rounded-2xl p-6 shadow-lg">
        {/* <h3 className="font-medium mb-4">Analytics</h3> */}

        {/* Line chart: enquiries over time */}
          <div className="mb-6 p-4 bg-white border rounded-lg shadow-sm">
          <h4 className="font-medium mb-3">Enquiries Over Time</h4>
          {trend.length === 0 ? (
            <div className="text-gray-400">No data</div>
          ) : (
            <LineChart data={trend} width={800} height={180} />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bar chart: top forms */}
            <div className="p-4 bg-white border rounded-lg shadow-sm">
            <h4 className="font-medium mb-3">Top Forms (by mapped fields)</h4>
            <BarChart data={topForms} width={360} height={220} />
          </div>

          {/* Pie chart: enquiries by provider */}
            <div className="p-4 bg-white border rounded-lg shadow-sm">
            <h4 className="font-medium mb-3">Enquiries by Provider</h4>
            <PieChart data={computeProviderBreakdown(seedEnquiries)} size={220} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

function computeProviderBreakdown(enquiries: typeof seedEnquiries) {
  const counts: Record<string, number> = {};
  enquiries.forEach((e) => {
    const k = e.provider || 'unknown';
    counts[k] = (counts[k] || 0) + 1;
  });
  return Object.entries(counts).map(([k, v]) => ({ key: k, value: v }));
}

function LineChart({ data, width, height }: { data: [string, number][]; width: number; height: number }) {
  const padding = 30;
  const dates = data.map((d) => d[0]);
  const vals = data.map((d) => d[1]);
  const max = Math.max(...vals, 1);
  const stepX = (width - padding * 2) / Math.max(1, dates.length - 1);

  const points = data
    .map(([_, v], i) => {
      const x = padding + i * stepX;
      const y = padding + (height - padding * 2) * (1 - v / max);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} role="img">
      <polyline fill="none" stroke="#3b82f6" strokeWidth={3} points={points} strokeLinecap="round" strokeLinejoin="round" />
      {data.map(([d, v], i) => {
        const x = padding + i * stepX;
        const y = padding + (height - padding * 2) * (1 - v / max);
        return (
          <g key={d}>
            <circle cx={x} cy={y} r={4} fill="#1d4ed8" />
            <text x={x} y={height - 6} fontSize={10} fill="#475569" textAnchor="middle">{d}</text>
          </g>
        );
      })}
    </svg>
  );
}

function BarChart({ data, width, height }: { data: [string, number][]; width: number; height: number }) {
  const padding = 20;
  const cols = data.length;
  const max = Math.max(...data.map((d) => d[1]), 1);
  const barW = (width - padding * 2) / Math.max(1, cols);

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} role="img">
      {data.map(([label, v], i) => {
        const x = padding + i * barW + 6;
        const h = ((height - padding * 2) * v) / max;
        const y = height - padding - h;
        return (
          <g key={label}>
            <rect x={x} y={y} width={barW - 12} height={h} fill="#60a5fa" rx={3} />
            <text x={x + (barW - 12) / 2} y={height - 6} fontSize={10} fill="#475569" textAnchor="middle">{label}</text>
            <text x={x + (barW - 12) / 2} y={y - 6} fontSize={10} fill="#0f172a" textAnchor="middle">{v}</text>
          </g>
        );
      })}
    </svg>
  );
}

function PieChart({ data, size }: { data: { key: string; value: number }[]; size: number }) {
  const radius = size / 2 - 10;
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  let angle = -Math.PI / 2;

  const slices = data.map((d) => {
    const portion = d.value / total;
    const sliceAngle = portion * Math.PI * 2;
    const start = angle;
    const end = angle + sliceAngle;
    angle = end;
    const x1 = size / 2 + radius * Math.cos(start);
    const y1 = size / 2 + radius * Math.sin(start);
    const x2 = size / 2 + radius * Math.cos(end);
    const y2 = size / 2 + radius * Math.sin(end);
    const large = sliceAngle > Math.PI ? 1 : 0;
    const path = `M ${size/2} ${size/2} L ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2} Z`;
    return { path, label: d.key, value: d.value };
  });

  const colors = ['#60a5fa', '#34d399', '#f59e0b', '#f97316', '#ef4444', '#a78bfa'];

  return (
    <svg width="100%" viewBox={`0 0 ${size} ${size}`} role="img">
      {slices.map((s, i) => (
        <path key={s.label} d={s.path} fill={colors[i % colors.length]} stroke="#fff" strokeWidth={1} />
      ))}
      <g>
        {data.map((d, i) => (
          <text key={d.key} x={size + 8} y={20 + i * 16} fontSize={12} fill="#0f172a">{d.key} ({d.value})</text>
        ))}
      </g>
    </svg>
  );
}

export const Route = createFileRoute("/admin/analytics")({
  head: () => ({ meta: [{ title: "Analytics" }] }),
  component: Analytics,
});
