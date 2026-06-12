import { Directive, ElementRef, Renderer2, HostListener, Input, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appMagnetic]',
  standalone: true
})
export class MagneticDirective implements OnInit {
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly platformId = inject(PLATFORM_ID);

  @Input() magneticStrength = 0.35; // Strength multiplier
  @Input() magneticScale = 1.03;    // Small scale up on hover

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    
    // Apply initial transition rule
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)');
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!isPlatformBrowser(this.platformId)) return;

    const nativeEl = this.el.nativeElement;
    const rect = nativeEl.getBoundingClientRect();
    
    // Calculate mouse coordinates relative to the element center
    const x = (event.clientX - rect.left - (rect.width / 2)) * this.magneticStrength;
    const y = (event.clientY - rect.top - (rect.height / 2)) * this.magneticStrength;

    // Use a quick response transition for smooth mouse tracking
    this.renderer.setStyle(nativeEl, 'transition', 'transform 0.08s cubic-bezier(0.25, 1, 0.5, 1)');
    this.renderer.setStyle(nativeEl, 'transform', `translate(${x}px, ${y}px) scale(${this.magneticScale})`);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (!isPlatformBrowser(this.platformId)) return;

    const nativeEl = this.el.nativeElement;
    
    // Smooth snap back using an elastic cubic-bezier curve
    this.renderer.setStyle(nativeEl, 'transition', 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)');
    this.renderer.setStyle(nativeEl, 'transform', 'translate(0px, 0px) scale(1)');
  }
}
