import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillProficiency } from '../../../../core/models/portfolio.model';

@Component({
  selector: 'app-proficiency',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './proficiency.component.html',
  styleUrl: './proficiency.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProficiencyComponent {
  proficiencies = input.required<SkillProficiency[]>();
}
