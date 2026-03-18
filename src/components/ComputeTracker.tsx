"use client";

import { useMemo } from "react";
import { generateComputeData } from "@/lib/mock-data";
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { Cpu, DollarSign, Leaf, HardDrive } from "lucide-react";

export default function ComputeTracker() {
  const data = useMemo(() => generateComputeData(), []);
  const totals = {
    gpuHours: data.reduce((s, d) => s + d.gpuHours, 0),
    cost: data.reduce((s, d) => s + d.cost, 0),
    co2: data.reduce((s, d) => s + d.co2kg, 0),
    avgUtil: data.reduce((s, d) => s + d.utilization, 0) / data.length,
  };

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Cpu size={22} className="text-blue-400" /> Compute Tracker
        </h2>
        <p className="text-sm text-slate-400">Resource utilization and cost monitoring</p>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <div className="glass-panel p-4 text-center">
          <Cpu size={18} className="mx-auto mb-2 text-blue-400" />
          <div className="text-xl font-bold text-white">{(totals.gpuHours / 1000).toFixed(0)}K</div>
          <div className="text-[10px] text-slate-500">GPU Hours</div>
        </div>
        <div className="glass-panel p-4 text-center">
          <DollarSign size={18} className="mx-auto mb-2 text-green-400" />
          <div className="text-xl font-bold text-white">${(totals.cost / 1000).toFixed(0)}K</div>
          <div className="text-[10px] text-slate-500">Total Cost</div>
        </div>
        <div className="glass-panel p-4 text-center">
          <Leaf size={18} className="mx-auto mb-2 text-emerald-400" />
          <div className="text-xl font-bold text-white">{(totals.co2 / 1000).toFixed(1)}t</div>
          <div className="text-[10px] text-slate-500">CO2 (tonnes)</div>
        </div>
        <div className="glass-panel p-4 text-center">
          <HardDrive size={18} className="mx-auto mb-2 text-purple-400" />
          <div className="text-xl font-bold text-white">{totals.avgUtil.toFixed(0)}%</div>
          <div className="text-[10px] text-slate-500">Avg Utilization</div>
        </div>
      </div>

      <div className="glass-panel p-6">
        <h3 className="text-sm font-medium text-slate-300 mb-4">GPU Hours / Day</h3>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="day" stroke="#64748b" tick={{ fill: "#94a3b8", fontSize: 11 }} />
            <YAxis stroke="#64748b" tick={{ fill: "#94a3b8", fontSize: 11 }} />
            <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px", color: "#e2e8f0" }} />
            <Area type="monotone" dataKey="gpuHours" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="glass-panel p-6">
          <h3 className="text-sm font-medium text-slate-300 mb-4">Daily Cost ($)</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="day" stroke="#64748b" tick={{ fill: "#94a3b8", fontSize: 10 }} />
              <YAxis stroke="#64748b" tick={{ fill: "#94a3b8", fontSize: 10 }} />
              <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px", color: "#e2e8f0" }} />
              <Line type="monotone" dataKey="cost" stroke="#22c55e" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-panel p-6">
          <h3 className="text-sm font-medium text-slate-300 mb-4">GPU Utilization (%)</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="day" stroke="#64748b" tick={{ fill: "#94a3b8", fontSize: 10 }} />
              <YAxis stroke="#64748b" tick={{ fill: "#94a3b8", fontSize: 10 }} domain={[70, 100]} />
              <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px", color: "#e2e8f0" }} />
              <Line type="monotone" dataKey="utilization" stroke="#8b5cf6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
