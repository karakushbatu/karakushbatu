import { Project } from "../types";

// Newest to oldest. Repos & details from career.md.
export const PROJECTS: Project[] = [
  {
    title: 'SAM-Assistive Vision',
    date: 'Jun 2026',
    subtext: 'Graduation project — a real-time, Turkish-speaking voice vision assistant for the blind (SAM + Grounding DINO + CLIP + GPT-4o). 3405ms end-to-end, N=8 study at Bağcılar Blind School, Friedman p<0.01, 8/8 preferred it.',
    url: 'https://github.com/karakushbatu/SAM-Assistive-Vision',
  },
  {
    title: 'MeetGhost',
    date: 'Jun 2026',
    subtext: 'Privacy-first, fully on-device meeting assistant & interview-prep coach. Tauri + Rust, faster-whisper / whisper.cpp-turbo STT, bge-m3 + LanceDB RAG, local Qwen/Gemma LLMs in a floating overlay.',
    url: 'https://github.com/karakushbatu',
  },
  {
    title: 'pAGEs-Core-System',
    date: 'Jun 2026',
    subtext: 'Food-toxicology platform for advanced glycation end-product (AGE) analysis, built under TÜBİTAK research project 224Z036.',
    url: 'https://github.com/karakushbatu/pAGEs-Core-System',
  },
  {
    title: 'Markforge',
    date: 'May 2026',
    subtext: 'A polished web studio around Microsoft MarkItDown: drag-and-drop conversion of PDF/DOCX/PPTX/XLSX to Markdown with a Monaco editor and live preview. Next.js + FastAPI pnpm monorepo.',
    url: 'https://github.com/karakushbatu/Markforge',
  },
  {
    title: 'ArchGuard AI',
    date: 'May 2026',
    subtext: 'LLM-first architecture linter that flags design-rule violations on PRs. Webhook + diff parser feeds an air-gapped LLaMA 3; phase 2 adds RAG over architecture.md and an AST dependency graph to cut hallucinations.',
    url: 'https://github.com/karakushbatu/ai-architecture-linter',
  },
  {
    title: 'FPMC-Avionics-RealTime',
    date: 'May 2026',
    subtext: 'Deterministic C++ flight-phase monitoring component: 77 boundary-value / fault-handling / regression tests, a zero-allocation circular buffer and microbenchmarks, following DO-178C test methodology.',
    url: 'https://github.com/karakushbatu/FPMC-Avionics-RealTime',
  },
  {
    title: 'gcs-autopilot-commsys',
    date: 'May 2026',
    subtext: 'GCS–autopilot command/telemetry comms prototype in C++11 with checksum validation, heartbeat watchdog, XOR integrity checks and system-integration tests.',
    url: 'https://github.com/karakushbatu/gcs-autopilot-commsys',
  },
  {
    title: 'arinc653-scheduler-sim',
    date: 'May 2026',
    subtext: 'A simulation of ARINC 653 partition scheduling — time-window management and spatial/temporal partitioning for avionics RTOS.',
    url: 'https://github.com/karakushbatu/arinc653-scheduler-sim',
  },
  {
    title: 'java-aerospace-hums',
    date: 'May 2026',
    subtext: 'A Java-based Health & Usage Monitoring System (HUMS) for aerospace health tracking.',
    url: 'https://github.com/karakushbatu/java-aerospace-hums',
  },
  {
    title: 'Airline Satisfaction Prediction',
    date: 'May 2026',
    subtext: 'End-to-end classification (TUSAŞ SKY Task 4) on ~103K rows: Random Forest at 95.86% accuracy / 99.33% ROC-AUC, with a modular pipeline, EDA notebooks and exported models.',
    url: 'https://github.com/karakushbatu/Airline-passenger-satisfaction-prediction',
  },
  {
    title: 'TCP-IP Messenger',
    date: 'Apr 2026',
    subtext: 'A bidirectional TCP/IP messaging app built as the ASELSAN software-test-engineering case study, delivered with a technical report and Q&A pack.',
    url: 'https://github.com/karakushbatu/TCP-IP-Messenger-Application',
  },
  {
    title: 'karakus.dev',
    date: 'May 2026',
    subtext: 'Personal portfolio + AI CV builder that tailors résumés to a job post. Next.js 14, Supabase, GitHub OAuth, Groq + Gemini, react-pdf, admin panel and rate limiting.',
    url: 'https://github.com/karakushbatu',
  },
  {
    title: 'Photogether',
    date: '2025',
    subtext: 'A web app built for the Software Engineering course. Next.js 16, React 19, Tailwind 4, Firebase — deployed on Vercel.',
    url: 'https://github.com/karakushbatu/Photogether',
  },
  {
    title: 'local-wikipedia-rag-assistant',
    date: '2025',
    subtext: 'A fully local Wikipedia RAG assistant: embedding generation, ChromaDB vector retrieval and Ollama LLM integration.',
    url: 'https://github.com/karakushbatu/local-wikipedia-rag-assistant',
  },
  {
    title: 'RealTime-Scheduling-Visualizer',
    date: '2025',
    subtext: 'A visualizer for real-time scheduling algorithms — an OS / RTOS coursework deep-dive.',
    url: 'https://github.com/karakushbatu/RealTime-Scheduling-Visualizer',
  },
];
