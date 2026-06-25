import { TechCategory } from "../types";

export const TECH_STACK: TechCategory[] = [
  { name: 'Languages', items: ['Python', 'C / C++', 'TypeScript', 'Java', 'ARM Assembly', 'SQL'] },
  { name: 'AI / ML', items: ['PyTorch', 'scikit-learn', 'LangChain', 'FAISS', 'Whisper', 'HuggingFace'] },
  { name: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'Three.js / R3F', 'GSAP'] },
  { name: 'Backend', items: ['Node.js', 'Supabase', 'PostgreSQL', 'REST APIs', 'GraphQL'] },
  { name: 'DevOps', items: ['Docker', 'GitHub Actions', 'GitLab CI/CD', 'Linux', 'Nginx'] },
  { name: 'Embedded', items: ['FreeRTOS', 'ARINC 653', 'STM32', 'UART / SPI / I2C'] },
  { name: 'Tools', items: ['Git', 'Blender', 'Figma', 'LaTeX', 'Jira'] },
];
