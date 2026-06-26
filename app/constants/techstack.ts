import { TechCategory } from "../types";

// Honest, comfort/interest-based grouping — not claiming mastery everywhere.
export const TECH_STACK: TechCategory[] = [
  {
    name: 'Day to day',
    items: ['Python', 'TypeScript', 'JavaScript', 'React', 'Next.js'],
    detail: 'My everyday web stack — UI to API.',
  },
  {
    name: 'Comfortable with',
    items: ['C / C++', 'Java', 'SQL', 'Node.js', 'PostgreSQL'],
    detail: 'Languages & databases I have shipped with.',
  },
  {
    name: 'AI & ML',
    items: ['PyTorch', 'scikit-learn', 'LangChain', 'RAG', 'Whisper', 'HuggingFace'],
    detail: 'Where my curiosity lives — LLMs, RAG, research.',
  },
  {
    name: 'Systems & embedded',
    items: ['Linux', 'FreeRTOS', 'ARINC 653', 'STM32', 'Bash'],
    detail: 'Low-level — avionics C & RTOS (TUSAŞ SKY).',
  },
  {
    name: 'Tooling & flow',
    items: ['Git', 'Docker', 'GitHub Actions', 'Figma', 'LaTeX'],
    detail: 'Keeping things tidy and shipping.',
  },
];
