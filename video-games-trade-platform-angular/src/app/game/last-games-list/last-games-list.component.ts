import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Game } from '../../types/game';
import { ApiService } from '../../api.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { ElapsedTimePipe } from "../../shared/pipes/elapsed-time.pipe";
import { SlicePipe } from "../../shared/pipes/slice.pipe";

@Component({
  selector: 'app-last-games-list',
  standalone: true,
  imports: [RouterLink, LoaderComponent, ElapsedTimePipe, SlicePipe],
  templateUrl: './last-games-list.component.html',
  styleUrl: './last-games-list.component.css',
})
export class LastGamesListComponent implements OnInit{
  games: Game[] = [];
  isLoading = true;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getLastThreeGames().subscribe((games) => { 
      // console.log(games);
      this.games = games;
      this.isLoading = false;
    });
  }
}
