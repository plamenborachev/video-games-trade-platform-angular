import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, TitleCasePipe,],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent{
  menuOpen: boolean = false;  

  constructor(private userService: UserService, private router: Router){}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  get isLoggedIn(): boolean {
    // console.log('HeaderComponent => isLogged => ' + this.userService.isLogged);
    return this.userService.isLogged;
  }

  get username(): string {
    // console.log(this.userService.user);
    return this.userService.user?.username || '';
  }

  logout() {
    this.userService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
