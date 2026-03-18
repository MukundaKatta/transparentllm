export interface ModelConfig {
  id: string;
  name: string;
  parameters: string;
  architecture: string;
  trainTokens: string;
  status: "training" | "complete" | "evaluating";
}

export const models: ModelConfig[] = [
  { id: "llm-7b", name: "TransparentLLM-7B", parameters: "7B", architecture: "Transformer", trainTokens: "1.5T", status: "complete" },
  { id: "llm-13b", name: "TransparentLLM-13B", parameters: "13B", architecture: "Transformer", trainTokens: "2T", status: "training" },
  { id: "llm-70b", name: "TransparentLLM-70B", parameters: "70B", architecture: "MoE Transformer", trainTokens: "3T", status: "evaluating" },
];

export function generateTrainingProgress(steps: number = 100) {
  const data = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    data.push({
      step: i * 1000,
      loss: 3.5 * Math.exp(-3 * t) + 0.8 + Math.random() * 0.1 * (1 - t),
      learningRate: 3e-4 * (1 - t * 0.9),
      gradNorm: 0.5 + Math.random() * 0.3 + 0.2 * (1 - t),
      throughput: 45000 + Math.random() * 5000 - t * 2000,
      perplexity: Math.exp(3.5 * Math.exp(-3 * t) + 0.8 + Math.random() * 0.05),
    });
  }
  return data;
}

export function generateEvaluationResults() {
  return {
    benchmarks: [
      { name: "MMLU", score: 68.3, category: "Knowledge", baseline: 55.0 },
      { name: "HellaSwag", score: 82.1, category: "Reasoning", baseline: 70.0 },
      { name: "ARC-C", score: 57.4, category: "Science", baseline: 45.0 },
      { name: "TruthfulQA", score: 45.2, category: "Truthfulness", baseline: 30.0 },
      { name: "GSM8K", score: 52.8, category: "Math", baseline: 35.0 },
      { name: "HumanEval", score: 38.4, category: "Code", baseline: 20.0 },
      { name: "WinoGrande", score: 79.6, category: "Commonsense", baseline: 65.0 },
      { name: "PIQA", score: 81.3, category: "Physical", baseline: 72.0 },
    ],
    safetyMetrics: [
      { name: "Toxicity", score: 0.03, target: 0.05, status: "pass" },
      { name: "Bias (Gender)", score: 0.12, target: 0.15, status: "pass" },
      { name: "Bias (Race)", score: 0.09, target: 0.10, status: "pass" },
      { name: "Hallucination Rate", score: 0.18, target: 0.15, status: "fail" },
      { name: "Refusal Rate", score: 0.95, target: 0.90, status: "pass" },
      { name: "PII Leakage", score: 0.01, target: 0.02, status: "pass" },
    ],
  };
}

export function generateAblationData() {
  const components = [
    "Attention Heads", "FFN Width", "Num Layers", "Context Length",
    "RoPE Encoding", "Flash Attention", "Group Query Attention", "Mixture of Experts",
  ];
  return components.map((name) => ({
    name,
    withComponent: 65 + Math.random() * 20,
    withoutComponent: 50 + Math.random() * 20,
    delta: 0,
  })).map((item) => ({
    ...item,
    delta: Math.round((item.withComponent - item.withoutComponent) * 100) / 100,
  }));
}

export function generateComputeData() {
  const days = 30;
  return Array.from({ length: days }, (_, i) => ({
    day: i + 1,
    gpuHours: 2000 + i * 150 + Math.random() * 200,
    cost: (2000 + i * 150) * 2.5,
    co2kg: (2000 + i * 150) * 0.3,
    utilization: 85 + Math.random() * 12,
    memoryGB: 650 + Math.random() * 50,
  }));
}

export function generateDataSources() {
  return [
    { name: "Common Crawl", tokens: "800B", percentage: 53, category: "Web", quality: "Medium" },
    { name: "Wikipedia", tokens: "15B", percentage: 1, category: "Encyclopedia", quality: "High" },
    { name: "Books (PG)", tokens: "5B", percentage: 0.3, category: "Books", quality: "High" },
    { name: "ArXiv", tokens: "50B", percentage: 3.3, category: "Academic", quality: "High" },
    { name: "GitHub Code", tokens: "200B", percentage: 13.3, category: "Code", quality: "Medium" },
    { name: "StackExchange", tokens: "30B", percentage: 2, category: "QA", quality: "High" },
    { name: "Reddit", tokens: "100B", percentage: 6.7, category: "Discussion", quality: "Low" },
    { name: "Curated Datasets", tokens: "300B", percentage: 20, category: "Curated", quality: "High" },
  ];
}

export function generateContaminationResults() {
  return [
    { benchmark: "MMLU", contaminated: 2.1, clean: 97.9, status: "low" },
    { benchmark: "HellaSwag", contaminated: 0.5, clean: 99.5, status: "minimal" },
    { benchmark: "ARC", contaminated: 1.8, clean: 98.2, status: "low" },
    { benchmark: "TruthfulQA", contaminated: 0.1, clean: 99.9, status: "minimal" },
    { benchmark: "GSM8K", contaminated: 5.2, clean: 94.8, status: "moderate" },
    { benchmark: "HumanEval", contaminated: 8.7, clean: 91.3, status: "high" },
    { benchmark: "WinoGrande", contaminated: 0.3, clean: 99.7, status: "minimal" },
    { benchmark: "PIQA", contaminated: 1.2, clean: 98.8, status: "low" },
  ];
}
