import { Component, OnInit } from '@angular/core';
import { Game } from '../../types/game';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../api.service';
import { UserService } from '../../user/user.service';
import { User } from '../../types/user';

@Component({
  selector: 'app-game-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './game-details.component.html',
  styleUrl: './game-details.component.css'
})
export class GameDetailsComponent implements OnInit{
  game = {} as Game;
  owner = {} as User;
  isOwner: boolean = false;
  liked: boolean = false;
  likedBy = "" as string;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private userService: UserService
  ) {}

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['gameId'];

    this.apiService.getOne(id).subscribe((result) => {
      console.log(result);
      
      this.game = Object.values(result).at(0);
      this.owner = Object.values(result).at(1);
      this.isOwner = Object.values(result).at(2);
      this.liked = Object.values(result).at(3);
      this.likedBy = Object.values(result).at(4);      
    });
  }

}
