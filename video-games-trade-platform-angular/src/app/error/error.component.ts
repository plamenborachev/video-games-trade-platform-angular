import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorPageComponent {

  constructor(private location: Location,){}

  goBack() {
    this.location.back();
  }
}
