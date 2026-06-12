import { Component, ChangeDetectionStrategy, signal, OnInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MagneticDirective } from '../../../../shared/directives/magnetic.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MagneticDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  
  isMobileMenuOpen = signal<boolean>(false);
  isScrolled = signal<boolean>(false);
  scrollProgress = signal<number>(0);
  activeTheme = signal<string>('violet');

  themes = [
    { name: 'violet', label: 'Violet', color: '#7C3AED' },
    { name: 'pink', label: 'Pink', color: '#DB2777' },
    { name: 'emerald', label: 'Emerald', color: '#059669' },
    { name: 'amber', label: 'Amber', color: '#D97706' },
    { name: 'blue', label: 'Blue', color: '#2563EB' }
  ];

  private scrollListener: (() => void) | null = null;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Load saved theme
      const savedTheme = localStorage.getItem('prawin-theme');
      if (savedTheme) {
        this.setTheme(savedTheme);
      }

      // Add scroll listener
      this.scrollListener = () => {
        const yOffset = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
        this.isScrolled.set(yOffset > 30);

        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
        this.scrollProgress.set(scrolled);
      };

      window.addEventListener('scroll', this.scrollListener, { passive: true });
      this.scrollListener();
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId) && this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }

  setTheme(theme: string) {
    this.activeTheme.set(theme);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('prawin-theme', theme);
      
      const body = document.body;
      this.themes.forEach(t => {
        body.classList.remove(`theme-${t.name}`);
      });
      body.classList.add(`theme-${theme}`);
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(prev => !prev);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }

  scrollToSection(sectionId: string, event: Event) {
    event.preventDefault();
    this.closeMobileMenu();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
