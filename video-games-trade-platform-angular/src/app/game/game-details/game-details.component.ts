import { Component, OnInit } from '@angular/core';
import { Game } from '../../types/game';
import { ActivatedRoute, RouterLink, Router} from '@angular/router';
import { ApiService } from '../../api.service';
import { UserService } from '../../user/user.service';
import { User } from '../../types/user';
import { DatePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { SlicePipe } from "../../shared/pipes/slice.pipe";

@Component({
  selector: 'app-game-details',
  standalone: true,
  imports: [RouterLink, DatePipe, SlicePipe],
  templateUrl: './game-details.component.html',
  styleUrl: './game-details.component.css'
})
export class GameDetailsComponent implements OnInit{
  game = {} as Game;
  user = {} as User;
  isOwner: boolean = false;
  isLiked: boolean = false;
  likedBy = "" as string;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private userService: UserService,
    private router: Router,
    private titleService: Title
  ) {
    this.titleService.setTitle("Game Details");
  }

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['gameId'];

    this.user = this.userService.user as User;

    this.apiService.getOne(id).subscribe((game) => {
      this.game = game;
      // console.log(this.game);
      if (this.game.owner._id === this.user._id){
        this.isOwner = true;
      }
      this.isLiked = this.game.likesList.some(like => like._id.toString() === this.userService.user?._id);
      // console.log(this.game.likesList);
      this.likedBy = this.game.likesList.map(liked => liked.email).join(', '); //FIXME
    });
  }

  delete(){
    this.apiService.remove(this.game._id).subscribe(() => {
      this.router.navigate(['/home']);
    });    
  }

  like(){
    this.apiService.like(this.game._id).subscribe(() => {
      this.router.navigate(['/home']);
      // this.router.navigate([`/games/details/${this.game._id}`]);
    }); 
  }
}
