"use client";

import { useMemo } from "react";
import { generateDataSources } from "@/lib/mock-data";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Database } from "lucide-react";

const colors = ["#ef4444", "#f59e0b", "#22c55e", "#3b82f6", "#8b5cf6", "#ec4899", "#06b6d4", "#84cc16"];

const qualityColors: Record<string, string> = { High: "#22c55e", Medium: "#f59e0b", Low: "#ef4444" };

export default function DataExplorer() {
  const sources = useMemo(() => generateDataSources(), []);
  const totalTokens = sources.reduce((s, d) => s + parseFloat(d.tokens), 0);

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Database size={22} className="text-cyan-400" /> Training Data Explorer
        </h2>
        <p className="text-sm text-slate-400">Total: ~{totalTokens.toFixed(0)}B tokens from {sources.length} sources</p>
      </div>

      <div className="flex gap-6">
        <div className="glass-panel p-6 flex-1">
          <h3 className="text-sm font-medium text-slate-300 mb-4">Data Composition</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={sources} dataKey="percentage" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={100}>
                {sources.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px", color: "#e2e8f0" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-panel p-6 flex-1">
          <h3 className="text-sm font-medium text-slate-300 mb-4">Tokens by Source</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={sources} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis type="number" stroke="#64748b" tick={{ fill: "#94a3b8", fontSize: 10 }} />
              <YAxis type="category" dataKey="name" stroke="#64748b" tick={{ fill: "#94a3b8", fontSize: 10 }} width={100} />
              <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px", color: "#e2e8f0" }} />
              <Bar dataKey="percentage" radius={[0, 4, 4, 0]}>
                {sources.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="space-y-3">
        {sources.map((src, i) => (
          <div key={src.name} className="glass-panel p-4 flex items-center gap-4">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[i % colors.length] }} />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-white">{src.name}</span>
                <span className="text-xs text-zinc-500">{src.category}</span>
              </div>
              <div className="h-1.5 bg-zinc-800 rounded-full mt-2 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${src.percentage}%`, backgroundColor: colors[i % colors.length] }} />
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-mono text-white">{src.tokens}</div>
              <div className="text-[10px]" style={{ color: qualityColors[src.quality] }}>{src.quality} quality</div>
            </div>
            <div className="text-sm font-mono text-zinc-400 w-12 text-right">{src.percentage}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}
