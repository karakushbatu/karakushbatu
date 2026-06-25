import * as THREE from "three";
import { WorkTimelinePoint } from "../types";

export const WORK_TIMELINE: WorkTimelinePoint[] = [
  {
    point: new THREE.Vector3(0, 0, 0),
    year: '2021',
    title: 'İTÜ',
    subtitle: 'B.Sc. Computer Engineering',
    position: 'right',
    description: 'Istanbul Technical University (English program), Sep 2021 – Jun 2026. Data structures, operating systems, computer organization, databases and software engineering.',
    technologies: ['Algorithms', 'Operating Systems', 'Computer Organization', 'Databases'],
    achievements: ['Scholarships: TÜBİTAK STAR · TEV · ÇYDD'],
  },
  {
    point: new THREE.Vector3(-4, -4, -3),
    year: 'Jul 2025',
    title: 'Teknosa',
    subtitle: 'Frontend / UX Intern',
    position: 'left',
    description: 'Step 2025 program. Managed banner, category and product content on SAP Commerce Cloud (Hybris) + SmartEdit; analysed e-commerce data with SQL & Pandas and reported in Power BI.',
    technologies: ['SAP Commerce Cloud', 'SmartEdit', 'SQL', 'Pandas', 'Power BI'],
  },
  {
    point: new THREE.Vector3(-3, -1, -6),
    year: 'Jan 2026',
    title: 'TUSAŞ SKY',
    subtitle: 'System Avionics Track',
    position: 'left',
    description: 'Turkish Aerospace SKY Experience (remote). Hands-on with avionics architecture, ARINC 653 partitioning and DO-178C verification — modular development, test design and requirement traceability.',
    technologies: ['C / C++', 'ARINC 653', 'DO-178C', 'GitHub Actions'],
    achievements: ['DO-178C avionics software training'],
  },
  {
    point: new THREE.Vector3(2.4, 0.4, -10.5),
    year: 'Feb 2026',
    title: 'TÜBİTAK',
    subtitle: 'STAR Research Fellow (2247-C)',
    position: 'right',
    description: 'Research on advanced glycation (AGE) detection in food products: ML model training, validation and testing through a Python pipeline, with data prep, model comparison and technical documentation.',
    technologies: ['Python', 'scikit-learn', 'ML Pipelines'],
  },
  {
    point: new THREE.Vector3(0.4, 2.4, -14.2),
    year: '2026',
    title: 'Building...',
    subtitle: 'What\'s next',
    position: 'right',
    description: 'Graduating Jun 2026 and building — local-first AI tooling, avionics-grade software and developer products.',
  },
];
