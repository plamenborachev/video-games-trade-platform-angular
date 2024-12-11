import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';

import { Game } from '../../types/game';
import { ApiService } from '../../api.service';
import { animations } from '../../animations/animations';
import { User } from '../../types/user';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-game-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './game-edit.component.html',
  styleUrl: './game-edit.component.css',
  animations: [
    animations.bounceAnimation,
    animations.fadeInAnimation,
    animations.fadeInSlowAnimation,
  ],
})
export class GameEditComponent {
  game = {} as Game;
  user = {} as User;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private userService: UserService,
    private router: Router,
    private titleService: Title,
    private location: Location,
  ) {
    this.titleService.setTitle("Edit Game");
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['gameId'];

    this.apiService.getOne(id).subscribe((game) => {
      // console.log(result);
      
      this.game = game; 
    });

    this.user = this.userService.user as User;
    // console.log(this.user);
  }

  goBack() {
    this.location.back();
  }

  editGame(form: NgForm) {
    // console.log(form);
    if (this.game.owner._id != this.user._id){
      console.error('You are not creator of this game and you can not edit it!');
      this.router.navigate([`/games/details/${this.game._id}`]);
      return;
    }
  
    if (form.invalid) {
      console.error('Invalid edit game form');
      return;
    }
    // console.log(form.value);

    const {title, ganre, image, description, location, price } = form.value;

    this.apiService.edit(this.game._id, title, ganre, image, description, location, price).subscribe(() => {
        // this.router.navigate(['/catalog']);
        this.router.navigate([`/games/details/${this.game._id}`]);
    })
  }
}
