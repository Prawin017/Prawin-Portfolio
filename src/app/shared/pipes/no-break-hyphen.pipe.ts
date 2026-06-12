import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noBreakHyphen',
  standalone: true
})
export class NoBreakHyphenPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';
    // Replace standard hyphen (U+002D) with non-breaking hyphen (U+2011)
    // only when it occurs between word characters (letters/numbers).
    return value.replace(/\b-\b/g, '\u2011');
  }
}
