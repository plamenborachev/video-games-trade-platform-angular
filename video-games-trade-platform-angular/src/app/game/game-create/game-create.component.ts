import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-game-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './game-create.component.html',
  styleUrl: './game-create.component.css'
})
export class GameCreateComponent {
  constructor(private apiService: ApiService) {}

  addGame(form: NgForm) {
    console.log(form);

    if (form.invalid) {
      console.error('Invalid create game form');
      return;
    }

    console.log(form.value);

    //TODO
  }
}
