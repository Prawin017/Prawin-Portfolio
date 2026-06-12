import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillProficiency } from '../../../../core/models/portfolio.model';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-proficiency',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './proficiency.component.html',
  styleUrl: './proficiency.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProficiencyComponent {
  proficiencies = input.required<SkillProficiency[]>();
}
