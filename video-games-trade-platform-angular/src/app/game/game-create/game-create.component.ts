import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-game-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './game-create.component.html',
  styleUrl: './game-create.component.css'
})
export class GameCreateComponent {
  
  constructor(private apiService: ApiService, private router: Router, private titleService: Title) {
    this.titleService.setTitle("Create Game");
  }

  addGame(form: NgForm) {
    // console.log(form);

    if (form.invalid) {
      console.error('Invalid create game form');
      return;
    }

    // console.log(form.value);

    const { title, ganre, image, description, price } = form.value;

    this.apiService.createGame(title, ganre, image, description, price).subscribe(() => {
        this.router.navigate(['/catalog']);
    })
  }
}
