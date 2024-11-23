import { Component } from '@angular/core';
import { Game } from '../../types/game';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  gamesCreated: Game[] = [];
  gamesLiked: Game[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    
      this.apiService.getProfile().subscribe((result) => { 
        console.log(result);
        this.gamesCreated = Object.values(result).at(0);
        this.gamesLiked = Object.values(result).at(1);
        // this.games = games;
        // this.isLoading = false;
      });
    
  }
}
