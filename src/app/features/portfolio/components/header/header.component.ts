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

  private scrollListener: (() => void) | null = null;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Remove any legacy theme classes from body
      const body = document.body;
      const themeClasses = Array.from(body.classList).filter(c => c.startsWith('theme-'));
      themeClasses.forEach(c => body.classList.remove(c));
      localStorage.removeItem('prawin-theme');

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
