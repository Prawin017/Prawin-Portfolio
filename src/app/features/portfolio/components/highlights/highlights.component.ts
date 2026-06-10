import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightItem } from '../../../../core/models/portfolio.model';

@Component({
  selector: 'app-highlights',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './highlights.component.html',
  styleUrl: './highlights.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HighlightsComponent {
  highlights = input.required<HighlightItem[]>();
}
