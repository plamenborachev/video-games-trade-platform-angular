import { Component, OnInit } from '@angular/core';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { RouterLink } from '@angular/router';
import { Game } from '../../types/game';
import { ApiService } from '../../api.service';
import { ElapsedTimePipe } from "../../shared/pipes/elapsed-time.pipe";
import { Title } from '@angular/platform-browser';
import { SlicePipe } from "../../shared/pipes/slice.pipe";
import { animations } from '../../animations/animations';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [RouterLink, LoaderComponent, ElapsedTimePipe, SlicePipe],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
  animations: [
    animations.bounceAnimation,
    animations.fadeInAnimation,    
  ],
})
export class CatalogComponent implements OnInit{
  games: Game[] = [];
  isLoading = true;

  constructor(private apiService: ApiService, private titleService: Title) {
    this.titleService.setTitle("Games Catalog");
  }
  
  ngOnInit(): void {
    this.apiService.getAll().subscribe((games) => { 
      // console.log(games);

      this.games = games;
      this.isLoading = false;
    });
  }
}
