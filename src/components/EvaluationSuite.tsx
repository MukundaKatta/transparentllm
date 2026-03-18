"use client";

import { useMemo } from "react";
import { generateEvaluationResults } from "@/lib/mock-data";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";
import { Award, ShieldCheck } from "lucide-react";

export default function EvaluationSuite() {
  const { benchmarks, safetyMetrics } = useMemo(() => generateEvaluationResults(), []);

  const radarData = benchmarks.map((b) => ({
    subject: b.name,
    score: b.score,
    baseline: b.baseline,
  }));

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Award size={22} className="text-amber-400" /> Evaluation Suite
        </h2>
        <p className="text-sm text-slate-400">Benchmark performance and safety metrics</p>
      </div>

      {/* Radar */}
      <div className="glass-panel p-6">
        <h3 className="text-sm font-medium text-slate-300 mb-4">Benchmark Radar</h3>
        <ResponsiveContainer width="100%" height={350}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="#334155" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: "#94a3b8", fontSize: 10 }} />
            <PolarRadiusAxis tick={{ fill: "#64748b", fontSize: 9 }} domain={[0, 100]} />
            <Radar name="Model" dataKey="score" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} strokeWidth={2} />
            <Radar name="Baseline" dataKey="baseline" stroke="#64748b" fill="#64748b" fillOpacity={0.1} strokeWidth={1} strokeDasharray="5 5" />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Benchmark Bars */}
      <div className="glass-panel p-6">
        <h3 className="text-sm font-medium text-slate-300 mb-4">Benchmark Scores vs Baseline</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={benchmarks}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="name" stroke="#64748b" tick={{ fill: "#94a3b8", fontSize: 10 }} />
            <YAxis stroke="#64748b" tick={{ fill: "#94a3b8", fontSize: 11 }} domain={[0, 100]} />
            <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px", color: "#e2e8f0" }} />
            <Legend />
            <Bar dataKey="score" fill="#f59e0b" name="Model" radius={[4, 4, 0, 0]} />
            <Bar dataKey="baseline" fill="#475569" name="Baseline" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Safety Metrics */}
      <div className="glass-panel p-6">
        <h3 className="text-sm font-medium text-slate-300 mb-4 flex items-center gap-2">
          <ShieldCheck size={16} className="text-green-400" /> Safety Metrics
        </h3>
        <div className="space-y-3">
          {safetyMetrics.map((metric) => (
            <div key={metric.name} className="flex items-center gap-4">
              <span className="text-sm text-slate-300 w-36">{metric.name}</span>
              <div className="flex-1 h-3 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${Math.min(100, metric.score * 100)}%`,
                    backgroundColor: metric.status === "pass" ? "#22c55e" : "#ef4444",
                  }}
                />
              </div>
              <span className="text-xs font-mono text-slate-400 w-12">{(metric.score * 100).toFixed(1)}%</span>
              <span className="text-xs text-slate-500 w-12">/{(metric.target * 100).toFixed(0)}%</span>
              <span className={`text-xs px-2 py-0.5 rounded ${
                metric.status === "pass" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
              }`}>
                {metric.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
