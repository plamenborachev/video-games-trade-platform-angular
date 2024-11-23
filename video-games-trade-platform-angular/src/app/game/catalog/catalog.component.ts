import { Component, OnInit } from '@angular/core';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { RouterLink } from '@angular/router';
import { Game } from '../../types/game';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit{
  games: Game[] = [];
  // isLoading = true;

  constructor(private apiService: ApiService) {}
  
  ngOnInit(): void {
    this.apiService.getAll().subscribe((games) => { 
      console.log(games);
      this.games = games;
      // this.isLoading = false;
    });
  }
}
