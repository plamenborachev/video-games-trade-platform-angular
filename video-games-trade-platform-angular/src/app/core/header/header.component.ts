import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../user/user.service';
import { TitleCasePipe } from '@angular/common';
import { ErrorMessageComponent } from "../../shared/error-message/error-message.component";

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
