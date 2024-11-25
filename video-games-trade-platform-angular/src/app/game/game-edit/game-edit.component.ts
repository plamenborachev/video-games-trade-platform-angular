import { Component } from '@angular/core';
import { Game } from '../../types/game';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { UserService } from '../../user/user.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-game-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './game-edit.component.html',
  styleUrl: './game-edit.component.css'
})
export class GameEditComponent {
  game = {} as Game;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['gameId'];

    this.apiService.getOne(id).subscribe((result) => {
      console.log(result);
      
      this.game = Object.values(result).at(0);
      // this.owner = Object.values(result).at(1);
      // this.isOwner = Object.values(result).at(2);
      // this.liked = Object.values(result).at(3);
      // this.likedBy = Object.values(result).at(4);      
    });
  }

  editGame(form: NgForm) {
    console.log(form);

    if (form.invalid) {
      console.error('Invalid edit game form');
      return;
    }

    console.log(form.value);

    //TODO
  }

}
