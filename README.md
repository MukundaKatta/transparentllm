# TransparentLLM

Open AI research platform for transparent model training, evaluation, ablation studies, and data contamination analysis.

## Features

- **Training Dashboard** -- Monitor training runs with loss curves and learning rate schedules
- **Evaluation Suite** -- Comprehensive benchmark evaluation across multiple metrics
- **Ablation Viewer** -- Compare model variants to understand architectural contributions
- **Compute Tracker** -- Track GPU hours, costs, and carbon footprint of training
- **Contamination Checker** -- Detect benchmark data leakage in training datasets
- **Data Explorer** -- Browse and analyze training data composition and quality
- **Model Selector** -- Compare multiple models side-by-side across all views

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **State Management:** Zustand
- **Database:** Supabase
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone <repository-url>
cd transparentllm
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
transparentllm/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   │   ├── TrainingDashboard.tsx
│   │   ├── EvaluationSuite.tsx
│   │   ├── AblationViewer.tsx
│   │   ├── ComputeTracker.tsx
│   │   ├── ContaminationChecker.tsx
│   │   └── DataExplorer.tsx
│   └── lib/              # Utilities, store, mock data
├── public/               # Static assets
└── package.json
```

