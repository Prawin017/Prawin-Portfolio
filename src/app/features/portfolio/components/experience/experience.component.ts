import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceItem } from '../../../../core/models/portfolio.model';
import { NoBreakHyphenPipe } from '../../../../shared/pipes/no-break-hyphen.pipe';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, NoBreakHyphenPipe],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperienceComponent {
  experiences = input.required<ExperienceItem[]>();

  getTimelineBorderClass(index: number): string {
    const classes = ['border-purple', 'border-blue', 'border-pink'];
    return classes[index % classes.length];
  }

  getDotClass(index: number): string {
    const classes = ['dot-purple', 'dot-blue', 'dot-pink'];
    return classes[index % classes.length];
  }
}
