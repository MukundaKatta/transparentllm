"use client";

import { useMemo } from "react";
import { useTransparentStore } from "@/lib/store";
import { generateTrainingProgress, models } from "@/lib/mock-data";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  AreaChart, Area,
} from "recharts";
import { Activity, TrendingDown, Gauge, Cpu } from "lucide-react";

export default function TrainingDashboard() {
  const { selectedModel } = useTransparentStore();
  const model = models.find((m) => m.id === selectedModel) || models[0];
  const progress = useMemo(() => generateTrainingProgress(100), []);
  const latest = progress[progress.length - 1];

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Activity size={22} className="text-orange-400" /> Training Progress
        </h2>
        <p className="text-sm text-slate-400">{model.name} ({model.parameters} params)</p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-5 gap-3">
        <div className="glass-panel p-4 text-center">
          <TrendingDown size={18} className="mx-auto mb-2 text-green-400" />
          <div className="text-xl font-bold text-white">{latest.loss.toFixed(3)}</div>
          <div className="text-[10px] text-slate-500">Loss</div>
        </div>
        <div className="glass-panel p-4 text-center">
          <Gauge size={18} className="mx-auto mb-2 text-blue-400" />
          <div className="text-xl font-bold text-white">{latest.perplexity.toFixed(1)}</div>
          <div className="text-[10px] text-slate-500">Perplexity</div>
        </div>
        <div className="glass-panel p-4 text-center">
          <div className="text-xl font-bold text-white">{(latest.learningRate * 1e4).toFixed(1)}e-4</div>
          <div className="text-[10px] text-slate-500">Learning Rate</div>
        </div>
        <div className="glass-panel p-4 text-center">
          <Cpu size={18} className="mx-auto mb-2 text-purple-400" />
          <div className="text-xl font-bold text-white">{(latest.throughput / 1000).toFixed(1)}K</div>
          <div className="text-[10px] text-slate-500">Tokens/sec</div>
        </div>
        <div className="glass-panel p-4 text-center">
          <div className="text-xl font-bold text-white">{latest.gradNorm.toFixed(2)}</div>
          <div className="text-[10px] text-slate-500">Grad Norm</div>
        </div>
      </div>

      {/* Loss Curve */}
      <div className="glass-panel p-6">
        <h3 className="text-sm font-medium text-slate-300 mb-4">Training Loss</h3>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={progress}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="step" stroke="#64748b" tick={{ fill: "#94a3b8", fontSize: 10 }} tickFormatter={(v) => `${v / 1000}K`} />
            <YAxis stroke="#64748b" tick={{ fill: "#94a3b8", fontSize: 11 }} />
            <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px", color: "#e2e8f0" }} />
            <Line type="monotone" dataKey="loss" stroke="#f59e0b" strokeWidth={2} dot={false} name="Loss" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* LR & Grad Norm */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-panel p-6">
          <h3 className="text-sm font-medium text-slate-300 mb-4">Learning Rate Schedule</h3>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={progress}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="step" stroke="#64748b" tick={{ fill: "#94a3b8", fontSize: 10 }} tickFormatter={(v) => `${v / 1000}K`} />
              <YAxis stroke="#64748b" tick={{ fill: "#94a3b8", fontSize: 10 }} />
              <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px", color: "#e2e8f0" }} />
              <Area type="monotone" dataKey="learningRate" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-panel p-6">
          <h3 className="text-sm font-medium text-slate-300 mb-4">Gradient Norm</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={progress}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="step" stroke="#64748b" tick={{ fill: "#94a3b8", fontSize: 10 }} tickFormatter={(v) => `${v / 1000}K`} />
              <YAxis stroke="#64748b" tick={{ fill: "#94a3b8", fontSize: 10 }} />
              <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px", color: "#e2e8f0" }} />
              <Line type="monotone" dataKey="gradNorm" stroke="#8b5cf6" strokeWidth={1.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
