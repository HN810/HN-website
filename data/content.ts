export interface Product {
  id: string
  index: string
  name: string
  kind: string
  period: string
  status: string
  summary: string
  highlights: readonly string[]
  stack: readonly string[]
  links: { live?: string; github?: string }
  visual: string
}

export interface Project {
  id: string
  index: string
  name: string
  kind: string
  period?: string
  summary: string
  highlights?: readonly string[]
  stack: readonly string[]
  links: { live?: string; github?: string }
  visual?: string
}

const products: Product[] = [
  {
    id: 'medflow',
    index: '01',
    name: 'AI Healthcare Workflow Platform',
    kind: 'Co-founder / CTO',
    period: 'Mar 2026 – Present',
    status: 'Active development',
    summary:
      'A full-stack platform that automates clinic administrative workflows, deployed to pilot clinics and cutting administrative workload by roughly 50%.',
    highlights: [
      'LLM document-processing pipeline using structured extraction with 90%+ field-level accuracy',
      'React + FastAPI apps with role-based dashboards, approval workflows and automated task orchestration',
      'EMR integrations via APIs to auto-create patient records and sync downstream workflow data',
    ],
    stack: ['React', 'FastAPI', 'Python', 'LLMs', 'EMR APIs'],
    links: { live: 'TODO', github: 'TODO' },
    visual:
      'TODO: abstract workflow/pipeline diagram (SVG) since real clinic screenshots may be sensitive. Do NOT use real patient data.',
  },
  {
    id: 'cogd',
    index: '02',
    name: 'Cogd.ai',
    kind: 'AI/ML-powered digital cognitive health dashboard',
    period: 'Founder',
    status: 'Active development',
    summary:
      "Uses keystroke dynamics to assess Parkinson's disease risk through a real-time ML inference pipeline.",
    highlights: [
      'Integrates 5+ ML models behind a real-time inference pipeline',
      'Behavioral data pipeline capturing 7+ keystroke metrics and extracting 30+ statistical and temporal features',
      'Trained and evaluated Random Forest, XGBoost, LightGBM, Logistic Regression and SVM on the Tappy dataset (Accuracy, Precision, Recall, F1, ROC-AUC)',
      'Deployed React/FastAPI app with Supabase auth; users take typing assessments and receive generated reports',
    ],
    stack: ['Python', 'FastAPI', 'React', 'Supabase', 'Vercel', 'scikit-learn'],
    links: { live: 'TODO', github: 'TODO' },
    visual: 'TODO: animated keystroke-timing waveform (SVG/canvas) as the project visual',
  },
]

/** Smaller / public projects. The Projects grid is laid out for 4 entries. */
const projects: Project[] = [
  {
    id: 'ckd-predictor',
    index: '01',
    name: 'Chronic Kidney Disease Predictor',
    kind: 'Machine learning · Healthcare',
    summary:
      'Uses a Random Forest Classifier optimized with GridSearchCV to predict CKD based on six clinical features: Age, BUN, Diabetes, Creatinine Level, Hypertension, and GFR.',
    stack: ['scikit-learn', 'Random Forest', 'GridSearchCV'],
    links: { github: 'https://github.com/HN810/Chronic-Kidney-Disease-Predictor' },
  },
  {
    id: 'sign-language',
    index: '02',
    name: 'Sign Language Detector',
    kind: 'Computer vision · Real-time detection',
    summary:
      'A real-time sign language detection system with 100% accuracy across all 26 different gestures, using YOLOv8 object detection to identify hand gestures.',
    stack: ['Python', 'YOLOv8'],
    links: { github: 'https://github.com/HN810/Sign-Language-Detector' },
  },
  {
    id: 'uav-landing',
    index: '03',
    name: 'Autonomous UAV Landing',
    kind: 'University of Waterloo Aerial Robotics Group',
    period: 'Sep – Dec 2025',
    summary:
      'Computer-vision landing-zone prediction integrated with the flight stack for end-to-end autonomous landing.',
    highlights: [
      'Processes live camera feeds at 30+ FPS',
      'Landing-zone prediction at 92% accuracy across 5,000+ real-time frames',
      'Integrated with the existing flight stack for end-to-end autonomous landing',
    ],
    stack: ['Python', 'PyTorch', 'NumPy', 'OpenCV'],
    links: { github: 'https://github.com/HN810/autonomy-bootcamp-2025-p1' },
    visual: 'TODO: top-down landing-pad bounding-box animation (SVG)',
  },
  {
    id: 'semantic-image-search',
    index: '04',
    name: 'Semantic Image Search Engine',
    kind: 'Multimodal AI · Retrieval',
    summary:
      'Multimodal AI image search engine using OpenCLIP and FAISS for natural-language retrieval across image datasets.',
    stack: ['OpenCLIP', 'FAISS'],
    links: { github: 'https://github.com/HN810/Semantic-Image-Search-Engine' },
  },
]

export const content = {
  site: {
    name: 'Hussain Nasir',
    title: 'Software Engineer · AI / ML',
    tagline:
      'I build intelligent systems that work in the real world, from healthcare workflows to autonomous drones.',
    location: 'Toronto / Waterloo, ON',
    status: 'CS & Math (Co-op) @ University of Waterloo, graduating May 2029',
    links: {
      email: 'hussain.nasir@uwaterloo.ca',
      linkedin: 'https://linkedin.com/in/hussain-nasir',
      github: 'https://github.com/HN810',
      resume: 'https://drive.google.com/file/d/1rvjJNAv3oS7cKqqZ8fSUCSzbLx_3zM0Z/view?usp=sharing',
      calender: 'https://calendly.com/hussain-nasir/30min',
    },
    /** Typing terminal card (hero, right side). Include the leading "> ". */
    terminalLines: [
      '> status: shipping AI products people actually use',
      '> location: Toronto / Waterloo, ON',
      '> studying: CS + Math @ UWaterloo',
    ],
  },
  nav: [
    { label: 'About', target: '#about' },
    { label: 'Experience', target: '#experience' },
    { label: 'Products', target: '#products' },
    { label: 'Projects', target: '#projects' },
    { label: 'Skills', target: '#skills' },
  ],
  about: {
    heading: "Hello, I'm Hussain.",
    body: [
      "I'm a Computer Science and Mathematics student at the University of Waterloo who enjoys turning complex, real-world problems into reliable software.",
      "I've shipped production LLM systems at Northbridge Financial, co-founded a healthcare workflow platform running in pilot clinics, and am building Cogd.ai, a digital health platform exploring keystroke dynamics as a biomarker for cognitive and neurological health. I enjoy building end-to-end solutions that move beyond prototypes to solve real problems for real users.",
    ],
    education: {
      school: 'University of Waterloo',
      degree: "Bachelor's (Honours), Computer Science and Mathematics (Co-op)",
      graduation: 'May 2028',
      coursework: [
        'Data Structures & Algorithms',
        'Linear Algebra',
        'Statistics',
        'Object-Oriented Programming',
      ],
    },
    quick_stats: [
      { value: '14', label: 'beta testers using Cogd.ai' },
      { value: '2', label: 'clinics piloting the AI healthcare workflow platform' },
      { value: 'End-to-end', label: 'from AI systems to shipped products' },
    ],
  },
  products,
  projects,
  experience: [
    {
      role: 'AI Engineer Intern',
      company: 'Northbridge Financial Corporation',
      location: 'Toronto, ON',
      period: 'Jan 2026 – Aug 2026',
      bullets: [
        'Built a risk classification model with 97%+ recall at 65%+ precision to minimize missed high-risk cases, evaluated across 5K+ underwriting submissions, with borderline cases routed to human underwriter review',
        'Engineered production LLM APIs with structured prompts, JSON validation and fallback logic, achieving 99%+ valid structured outputs',
        'Batched LLM prompt calls to cut per-submission latency and API costs',
        'Deployed the risk classification pipeline as a FastAPI service for production underwriting workflows',
      ],
    },
  ],
  skills: {
    groups: [
      { name: 'Languages', items: ['Python', 'C++', 'C', 'JavaScript', 'SQL', 'Bash', 'HTML/CSS'] },
      {
        name: 'AI / ML',
        items: ['PyTorch', 'scikit-learn', 'YOLOv8', 'OpenCV', 'MediaPipe', 'LLM pipelines', 'Structured extraction'],
      },
      { name: 'Data', items: ['pandas', 'NumPy', 'Matplotlib'] },
      { name: 'Backend & Cloud', items: ['FastAPI', 'REST APIs', 'Microsoft Azure', 'Railway', 'Supabase'] },
      { name: 'Tools', items: ['Git/GitHub', 'CI/CD', 'Linux'] },
    ],
    certifications: ['Microsoft Azure Fundamentals (AZ-900)'],
  },
} as const

export type Content = typeof content
