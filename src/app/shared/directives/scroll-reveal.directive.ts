import { Directive, ElementRef, Renderer2, Input, OnInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly platformId = inject(PLATFORM_ID);

  @Input('appScrollReveal') animationType: 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale' | 'flip' | '' = 'slide-up';
  @Input() delay = 0; // delay in milliseconds
  @Input() repeat = true; // repeat when scrolling up/down
  @Input() threshold = 0.1; // intersection observer threshold

  private observer: IntersectionObserver | null = null;

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    const nativeEl = this.el.nativeElement;
    
    // Add base classes
    this.renderer.addClass(nativeEl, 'reveal-item');
    const type = this.animationType || 'slide-up';
    this.renderer.addClass(nativeEl, `reveal-${type}`);

    if (this.delay > 0) {
      this.renderer.setStyle(nativeEl, 'transition-delay', `${this.delay}ms`);
    }

    this.initObserver();
  }

  private initObserver() {
    const options = {
      root: null,
      threshold: this.threshold,
      rootMargin: '0px 0px -40px 0px' // triggers slightly before entering the center of the viewport
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.addClass(this.el.nativeElement, 'reveal-visible');
        } else if (this.repeat) {
          // Remove to allow re-animating when scrolling back up or down
          const rect = entry.boundingClientRect;
          const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
          const isBelow = rect.top > viewportHeight;
          const isAbove = rect.bottom < 0;
          if (isBelow || isAbove) {
            this.renderer.removeClass(this.el.nativeElement, 'reveal-visible');
          }
        }
      });
    }, options);

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
