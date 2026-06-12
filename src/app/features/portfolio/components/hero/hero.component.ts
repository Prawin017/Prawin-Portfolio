import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatItem, HeroInfo } from '../../../../core/models/portfolio.model';
import { NoBreakHyphenPipe } from '../../../../shared/pipes/no-break-hyphen.pipe';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, NoBreakHyphenPipe],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroComponent {
  heroInfo = input.required<HeroInfo>();
  stats = input.required<StatItem[]>();

  hireMe = output<void>();
  viewWork = output<void>();

  onHireMeClick() {
    this.hireMe.emit();
  }

  onViewWorkClick() {
    this.viewWork.emit();
  }
}
