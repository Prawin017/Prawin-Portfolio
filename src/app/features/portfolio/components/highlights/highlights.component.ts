import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightItem } from '../../../../core/models/portfolio.model';
import { NoBreakHyphenPipe } from '../../../../shared/pipes/no-break-hyphen.pipe';

@Component({
  selector: 'app-highlights',
  standalone: true,
  imports: [CommonModule, NoBreakHyphenPipe],
  templateUrl: './highlights.component.html',
  styleUrl: './highlights.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HighlightsComponent {
  highlights = input.required<HighlightItem[]>();
}
