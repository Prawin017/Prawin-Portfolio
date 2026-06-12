import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectItem } from '../../../../core/models/portfolio.model';
import { NoBreakHyphenPipe } from '../../../../shared/pipes/no-break-hyphen.pipe';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, NoBreakHyphenPipe],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent {
  projects = input.required<ProjectItem[]>();
  categories = input.required<string[]>();
  selectedCategory = input.required<string>();

  categorySelected = output<string>();

  selectCategory(category: string) {
    this.categorySelected.emit(category);
  }

  getProjectIcon(projectId: string): string {
    const icons: { [key: string]: string } = {
      'proj1': 'bi-cart3',
      'proj2': 'bi-check2-square',
      'proj3': 'bi-graph-up-arrow',
      'proj4': 'bi-person-badge'
    };
    return icons[projectId] || 'bi-laptop';
  }

  getProjectIconBg(projectId: string): string {
    const bgs: { [key: string]: string } = {
      'proj1': 'icon-bg-green',
      'proj2': 'icon-bg-blue',
      'proj3': 'icon-bg-orange',
      'proj4': 'icon-bg-pink'
    };
    return bgs[projectId] || 'icon-bg-purple';
  }
}
