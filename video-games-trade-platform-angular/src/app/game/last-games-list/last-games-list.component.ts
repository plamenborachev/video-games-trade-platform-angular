import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Game } from '../../types/game';
import { ApiService } from '../../api.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { formatDate } from '@angular/common';
import { DATE_TIME_FORMAT, LOCALE } from '../../constants';
import { ElapsedTimePipe } from "../../shared/pipes/elapsed-time.pipe";
import { SlicePipe } from "../../shared/pipes/slice.pipe";

@Component({
  selector: 'app-last-games-list',
  standalone: true,
  imports: [RouterLink, LoaderComponent, ElapsedTimePipe, SlicePipe],
  templateUrl: './last-games-list.component.html',
  styleUrl: './last-games-list.component.css'
})
export class LastGamesListComponent implements OnInit{
  games: Game[] = [];
  isLoading = true;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getLastThreeGames().subscribe((games) => { 
      // console.log(games);
      this.games = games;
      // this.games.forEach((game) => game.createdAt = formatDate(game.createdAt, DATE_TIME_FORMAT, LOCALE));
      this.isLoading = false;
    });
  }
}
