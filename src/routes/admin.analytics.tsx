/* eslint-disable prettier/prettier */
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { api } from "@/lib/api";
import type { StatsResponse } from "@/lib/api";

function Analytics() {
  const [stats, setStats] = useState<StatsResponse | null>(null);

  useEffect(() => {
    api.admin.stats().then(setStats).catch(() => setStats(null));
  }, []);

  const trend = useMemo<[string, number][]>(() => {
    return stats?.enquiriesOverTime?.map((item) => [item.day, item.count]) ?? [];
  }, [stats]);

  const topEnquiryPages = useMemo<[string, number][]>(() => {
    if (stats?.topEnquiryPages?.length) {
      return stats.topEnquiryPages.map((item) => [item.source_page, item.count]);
    }
    if (stats?.topForms?.length) {
      return stats.topForms.map((form) => [form.form_name, form.mapped_fields]);
    }
    return [];
  }, [stats]);

  const enquiryTypes = useMemo(() => {
    if (stats?.enquiriesByType?.length) {
      return stats.enquiriesByType.map((item) => ({ key: item.form_type, value: item.count }));
    }
    if (stats?.providerBreakdown?.length) {
      return stats.providerBreakdown.map((item) => ({ key: item.provider, value: item.count }));
    }
    return [];
  }, [stats]);

  return (
    <AdminLayout title="Analytics">
      <div className="bg-white border rounded-2xl p-6 shadow-lg">
        {/* <h3 className="font-medium mb-4">Analytics</h3> */}

        {/* Line chart: enquiries over time */}
        <div className="mb-6 p-4 bg-white border rounded-lg shadow-sm">
          <h4 className="font-medium mb-3 pb-4">Enquiries Over Time</h4>
          {!stats ? (
            <div className="text-gray-400">Loading data…</div>
          ) : trend.length === 0 ? (
            <div className="text-gray-400">No data</div>
          ) : (
            <LineChart data={trend} width={800} height={180} />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-white border rounded-lg shadow-sm">
            <h4 className="font-medium mb-3 pb-12">Top Enquiry Pages</h4>
            {!stats ? (
              <div className="text-gray-400">Loading…</div>
            ) : topEnquiryPages.length === 0 ? (
              <div className="text-gray-400">No page data</div>
            ) : (
              <BarChart data={topEnquiryPages} width={360} height={220} />
            )}
          </div>

          <div className="p-4 bg-white border rounded-lg shadow-sm">
            <h4 className="font-medium mb-3">Enquiries by Form Type</h4>
            {!stats ? (
              <div className="text-gray-400">Loading…</div>
            ) : enquiryTypes.length === 0 ? (
              <div className="text-gray-400">No type data</div>
            ) : (
              <PieChart data={enquiryTypes} size={220} />
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

function LineChart({ data, width, height }: { data: [string, number][]; width: number; height: number }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const padding = 30;
  const labelMargin = 30;
  const chartLeft = padding + labelMargin;
  const chartWidth = width - chartLeft - padding;
  const chartHeight = height - padding * 2;
  const dates = data.map((d) => d[0]);
  const vals = data.map((d) => d[1]);
  const max = Math.max(...vals, 1);
  const stepX = chartWidth / Math.max(1, dates.length - 1);
  const yTicks = 5;

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const loadStyle = {
    opacity: isLoaded ? 1 : 0,
    transition: 'opacity 0.6s ease-out',
  };

  const points = data
    .map(([_, v], i) => {
      const x = chartLeft + i * stepX;
      const y = padding + chartHeight * (1 - v / max);
      return `${x},${y}`;
    })
    .join(' ');

  const yTickData = Array.from({ length: yTicks + 1 }, (_, i) => {
    const value = Math.round((max - (max / yTicks) * i) * 10) / 10;
    const y = padding + (chartHeight / yTicks) * i;
    return { value, y };
  });

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} role="img">
      <line x1={chartLeft} y1={padding} x2={chartLeft} y2={height - padding} stroke="#e2e8f0" />
      <line x1={chartLeft} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#e2e8f0" />
      {yTickData.map((tick) => (
        <g key={tick.value}>
          <line x1={chartLeft - 6} y1={tick.y} x2={chartLeft} y2={tick.y} stroke="#cbd5e1" />
          <text x={chartLeft - 10} y={tick.y + 4} fontSize={10} fill="#475569" textAnchor="end">
            {tick.value}
          </text>
        </g>
      ))}
      <polyline style={loadStyle} fill="none" stroke="#3b82f6" strokeWidth={3} points={points} strokeLinecap="round" strokeLinejoin="round" />
      {data.map(([d, v], i) => {
        const x = chartLeft + i * stepX;
        const y = padding + chartHeight * (1 - v / max);
        return (
          <g key={d} style={loadStyle}>
            <circle cx={x} cy={y} r={4} fill="#1d4ed8">
              <title>{`Date: ${d} · Count: ${v}`}</title>
            </circle>
            <text x={x} y={height - 6} fontSize={10} fill="#475569" textAnchor="middle">
              {d}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function BarChart({ data, width, height }: { data: [string, number][]; width: number; height: number }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const padding = 30;
  const labelMargin = 30;
  const chartLeft = padding + labelMargin;
  const chartWidth = width - chartLeft - padding;
  const axisHeight = 28;
  const cols = data.length;
  const max = Math.max(...data.map((d) => d[1]), 1);
  const barW = chartWidth / Math.max(1, cols);
  const yTicks = 5;

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const loadStyle = {
    opacity: isLoaded ? 1 : 0,
    transition: 'opacity 0.6s ease-out',
  };

  const yTickData = Array.from({ length: yTicks + 1 }, (_, i) => {
    const value = Math.round((max - (max / yTicks) * i) * 10) / 10;
    const y = padding + ((height - padding * 2 - axisHeight) / yTicks) * i;
    return { value, y };
  });

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} role="img" style={{ overflow: 'visible' }}>
      <line x1={chartLeft} y1={padding} x2={chartLeft} y2={height - padding - axisHeight} stroke="#e2e8f0" />
      <line x1={chartLeft} y1={height - padding - axisHeight} x2={width - padding} y2={height - padding - axisHeight} stroke="#e2e8f0" />
      {yTickData.map((tick) => (
        <g key={tick.value}>
          <line x1={chartLeft - 6} y1={tick.y} x2={chartLeft} y2={tick.y} stroke="#cbd5e1" />
          <text x={chartLeft - 10} y={tick.y + 4} fontSize={10} fill="#475569" textAnchor="end">
            {tick.value}
          </text>
        </g>
      ))}
      {data.map(([label, v], i) => {
        const x = chartLeft + i * barW + 6;
        const h = ((height - padding * 2 - axisHeight) * v) / max;
        const y = height - padding - axisHeight - h;
        const labelX = x + (barW - 12) / 2;
        const labelY = height - padding - 19;
        const shortLabel = label.split('/').filter(Boolean).pop() ?? label;
        return (
          <g key={label} style={loadStyle}>
            <rect x={x} y={y} width={barW - 12} height={h} fill="#60a5fa" rx={3}>
              <title>{`${shortLabel}: ${v}`}</title>
            </rect>
            <text
              x={labelX}
              y={labelY}
              fontSize={7}
              fill="#475569"
              textAnchor="end"
              dominantBaseline="middle"
              transform={`rotate(-90 ${labelX} ${labelY})`}
            >
              {shortLabel}
            </text>
            <text x={labelX} y={y - 6} fontSize={10} fill="#0f172a" textAnchor="middle">
              {v}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function PieChart({ data, size }: { data: { key: string; value: number }[]; size: number }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const radius = size / 2 - 10;
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  let angle = -Math.PI / 2;

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const loadStyle = {
    opacity: isLoaded ? 1 : 0,
    transition: 'opacity 0.6s ease-out',
  };

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
    const path = portion >= 1
      ? null
      : `M ${size/2} ${size/2} L ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2} Z`;
    return { path, label: d.key, value: d.value, portion };
  });

  const colors = ['#60a5fa', '#34d399', '#f59e0b', '#f97316', '#ef4444', '#a78bfa'];

  return (
    <svg width="100%" viewBox={`0 0 ${size} ${size}`} role="img" style={loadStyle}>
      {slices.map((s, i) => (
        s.portion >= 1 ? (
          <circle key={s.label} cx={size / 2} cy={size / 2} r={radius} fill={colors[i % colors.length]} stroke="#fff" strokeWidth={1}>
            <title>{`${s.label}: ${s.value}`}</title>
          </circle>
        ) : (
          <path key={s.label} d={s.path ?? ''} fill={colors[i % colors.length]} stroke="#fff" strokeWidth={1}>
            <title>{`${s.label}: ${s.value}`}</title>
          </path>
        )
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
