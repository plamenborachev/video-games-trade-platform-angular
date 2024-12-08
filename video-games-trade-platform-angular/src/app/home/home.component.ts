import { Component } from '@angular/core';
import { UserService } from '../user/user.service';
import { LastGamesListComponent } from '../game/last-games-list/last-games-list.component';
import { Title } from '@angular/platform-browser';
import { animations } from '../animations/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LastGamesListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [
    animations.bounceAnimation,
    animations.fadeInAnimation,    
  ],
})
export class HomeComponent {
  
  constructor(private userService: UserService, private titleService: Title) {
    this.titleService.setTitle("Home");
  }

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }
}
