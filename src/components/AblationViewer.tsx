"use client";

import { useMemo } from "react";
import { generateAblationData } from "@/lib/mock-data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from "recharts";
import { Layers } from "lucide-react";

export default function AblationViewer() {
  const data = useMemo(() => generateAblationData(), []);

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Layers size={22} className="text-violet-400" /> Ablation Study
        </h2>
        <p className="text-sm text-slate-400">Component contribution analysis</p>
      </div>

      <div className="glass-panel p-6">
        <h3 className="text-sm font-medium text-slate-300 mb-4">With vs Without Component (Avg Score)</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis type="number" domain={[0, 100]} stroke="#64748b" tick={{ fill: "#94a3b8", fontSize: 11 }} />
            <YAxis type="category" dataKey="name" stroke="#64748b" tick={{ fill: "#94a3b8", fontSize: 10 }} width={130} />
            <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px", color: "#e2e8f0" }} />
            <Legend />
            <Bar dataKey="withComponent" fill="#22c55e" name="With" radius={[0, 4, 4, 0]} />
            <Bar dataKey="withoutComponent" fill="#475569" name="Without" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Delta Chart */}
      <div className="glass-panel p-6">
        <h3 className="text-sm font-medium text-slate-300 mb-4">Impact Delta (score difference)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={[...data].sort((a, b) => b.delta - a.delta)}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="name" stroke="#64748b" tick={{ fill: "#94a3b8", fontSize: 9 }} />
            <YAxis stroke="#64748b" tick={{ fill: "#94a3b8", fontSize: 11 }} />
            <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px", color: "#e2e8f0" }} />
            <Bar dataKey="delta" radius={[4, 4, 0, 0]}>
              {data.sort((a, b) => b.delta - a.delta).map((d, i) => (
                <Cell key={i} fill={d.delta > 10 ? "#22c55e" : d.delta > 5 ? "#3b82f6" : d.delta > 0 ? "#f59e0b" : "#ef4444"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Detail Cards */}
      <div className="grid grid-cols-2 gap-3">
        {data.sort((a, b) => b.delta - a.delta).map((item) => (
          <div key={item.name} className="glass-panel p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-white">{item.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded ${
                item.delta > 10 ? "bg-green-500/20 text-green-400" :
                item.delta > 5 ? "bg-blue-500/20 text-blue-400" :
                "bg-amber-500/20 text-amber-400"
              }`}>
                {item.delta > 0 ? "+" : ""}{item.delta.toFixed(1)}
              </span>
            </div>
            <div className="flex gap-4 text-xs text-slate-500">
              <span>With: {item.withComponent.toFixed(1)}</span>
              <span>Without: {item.withoutComponent.toFixed(1)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
