import { Component, ChangeDetectionStrategy, input, output, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactForm, ContactInfo } from '../../../../core/models/portfolio.model';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);

  contactInfo = input.required<ContactInfo>();
  submitState = input.required<'idle' | 'submitting' | 'success' | 'error'>();
  errorMessage = input<string | null>(null);

  formSubmitted = output<ContactForm>();

  contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  constructor() {
    // Automatically reset the form on success state
    effect(() => {
      if (this.submitState() === 'success') {
        this.contactForm.reset();
      }
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.formSubmitted.emit(this.contactForm.value);
    } else {
      this.contactForm.markAllAsTouched();
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.contactForm.get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
