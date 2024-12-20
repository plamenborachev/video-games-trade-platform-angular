import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';

import { matchPasswordsValidator } from '../../utils/match-passwords.validator';
import { UserService } from '../user.service';
import { animations } from '../../animations/animations';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  animations: [
    animations.bounceAnimation,
    animations.fadeInAnimation,
    animations.fadeInSlowAnimation,
  ],
})
export class RegisterComponent {

  constructor(
    private userService: UserService,
    private router: Router,
    private titleService: Title,
    private location: Location,
  ) {
    this.titleService.setTitle("Register");
  }

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(5),]),
    email: new FormControl('', [Validators.required, Validators.email]),
    telephone: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
    passGroup: new FormGroup(
      {
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
        ]),
        rePassword: new FormControl('', [Validators.required]),
      },
      {
        validators: [matchPasswordsValidator('password', 'rePassword')],
      }
    ),
  });

  goBack() {
    this.location.back();
  }

  isFieldTextMissing(controlName: string) {
    return (
      this.form.get(controlName)?.touched &&
      this.form.get(controlName)?.errors?.['required']
    );
  }

  get isNotMinLength() {
    return (
      this.form.get('username')?.touched &&
      this.form.get('username')?.errors?.['minlength']
    );
  }

  get isEmailNotValid() {
    return (
      this.form.get('email')?.touched &&
      this.form.get('email')?.errors?.['email']
    );
  }

  get hasOnlyDigits() {
    return (
      this.form.get('telephone')?.touched &&
      this.form.get('telephone')?.errors?.['pattern']
    );
  }

  get passGroup() {
    return this.form.get('passGroup');
  }

  register() {
    if (this.form.invalid) {
      return;
    }

    // console.log(this.form.value);

    const {
      username,
      email,
      telephone,
      passGroup: { password, rePassword } = {},
    } = this.form.value;

    this.userService
      .register(username!, email!, telephone!, password!, rePassword!)
      .subscribe(() => {
        this.router.navigate(['/home']);
      });
    // this.form.reset();
  }
}
