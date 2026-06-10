import { 
  StatItem, 
  SkillCategory, 
  ExperienceItem, 
  ProjectItem, 
  HighlightItem, 
  SkillProficiency, 
  ContactInfo 
} from '../models/portfolio.model';

export const STATS_ITEMS: StatItem[] = [
  { value: '4+', label: 'Years of experience' },
  { value: '15+', label: 'Projects completed' },
  { value: '10+', label: 'Satisfied clients' },
  { value: '100%', label: 'Success rate' }
];

export const TICKER_ITEMS: string[] = [
  'Angular', 'TypeScript', 'JavaScript', 'Node.js', 'Express.js', 'NestJS', 
  'MongoDB', 'PostgreSQL', 'MySQL', 'Docker', 'AWS', 'Firebase', 
  'Git', 'Bootstrap', 'Tailwind CSS', 'RxJS', 'NgRx', 'Jasmine', 'Jest'
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend',
    badgeClass: 'badge-purple',
    icon: 'bi-window-sidebar',
    skills: ['Angular', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3/SCSS', 'Bootstrap', 'Tailwind CSS']
  },
  {
    title: 'Backend & DB',
    badgeClass: 'badge-green',
    icon: 'bi-database',
    skills: ['Node.js', 'NestJS', 'Express.js', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis']
  },
  {
    title: 'DevOps',
    badgeClass: 'badge-blue',
    icon: 'bi-cloud-arrow-up',
    skills: ['Docker', 'AWS', 'CI/CD', 'Git', 'GitHub Actions']
  },
  {
    title: 'Testing & Tools',
    badgeClass: 'badge-pink',
    icon: 'bi-tools',
    skills: ['Jasmine', 'Karma', 'Jest', 'Postman', 'Swagger', 'Webpack']
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp1',
    role: 'Lead Engineer',
    company: 'Tech Solutions Ltd',
    timeline: 'Jan 2023 - Present',
    description: 'Lead development of scalable web applications. Managed a team of 5 developers. Architected microservices and frontend architectures.',
    tags: ['Angular', 'NestJS', 'AWS', 'Docker'],
    isPresent: true
  },
  {
    id: 'exp2',
    role: 'Software Engineer',
    company: 'Web Innovations',
    timeline: 'Jun 2021 - Dec 2022',
    description: 'Developed enterprise applications using Angular and Node.js. Optimized frontend performance by 40% and improved Web Vitals score.',
    tags: ['Angular', 'Node.js', 'MongoDB', 'Express']
  },
  {
    id: 'exp3',
    role: 'Junior Web Developer',
    company: 'Digital Agency',
    timeline: 'Jan 2020 - May 2021',
    description: 'Built responsive websites and integrations. Maintained client portals and worked closely with design team to replicate mockups.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Bootstrap']
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'proj1',
    title: 'E-Commerce Platform',
    badge: 'Featured',
    badgeClass: 'badge-green',
    description: 'A scalable, feature-rich e-commerce store with secure payment integrations, dynamic search filters, and an admin dashboard.',
    tags: ['Angular', 'Node.js', 'MongoDB', 'Stripe'],
    category: 'Full-Stack'
  },
  {
    id: 'proj2',
    title: 'Task Management App',
    badge: 'Productivity',
    badgeClass: 'badge-blue',
    description: 'A collaborative task management application with real-time updates, drag-and-drop boards, and team workspaces.',
    tags: ['Angular', 'Firebase', 'NgRx', 'Socket.io'],
    category: 'Frontend'
  },
  {
    id: 'proj3',
    title: 'Analytics Dashboard',
    badge: 'Business',
    badgeClass: 'badge-orange',
    description: 'An interactive dashboard with charts, reports, and data visualization tools tracking user acquisition and conversion metrics.',
    tags: ['Angular', 'D3.js', 'Express', 'PostgreSQL'],
    category: 'Full-Stack'
  },
  {
    id: 'proj4',
    title: 'Portfolio Website',
    badge: 'Personal',
    badgeClass: 'badge-pink',
    description: 'A modern, responsive portfolio website built with Angular 19, custom CSS variables, and server-side rendering (SSR).',
    tags: ['Angular', 'TypeScript', 'SCSS', 'SSR'],
    category: 'Frontend'
  }
];

export const HIGHLIGHTS: HighlightItem[] = [
  {
    title: 'Mentor & Speaker',
    description: 'Guided 20+ junior developers and spoke at regional web developer meetups.',
    iconClass: 'bi-people',
    colorClass: 'orange'
  },
  {
    title: 'Open-Source Contributor',
    description: 'Contributed to popular Angular and UI libraries focusing on accessibility and speed.',
    iconClass: 'bi-github',
    colorClass: 'blue'
  },
  {
    title: 'Technical Writing',
    description: 'Published articles on Angular performance, hydration-safety, and RxJS state patterns.',
    iconClass: 'bi-pencil-square',
    colorClass: 'purple'
  },
  {
    title: 'Architecture Review',
    description: 'Conducted architecture reviews and system design audits to improve application scalability.',
    iconClass: 'bi-diagram-3',
    colorClass: 'teal'
  },
  {
    title: 'Clean Code Advocate',
    description: 'Promoted SOLID and Clean Architecture principles, ensuring code modularity and testability.',
    iconClass: 'bi-check-circle',
    colorClass: 'green'
  },
  {
    title: 'Continuous Learning',
    description: 'Keeping up to date with latest Angular versions, standalone architectures, and signal APIs.',
    iconClass: 'bi-book',
    colorClass: 'pink'
  }
];

export const SKILL_PROFICIENCIES: SkillProficiency[] = [
  { name: 'Angular', level: 95, color: 'var(--color-primary)' },
  { name: 'TypeScript', level: 90, color: 'var(--color-secondary)' },
  { name: 'Node.js & Express', level: 85, color: '#33D391' },
  { name: 'NestJS', level: 80, color: '#E0234E' },
  { name: 'Database (SQL & NoSQL)', level: 80, color: '#0284C7' },
  { name: 'DevOps / AWS / Docker', level: 75, color: '#F59E0B' }
];

export const CONTACT_INFO: ContactInfo = {
  email: 'contact@prawin.dev',
  phone: '+1 (555) 019-2834',
  location: 'San Francisco, CA',
  github: 'https://github.com/prawin',
  linkedin: 'https://linkedin.com/in/prawin',
  twitter: 'https://twitter.com/prawin'
};
