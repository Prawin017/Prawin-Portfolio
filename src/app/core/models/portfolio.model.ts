export interface StatItem {
  value: string;
  label: string;
}

export interface SkillCategory {
  title: string;
  badgeClass: string;
  skills: string[];
  icon: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  timeline: string;
  description: string;
  tags: string[];
  isPresent?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  badge: string;
  badgeClass: string;
  description: string;
  tags: string[];
  category: 'Frontend' | 'Full-Stack' | 'Mobile' | 'Other';
  projectUrl?: string;
  githubUrl?: string;
}

export interface HighlightItem {
  title: string;
  description: string;
  iconClass: string;
  colorClass: string;
}

export interface SkillProficiency {
  name: string;
  level: number; // 0 - 100
  color: string; // CSS color string or class
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  twitter: string;
}

export interface HeroInfo {
  name: string;
  role: string;
  description: string;
  badgeText: string;
  avatarLetter: string;
}
