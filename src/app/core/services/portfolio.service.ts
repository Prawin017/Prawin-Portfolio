import { Injectable, signal } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { 
  ContactForm, 
  ExperienceItem, 
  HighlightItem, 
  ProjectItem, 
  SkillCategory, 
  SkillProficiency, 
  StatItem, 
  ContactInfo 
} from '../models/portfolio.model';
import { 
  EXPERIENCES, 
  HIGHLIGHTS, 
  PROJECTS, 
  SKILL_CATEGORIES, 
  SKILL_PROFICIENCIES, 
  STATS_ITEMS, 
  TICKER_ITEMS,
  CONTACT_INFO
} from '../constants/portfolio.constants';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private readonly stats = signal<StatItem[]>(STATS_ITEMS);
  private readonly tickerItems = signal<string[]>(TICKER_ITEMS);
  private readonly skillCategories = signal<SkillCategory[]>(SKILL_CATEGORIES);
  private readonly experiences = signal<ExperienceItem[]>(EXPERIENCES);
  private readonly projects = signal<ProjectItem[]>(PROJECTS);
  private readonly highlights = signal<HighlightItem[]>(HIGHLIGHTS);
  private readonly skillProficiencies = signal<SkillProficiency[]>(SKILL_PROFICIENCIES);
  private readonly contactInfo = signal<ContactInfo>(CONTACT_INFO);

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

  submitContactForm(form: ContactForm): Observable<void> {
    // Check if user is simulating an error
    if (form.message.toLowerCase().includes('error') || form.name.toLowerCase().includes('error')) {
      return throwError(() => new Error('Something went wrong. Please try again later.')).pipe(
        delay(1500)
      );
    }
    return of(undefined).pipe(delay(1500));
  }
}
