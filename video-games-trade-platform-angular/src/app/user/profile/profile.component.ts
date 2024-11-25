import { Component } from '@angular/core';
import { Game } from '../../types/game';
import { ApiService } from '../../api.service';
import { User } from '../../types/user';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { RouterLink } from '@angular/router';
import { ErrorMessageComponent } from '../../shared/error-message/error-message.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [LoaderComponent, RouterLink, ErrorMessageComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: User | undefined;
  isLoading = true;
  gamesCreated: Game[] = [];
  gamesLiked: Game[] = [];
  errorMessage: string = "";

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {    
      this.apiService.getProfile()
      .subscribe({
        next: (data) => { 
          console.log(data);
          this.gamesCreated = Object.values(data).at(0);
          this.gamesLiked = Object.values(data).at(1);
          this.user = Object.values(data).at(2);
          this.isLoading = false;
        },
        error: (err) => {
          // console.log(`${JSON.stringify(err.error["message"])}`);
          console.log(err);
          this.errorMessage = err.error["message"];
          
        },
        complete: () => console.info('complete')
    });
  }
}
