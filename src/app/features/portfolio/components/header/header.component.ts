import { Component, ChangeDetectionStrategy, signal, OnInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MagneticDirective } from '../../../../shared/directives/magnetic.directive';
import { PortfolioService } from '../../../../core/services/portfolio.service';
import { ThemeService } from '../../../../core/services/theme.service';

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
  private readonly portfolioService = inject(PortfolioService);
  private readonly themeService = inject(ThemeService);
  
  isMobileMenuOpen = signal<boolean>(false);
  isScrolled = signal<boolean>(false);
  scrollProgress = signal<number>(0);
  contactInfo = this.portfolioService.getContactInfo();
  isDarkMode = this.themeService.isDarkMode;

  private scrollListener: (() => void) | null = null;

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {

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
