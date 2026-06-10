import { Component, ChangeDetectionStrategy, inject, computed, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { firstValueFrom } from 'rxjs';

import { PortfolioService } from '../../core/services/portfolio.service';
import { PortfolioStore } from '../../core/store/portfolio.store';
import { ContactForm } from '../../core/models/portfolio.model';

/* Import Dumb Components */
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { TickerComponent } from './components/ticker/ticker.component';
import { TechStackComponent } from './components/tech-stack/tech-stack.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { HighlightsComponent } from './components/highlights/highlights.component';
import { ProficiencyComponent } from './components/proficiency/proficiency.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    HeroComponent,
    TickerComponent,
    TechStackComponent,
    ExperienceComponent,
    ProjectsComponent,
    HighlightsComponent,
    ProficiencyComponent,
    ContactComponent,
    FooterComponent
  ],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioComponent {
  private readonly service = inject(PortfolioService);
  private readonly store = inject(PortfolioStore);
  private readonly platformId = inject(PLATFORM_ID);

  /* Get Data Signals from Service */
  stats = this.service.getStats();
  tickerItems = this.service.getTickerItems();
  skillCategories = this.service.getSkillCategories();
  experiences = this.service.getExperiences();
  allProjects = this.service.getProjects();
  highlights = this.service.getHighlights();
  skillProficiencies = this.service.getSkillProficiencies();
  contactInfo = this.service.getContactInfo();

  /* Get Store State Signals */
  selectedCategory = this.store.selectedCategory;
  submitState = this.store.contactSubmitState;
  errorMessage = this.store.contactErrorMessage;

  /* Computed Signals for dynamic filtering */
  categories = computed(() => {
    return ['All', ...Array.from(new Set(this.allProjects().map(p => p.category)))];
  });

  filteredProjects = computed(() => {
    const category = this.selectedCategory();
    const projects = this.allProjects();
    if (category === 'All') {
      return projects;
    }
    return projects.filter(p => p.category === category);
  });

  /* Orchestration Methods */
  onCategorySelect(category: string) {
    this.store.setSelectedCategory(category);
  }

  scrollTo(sectionId: string) {
    if (isPlatformBrowser(this.platformId)) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  async handleContactSubmit(form: ContactForm) {
    this.store.setContactSubmitting();
    try {
      await firstValueFrom(this.service.submitContactForm(form));
      this.store.setContactSuccess();
      
      // Auto-clear success message after 5 seconds
      if (isPlatformBrowser(this.platformId)) {
        setTimeout(() => {
          this.store.resetContactState();
        }, 5000);
      }
    } catch (err: any) {
      this.store.setContactError(err.message || 'An error occurred during submission.');
    }
  }
}
