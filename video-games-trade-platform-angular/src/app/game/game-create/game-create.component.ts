import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { GeolocationService } from '../../geolocation/geolocation.service';
import { GeocodingService } from '../../geolocation/geocoding.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-game-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './game-create.component.html',
  styleUrl: './game-create.component.css'
})
export class GameCreateComponent implements OnInit{
  address: string = "";
  
  constructor(
    private apiService: ApiService,
    private router: Router,
    private titleService: Title,
    private geolocationService: GeolocationService,
    private geocodingService: GeocodingService,
    private location: Location,
  ) {
    this.titleService.setTitle("Create Game");
  }

  ngOnInit(): void {
    this.getGeoLocation();
  }

  getGeoLocation() {
    this.geolocationService.getCurrentPosition().subscribe({
      next: (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log('Latitude:', latitude);
        console.log('Longitude:', longitude);

        this.geocodingService.getAddress(latitude, longitude).subscribe(response => {
          console.log(response);
          this.address = response.results[0]?.formatted_address;
        });
      },
      error: (error) => {
        console.error('Error getting geolocation:', error);
      },
    });
  }

  goBack() {
    this.location.back();
  }

  addGame(form: NgForm) {
    // console.log(form);

    if (form.invalid) {
      console.error('Invalid create game form');
      return;
    }

    console.log(form.value);
    const { title, ganre, image, description, location, price } = form.value;

    this.apiService.createGame(title, ganre, image, description, location, price).subscribe(() => {
        this.router.navigate(['/catalog']);
    })
  }
}
