"use client";

import { useTransparentStore, TabMode } from "@/lib/store";
import { models } from "@/lib/mock-data";
import TrainingDashboard from "@/components/TrainingDashboard";
import EvaluationSuite from "@/components/EvaluationSuite";
import AblationViewer from "@/components/AblationViewer";
import ComputeTracker from "@/components/ComputeTracker";
import ContaminationChecker from "@/components/ContaminationChecker";
import DataExplorer from "@/components/DataExplorer";
import {
  Brain, Activity, Award, Layers, Cpu, ShieldAlert, Database,
} from "lucide-react";

const tabs: { key: TabMode; label: string; icon: React.ReactNode }[] = [
  { key: "training", label: "Training", icon: <Activity size={18} /> },
  { key: "evaluation", label: "Evaluation", icon: <Award size={18} /> },
  { key: "ablation", label: "Ablation", icon: <Layers size={18} /> },
  { key: "compute", label: "Compute", icon: <Cpu size={18} /> },
  { key: "contamination", label: "Contamination", icon: <ShieldAlert size={18} /> },
  { key: "data", label: "Training Data", icon: <Database size={18} /> },
];

export default function HomePage() {
  const { tab, setTab, selectedModel, setSelectedModel } = useTransparentStore();

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-950">
      {/* Sidebar */}
      <div className="w-64 h-full glass-panel flex flex-col">
        <div className="p-6 border-b border-zinc-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
              <Brain size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">TransparentLLM</h1>
              <p className="text-xs text-slate-400">Open AI Research</p>
            </div>
          </div>
        </div>

        {/* Model Selector */}
        <div className="p-3 border-b border-zinc-700/50">
          <p className="text-xs text-slate-500 px-3 mb-2">Model</p>
          {models.map((m) => (
            <button key={m.id} onClick={() => setSelectedModel(m.id)}
              className={`w-full px-3 py-2 rounded-lg text-left text-sm transition-colors ${
                selectedModel === m.id ? "bg-orange-500/20 text-orange-300" : "text-slate-400 hover:bg-zinc-800/50"
              }`}
            >
              <div className="font-medium">{m.name}</div>
              <div className="flex gap-2 text-[10px] text-slate-500">
                <span>{m.parameters}</span>
                <span>{m.architecture}</span>
                <span className={
                  m.status === "complete" ? "text-green-400" :
                  m.status === "training" ? "text-amber-400" : "text-blue-400"
                }>{m.status}</span>
              </div>
            </button>
          ))}
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {tabs.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                tab === t.key
                  ? "bg-orange-500/20 text-orange-300 border border-orange-500/30"
                  : "text-slate-400 hover:bg-zinc-800/50"
              }`}
            >
              {t.icon}
              <span className="text-sm">{t.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-zinc-700/50">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-xs text-slate-500">Open research platform</span>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 overflow-hidden">
        {tab === "training" && <TrainingDashboard />}
        {tab === "evaluation" && <EvaluationSuite />}
        {tab === "ablation" && <AblationViewer />}
        {tab === "compute" && <ComputeTracker />}
        {tab === "contamination" && <ContaminationChecker />}
        {tab === "data" && <DataExplorer />}
      </div>
    </div>
  );
}
