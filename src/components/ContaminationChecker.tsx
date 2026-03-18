"use client";

import { useMemo } from "react";
import { generateContaminationResults } from "@/lib/mock-data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";
import { ShieldAlert, CheckCircle, AlertTriangle, XCircle } from "lucide-react";

const statusConfig: Record<string, { color: string; icon: React.ReactNode }> = {
  minimal: { color: "#22c55e", icon: <CheckCircle size={16} /> },
  low: { color: "#3b82f6", icon: <CheckCircle size={16} /> },
  moderate: { color: "#f59e0b", icon: <AlertTriangle size={16} /> },
  high: { color: "#ef4444", icon: <XCircle size={16} /> },
};

export default function ContaminationChecker() {
  const results = useMemo(() => generateContaminationResults(), []);

  const summary = {
    clean: results.filter((r) => r.status === "minimal" || r.status === "low").length,
    warning: results.filter((r) => r.status === "moderate").length,
    contaminated: results.filter((r) => r.status === "high").length,
  };

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <ShieldAlert size={22} className="text-red-400" /> Data Contamination Checker
        </h2>
        <p className="text-sm text-slate-400">Detect benchmark data leakage in training set</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="glass-panel p-4 text-center border border-green-500/30">
          <div className="text-2xl font-bold text-green-400">{summary.clean}</div>
          <div className="text-xs text-slate-500">Clean</div>
        </div>
        <div className="glass-panel p-4 text-center border border-amber-500/30">
          <div className="text-2xl font-bold text-amber-400">{summary.warning}</div>
          <div className="text-xs text-slate-500">Warning</div>
        </div>
        <div className="glass-panel p-4 text-center border border-red-500/30">
          <div className="text-2xl font-bold text-red-400">{summary.contaminated}</div>
          <div className="text-xs text-slate-500">Contaminated</div>
        </div>
      </div>

      <div className="glass-panel p-6">
        <h3 className="text-sm font-medium text-slate-300 mb-4">Contamination by Benchmark (%)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={results}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="benchmark" stroke="#64748b" tick={{ fill: "#94a3b8", fontSize: 11 }} />
            <YAxis stroke="#64748b" tick={{ fill: "#94a3b8", fontSize: 11 }} />
            <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px", color: "#e2e8f0" }} />
            <Legend />
            <Bar dataKey="clean" fill="#22c55e" name="Clean" stackId="a" />
            <Bar dataKey="contaminated" fill="#ef4444" name="Contaminated" stackId="a" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-3">
        {results.sort((a, b) => b.contaminated - a.contaminated).map((r) => {
          const cfg = statusConfig[r.status];
          return (
            <div key={r.benchmark} className="glass-panel p-4 flex items-center gap-4">
              <div style={{ color: cfg.color }}>{cfg.icon}</div>
              <div className="flex-1">
                <div className="text-sm font-medium text-white">{r.benchmark}</div>
                <div className="h-2 bg-zinc-800 rounded-full mt-2 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${r.contaminated}%`, backgroundColor: cfg.color }} />
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-mono" style={{ color: cfg.color }}>{r.contaminated}%</div>
                <div className="text-[10px] text-slate-500 capitalize">{r.status}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
