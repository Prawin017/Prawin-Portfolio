import { Component, ChangeDetectionStrategy, input, output, signal, OnInit, OnDestroy, inject, PLATFORM_ID, effect } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { StatItem, HeroInfo } from '../../../../core/models/portfolio.model';
import { NoBreakHyphenPipe } from '../../../../shared/pipes/no-break-hyphen.pipe';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';
import { MagneticDirective } from '../../../../shared/directives/magnetic.directive';
import { PortfolioService } from '../../../../core/services/portfolio.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    CommonModule,
    NoBreakHyphenPipe,
    ScrollRevealDirective,
    MagneticDirective
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroComponent implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly portfolioService = inject(PortfolioService);

  heroInfo = input.required<HeroInfo>();
  stats = input.required<StatItem[]>();

  constructor() {
    effect(() => {
      const info = this.heroInfo();
      if (info) {
        if (info.coffeeCount !== undefined) this.coffeeCount.set(info.coffeeCount);
        if (info.bugCount !== undefined) this.bugCount.set(info.bugCount);
        if (info.deployCount !== undefined) this.deployCount.set(info.deployCount);
        if (info.ideaCount !== undefined) this.ideaCount.set(info.ideaCount);
        if (info.roles && info.roles.length > 0) {
          this.roles = info.roles;
          this.roleIndex = this.roleIndex % this.roles.length;
        }
        if (info.funFacts && info.funFacts.length > 0) {
          this.funFacts = info.funFacts;
          this.currentFactIndex.update(idx => idx % this.funFacts.length);
        }
      }
    });
  }

  hireMe = output<void>();
  viewWork = output<void>();

  // Typewriter effect
  displayText = signal<string>('');
  private roleIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private timerId: any = null;
  private roles = [
    'Full-Stack Engineer',
    'Problem Solver',
    'Coffee-Driven Developer',
    'Angular Specialist',
    'Debug Detective',
    'Human Stack Overflow',
    'Chaos-to-Code Converter'
  ];

  // Coffee Clicker Easter Egg
  coffeeCount = signal<number>(42);
  showCoffeeSteam = signal<boolean>(false);

  // Bug squashing counter (💻 click)
  bugCount = signal<number>(312);
  showCodeFeedback = signal<boolean>(false);

  // Deploy launches counter (🚀 click)
  deployCount = signal<number>(148);
  showRocketFeedback = signal<boolean>(false);
  isRocketLaunching = signal<boolean>(false);

  // Brain storm ideas counter (🧠 click)
  ideaCount = signal<number>(89);
  showBrainFeedback = signal<boolean>(false);

  // Fun Fact cycler
  funFacts = [
    '🐛 Thinks debugging is like detective work.',
    '📈 Optimizing everything I touch.',
    '🏦 Banking apps without banking stress.',
    '🎯 Turning chaos into clean code.',
    '☕ Runs on 100% Arabica & clean code.',
    '🌙 Late-night fixes, early deployments.'
  ];
  currentFactIndex = signal<number>(0);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.startTypewriter();
    }
  }

  ngOnDestroy() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }

  startTypewriter() {
    const currentRole = this.roles[this.roleIndex];
    
    if (this.isDeleting) {
      // Deleting letters
      this.displayText.set(currentRole.substring(0, this.charIndex - 1));
      this.charIndex--;
    } else {
      // Adding letters
      this.displayText.set(currentRole.substring(0, this.charIndex + 1));
      this.charIndex++;
    }

    let speed = 80; // Typing speed in ms

    if (this.isDeleting) {
      speed /= 2; // Delete twice as fast
    }

    if (!this.isDeleting && this.charIndex === currentRole.length) {
      speed = 2000; // Pause at full word
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.roleIndex = (this.roleIndex + 1) % this.roles.length;
      speed = 500; // Pause before typing next word
    }

    this.timerId = setTimeout(() => this.startTypewriter(), speed);
  }

  onHireMeClick() {
    this.hireMe.emit();
  }

  onViewWorkClick() {
    this.viewWork.emit();
  }

  // Coffee click handler
  clickCoffee() {
    this.coffeeCount.update(c => c + 1);
    this.showCoffeeSteam.set(true);
    setTimeout(() => {
      this.showCoffeeSteam.set(false);
    }, 1000);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('prawin-coffee-count', this.coffeeCount().toString());
      this.portfolioService.incrementHeroMetric('coffeeCount').subscribe({
        next: (res) => {
          if (res && res.success) {
            this.coffeeCount.set(res.value);
          }
        },
        error: (err) => console.error('Failed to increment coffeeCount in MongoDB', err)
      });
    }
  }

  // Bug squash click handler (💻)
  clickCode() {
    this.bugCount.update(b => b + 1);
    this.showCodeFeedback.set(true);
    setTimeout(() => {
      this.showCodeFeedback.set(false);
    }, 1000);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('prawin-bug-count', this.bugCount().toString());
      this.portfolioService.incrementHeroMetric('bugCount').subscribe({
        next: (res) => {
          if (res && res.success) {
            this.bugCount.set(res.value);
          }
        },
        error: (err) => console.error('Failed to increment bugCount in MongoDB', err)
      });
    }
  }

  // Deploy launches click handler (🚀)
  clickRocket() {
    if (this.isRocketLaunching()) return; // Prevent spamming launch animation
    
    this.deployCount.update(d => d + 1);
    this.showRocketFeedback.set(true);
    this.isRocketLaunching.set(true);
    
    setTimeout(() => {
      this.showRocketFeedback.set(false);
    }, 1000);

    setTimeout(() => {
      this.isRocketLaunching.set(false);
    }, 1200); // Reset launch flag after animation completes

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('prawin-deploy-count', this.deployCount().toString());
      this.portfolioService.incrementHeroMetric('deployCount').subscribe({
        next: (res) => {
          if (res && res.success) {
            this.deployCount.set(res.value);
          }
        },
        error: (err) => console.error('Failed to increment deployCount in MongoDB', err)
      });
    }
  }

  // Brain storm click handler (🧠)
  clickBrain() {
    this.ideaCount.update(i => i + 1);
    this.showBrainFeedback.set(true);
    setTimeout(() => {
      this.showBrainFeedback.set(false);
    }, 1000);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('prawin-idea-count', this.ideaCount().toString());
      this.portfolioService.incrementHeroMetric('ideaCount').subscribe({
        next: (res) => {
          if (res && res.success) {
            this.ideaCount.set(res.value);
          }
        },
        error: (err) => console.error('Failed to increment ideaCount in MongoDB', err)
      });
    }
  }

  // Next fun fact handler
  nextFact() {
    this.currentFactIndex.update(idx => (idx + 1) % this.funFacts.length);
  }
}
