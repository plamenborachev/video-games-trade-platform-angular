import { Component, OnInit } from '@angular/core';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { RouterLink } from '@angular/router';
import { Game } from '../../types/game';
import { ApiService } from '../../api.service';
import { formatDate } from '@angular/common';
import { DATE_TIME_FORMAT, LOCALE } from '../../constants';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [RouterLink, LoaderComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit{
  games: Game[] = [];
  isLoading = true;

  constructor(private apiService: ApiService) {}
  
  ngOnInit(): void {
    this.apiService.getAll().subscribe((games) => { 
      // console.log(games);

      this.games = games;
      // this.games.forEach((game) => game.createdAt = formatDate(game.createdAt, DATE_TIME_FORMAT, LOCALE));
      this.isLoading = false;
    });
  }
}
