import { Component } from '@angular/core';
import { Game } from '../../types/game';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';

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
      // this.owner = Object.values(result).at(1);
      // this.isOwner = Object.values(result).at(2);
      // this.liked = Object.values(result).at(3);
      // this.likedBy = Object.values(result).at(4);      
    });
  }

  goBack() {
    this.location.back();
  }

  editGame(form: NgForm) {
    // console.log(form);

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
