import { Injectable, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly STORAGE_KEY = 'portfolio-theme';

  private readonly themeSignal = signal<ThemeMode>('light');

  readonly currentTheme = this.themeSignal.asReadonly();
  readonly isDarkMode = computed(() => this.themeSignal() === 'dark');

  constructor() {
    this.initTheme();
  }

  private initTheme(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // 1. Check localStorage first
    const savedTheme = localStorage.getItem(this.STORAGE_KEY) as ThemeMode | null;

    if (savedTheme === 'light' || savedTheme === 'dark') {
      this.applyTheme(savedTheme);
      return;
    }

    // 2. Check system preference
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme: ThemeMode = prefersDark ? 'dark' : 'light';
    this.applyTheme(initialTheme);

    // 3. Listen for OS-level changes if user hasn't explicitly set a preference
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(this.STORAGE_KEY)) {
        this.applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  toggleTheme(): void {
    const nextTheme: ThemeMode = this.themeSignal() === 'light' ? 'dark' : 'light';
    this.setTheme(nextTheme);
  }

  setTheme(theme: ThemeMode): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.STORAGE_KEY, theme);
    }
    this.applyTheme(theme);
  }

  private applyTheme(theme: ThemeMode): void {
    this.themeSignal.set(theme);

    if (isPlatformBrowser(this.platformId)) {
      const root = document.documentElement;
      root.setAttribute('data-theme', theme);
      
      // Also maintain class for CSS frameworks/libraries if needed
      if (theme === 'dark') {
        root.classList.add('dark-theme');
        document.body.classList.add('dark-theme');
      } else {
        root.classList.remove('dark-theme');
        document.body.classList.remove('dark-theme');
      }
    }
  }
}
