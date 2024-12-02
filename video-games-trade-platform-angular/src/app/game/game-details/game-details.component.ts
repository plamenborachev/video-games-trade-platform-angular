import { Component, OnInit } from '@angular/core';
import { Game } from '../../types/game';
import { ActivatedRoute, RouterLink, Router} from '@angular/router';
import { ApiService } from '../../api.service';
import { UserService } from '../../user/user.service';
import { formatDate } from '@angular/common';
import { DATE_TIME_FORMAT, LOCALE } from '../../constants';

@Component({
  selector: 'app-game-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './game-details.component.html',
  styleUrl: './game-details.component.css'
})
export class GameDetailsComponent implements OnInit{
  game = {} as Game;
  isOwner: boolean = false;
  isLiked: boolean = false;
  likedBy = "" as string;
  addedOnformattedDate: string = "";

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private userService: UserService,
    private router: Router,
  ) {}

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['gameId'];

    this.apiService.getOne(id).subscribe((game) => {
      // console.log(Object.values(data).at(0));
      // this.game = Object.values(data).at(0);
      this.game = game as Game;
      // console.log(this.game);
      if (this.game.owner._id === this.userService.user?._id){
        this.isOwner = true;
      }
      this.isLiked = this.game.likesList.some(like => like._id.toString() === this.userService.user?._id);
      this.likedBy = this.game.likesList.map(liked => liked.email).join(', ');
      // this.owner = Object.values(result).at(1);
      // this.isOwner = Object.values(result).at(2);
      // this.liked = Object.values(result).at(3);
      // this.likedBy = Object.values(result).at(4);
      // this.addedOnformattedDate = formatDate(this.game.createdAt, DATE_TIME_FORMAT, LOCALE);     
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
