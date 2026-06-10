import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ticker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticker.component.html',
  styleUrl: './ticker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TickerComponent {
  items = input.required<string[]>();
}
