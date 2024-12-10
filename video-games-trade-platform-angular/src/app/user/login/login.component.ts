import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';

import { UserService } from '../user.service';
import { animations } from '../../animations/animations';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  animations: [
    animations.bounceAnimation,
    animations.fadeInAnimation,
    animations.fadeInSlowAnimation,
  ],
})
export class LoginComponent {

  constructor(
    private userService: UserService,
    private router: Router,
    private titleService: Title,
    private location: Location,
  ) {
    this.titleService.setTitle("Login");
  }

  goBack() {
    this.location.back();
  }

  login(form: NgForm) {
    // console.log(form);
    
    if (form.invalid){
      console.error('Invalid login form');
      return;
    }

    // console.log(form.value);

    const { email, password } = form.value;

    this.userService.login(email, password).subscribe(() => {
      this.router.navigate(['/home']);
    });
    // form.reset();
  }
}
