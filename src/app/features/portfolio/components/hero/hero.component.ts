import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatItem } from '../../../../core/models/portfolio.model';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroComponent {
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
