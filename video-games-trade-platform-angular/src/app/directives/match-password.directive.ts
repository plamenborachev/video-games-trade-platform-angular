import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appMatchPassword]',
  standalone: true,
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: MatchPasswordDirective,
    multi: true
  }]
})
export class MatchPasswordDirective implements Validator {
  passwordValue: string | undefined;

  @Input() set appMatchPassword(confirm_value: string) {
    this.passwordValue = confirm_value;
  }

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.createMatchPasswordValidator()(control);
  }

  createMatchPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const confirmValue = control.value;
      return confirmValue !== this.passwordValue ? { match: true } : null;
    }
  }
}