import { Component, OnInit, OnDestroy, inject, PLATFORM_ID, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-custom-cursor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-cursor.component.html',
  styleUrl: './custom-cursor.component.scss'
})
export class CustomCursorComponent implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);

  isVisible = signal<boolean>(false);
  isHovered = signal<boolean>(false);
  isHidden = signal<boolean>(false);

  private mouseX = 0;
  private mouseY = 0;
  private cursorX = 0;
  private cursorY = 0;
  private animationId = 0;

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    // Detect coarse pointers (touchscreen devices)
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    if (isTouchDevice) {
      this.isHidden.set(true);
      return;
    }

    document.addEventListener('mouseenter', this.onMouseEnter);
    document.addEventListener('mouseleave', this.onMouseLeave);
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseover', this.onMouseOver);

    this.animateCursor();
  }

  ngOnDestroy() {
    if (!isPlatformBrowser(this.platformId)) return;

    document.removeEventListener('mouseenter', this.onMouseEnter);
    document.removeEventListener('mouseleave', this.onMouseLeave);
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseover', this.onMouseOver);

    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  private onMouseMove = (e: MouseEvent) => {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
    if (!this.isVisible()) {
      this.isVisible.set(true);
    }
  };

  private onMouseEnter = () => {
    this.isVisible.set(true);
  };

  private onMouseLeave = () => {
    this.isVisible.set(false);
  };

  private onMouseOver = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target) return;

    const isInteractive = 
      target.tagName === 'A' || 
      target.tagName === 'BUTTON' || 
      target.tagName === 'INPUT' || 
      target.tagName === 'TEXTAREA' || 
      target.tagName === 'SELECT' || 
      target.closest('a') !== null || 
      target.closest('button') !== null || 
      target.closest('.interactive') !== null ||
      target.closest('[appMagnetic]') !== null ||
      target.closest('.logo-text') !== null ||
      target.closest('.btn-resume') !== null;

    this.isHovered.set(!!isInteractive);
  };

  private animateCursor = () => {
    const ease = 0.15; // Lerp spring constant
    this.cursorX += (this.mouseX - this.cursorX) * ease;
    this.cursorY += (this.mouseY - this.cursorY) * ease;

    const cursorEl = document.querySelector('.custom-cursor-follower') as HTMLElement;
    if (cursorEl) {
      const size = this.isHovered() ? 48 : 24;
      cursorEl.style.transform = `translate3d(${this.cursorX - size/2}px, ${this.cursorY - size/2}px, 0)`;
    }

    this.animationId = requestAnimationFrame(this.animateCursor);
  };
}
