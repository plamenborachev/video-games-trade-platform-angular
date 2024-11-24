import { Component } from '@angular/core';
import { Game } from '../../types/game';
import { ApiService } from '../../api.service';
import { User } from '../../types/user';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [LoaderComponent, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: User | undefined;
  isLoading = true;
  gamesCreated: Game[] = [];
  gamesLiked: Game[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {    
      this.apiService.getProfile().subscribe((result) => { 
        console.log(result);
        this.gamesCreated = Object.values(result).at(0);
        this.gamesLiked = Object.values(result).at(1);
        this.user = Object.values(result).at(2);

        this.isLoading = false;
      });
    
  }
}
