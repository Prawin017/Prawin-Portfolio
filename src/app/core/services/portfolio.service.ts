import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ENV } from '../config/env.config';
import { 
  ContactForm, 
  ExperienceItem, 
  HighlightItem, 
  ProjectItem, 
  SkillCategory, 
  SkillProficiency, 
  StatItem, 
  ContactInfo,
  HeroInfo
} from '../models/portfolio.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = ENV.apiUrl;

  private readonly stats = signal<StatItem[]>([]);
  private readonly tickerItems = signal<string[]>([]);
  private readonly skillCategories = signal<SkillCategory[]>([]);
  private readonly experiences = signal<ExperienceItem[]>([]);
  private readonly projects = signal<ProjectItem[]>([]);
  private readonly highlights = signal<HighlightItem[]>([]);
  private readonly skillProficiencies = signal<SkillProficiency[]>([]);
  private readonly contactInfo = signal<ContactInfo>({
    email: '',
    phone: '',
    location: '',
    github: '',
    linkedin: '',
    twitter: ''
  });
  private readonly heroInfo = signal<HeroInfo>({
    name: '',
    role: '',
    description: '',
    badgeText: '',
    avatarLetter: ''
  });


  constructor() {
    this.loadPortfolioData();
  }

  private loadPortfolioData() {
    this.http.get<StatItem[]>(`${this.apiUrl}/stats`).subscribe({
      next: (data) => this.stats.set(data),
      error: (err) => console.error('Failed to load stats', err)
    });

    this.http.get<string[]>(`${this.apiUrl}/ticker`).subscribe({
      next: (data) => this.tickerItems.set(data),
      error: (err) => console.error('Failed to load ticker items', err)
    });

    this.http.get<SkillCategory[]>(`${this.apiUrl}/skill-categories`).subscribe({
      next: (data) => this.skillCategories.set(data),
      error: (err) => console.error('Failed to load skill categories', err)
    });

    this.http.get<ExperienceItem[]>(`${this.apiUrl}/experiences`).subscribe({
      next: (data) => this.experiences.set(data),
      error: (err) => console.error('Failed to load experiences', err)
    });

    this.http.get<ProjectItem[]>(`${this.apiUrl}/projects`).subscribe({
      next: (data) => this.projects.set(data),
      error: (err) => console.error('Failed to load projects', err)
    });

    this.http.get<HighlightItem[]>(`${this.apiUrl}/highlights`).subscribe({
      next: (data) => this.highlights.set(data),
      error: (err) => console.error('Failed to load highlights', err)
    });

    this.http.get<SkillProficiency[]>(`${this.apiUrl}/skill-proficiencies`).subscribe({
      next: (data) => this.skillProficiencies.set(data),
      error: (err) => console.error('Failed to load skill proficiencies', err)
    });

    this.http.get<ContactInfo>(`${this.apiUrl}/contact-info`).subscribe({
      next: (data) => this.contactInfo.set(data),
      error: (err) => console.error('Failed to load contact info', err)
    });

    this.http.get<HeroInfo>(`${this.apiUrl}/hero`).subscribe({
      next: (data) => this.heroInfo.set(data),
      error: (err) => console.error('Failed to load hero info', err)
    });
  }

  getStats() {
    return this.stats.asReadonly();
  }

  getTickerItems() {
    return this.tickerItems.asReadonly();
  }

  getSkillCategories() {
    return this.skillCategories.asReadonly();
  }

  getExperiences() {
    return this.experiences.asReadonly();
  }

  getProjects() {
    return this.projects.asReadonly();
  }

  getHighlights() {
    return this.highlights.asReadonly();
  }

  getSkillProficiencies() {
    return this.skillProficiencies.asReadonly();
  }

  getContactInfo() {
    return this.contactInfo.asReadonly();
  }

  getHeroInfo() {
    return this.heroInfo.asReadonly();
  }


  submitContactForm(form: ContactForm): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/contact`, form);
  }
}
