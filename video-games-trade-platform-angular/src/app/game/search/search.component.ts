import { Component, OnInit } from '@angular/core';
import { Game } from '../../types/game';
import { ApiService } from '../../api.service';
import { Title } from '@angular/platform-browser';
import { LoaderComponent } from "../../shared/loader/loader.component";
import { ElapsedTimePipe } from "../../shared/pipes/elapsed-time.pipe";
import { SlicePipe } from "../../shared/pipes/slice.pipe";
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [LoaderComponent, ElapsedTimePipe, SlicePipe, RouterLink, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{
  games: Game[] = [];
  isLoading = true;

  constructor(private apiService: ApiService, private titleService: Title, private router: Router) {
    this.titleService.setTitle("Games Search");
  }

  ngOnInit(): void {
    this.apiService.getAll().subscribe((games) => { 
      // console.log(games);

      this.games = games;
      this.isLoading = false;
    });
  }

  searchGame(form: NgForm) {
    // console.log(form);

    if (form.invalid) {
      console.error('Invalid create game form');
      return;
    }

    // console.log(form.value);

    const { title, ganre } = form.value;

    this.apiService.search(title, ganre).subscribe((games) => {
      // console.log(games);
      this.games = games;
    })
  }
}
