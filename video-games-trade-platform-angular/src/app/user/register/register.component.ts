import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { MatchPasswordDirective } from '../../directives/match-password.directive';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, MatchPasswordDirective],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private userService: UserService, private router: Router) {}

  register(form: NgForm) {
    console.log(form.invalid);
    if (form.invalid){
      console.error('Invalid register form');
      return;
    }

    // this.userService.register(); //TODO
    this.router.navigate(['/home']);
  }
}
