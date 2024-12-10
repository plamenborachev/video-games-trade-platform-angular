import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

import { Game } from '../../types/game';
import { ApiService } from '../../api.service';
import { LoaderComponent } from "../../shared/loader/loader.component";
import { animations } from '../../animations/animations';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [LoaderComponent, RouterLink, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  animations: [
    animations.bounceAnimation,
    animations.fadeInAnimation,
    animations.fadeInSlowAnimation,
  ],
})
export class SearchComponent implements OnInit{
  games: Game[] = [];
  isLoading = true;

  constructor(private apiService: ApiService, private titleService: Title, private router: Router) {
    this.titleService.setTitle("Search Games");
  }

  ngOnInit(): void {
    this.apiService.getAll().subscribe((games) => { 
      // console.log(games);

      this.games = games;
      this.isLoading = false;
    });
  }

  searchGame(form: NgForm) {
    // console.log(form);

    if (form.invalid) {
      console.error('Invalid create game form');
      return;
    }

    // console.log(form.value);

    const { title, ganre } = form.value;

    this.apiService.search(title, ganre).subscribe((games) => {
      // console.log(games);
      this.games = games;
      // form.reset();
    })

    
  }
}
