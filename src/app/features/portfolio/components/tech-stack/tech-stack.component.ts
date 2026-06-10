import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillCategory } from '../../../../core/models/portfolio.model';

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tech-stack.component.html',
  styleUrl: './tech-stack.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TechStackComponent {
  categories = input.required<SkillCategory[]>();
}
