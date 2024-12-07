import { Component, OnInit, Output } from '@angular/core';
import { Game } from '../../types/game';
import { ApiService } from '../../api.service';
import { ProfileDetails, User, UserForAuth } from '../../types/user';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { Router, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { SlicePipe } from "../../shared/pipes/slice.pipe";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [LoaderComponent, RouterLink, SlicePipe, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  user: UserForAuth | undefined;
  isLoading = false;
  gamesCreated: Game[] = [];
  gamesLiked: Game[] = [];
  errorMessage: string = "";

  isEditMode: boolean = false;
  profileDetails: ProfileDetails = {
    username: '',
    email: '',
    telephone: '',
  };

  constructor(
    private apiService: ApiService,
    private titleService: Title,
    private userService: UserService,
    ){
    this.titleService.setTitle("Profile");
  }  

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(5),]),
    email: new FormControl('', [Validators.required, Validators.email]),
    telephone: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
  });

  ngOnInit(): void {
    this.user = this.userService.user!;
   
    console.log(this.user);

    const { username, email, telephone } = this.userService.user!;
    this.profileDetails = { username, email, telephone };

    this.form.setValue({
      username,
      email,
      telephone,
    });

    // this.apiService.getProfile().subscribe((user) => {
    //   this.user = user as User;
    // });

    this.apiService.getAll().subscribe((games) => { 
      // console.log(games);
      this.gamesCreated = games.filter((game) => game.owner._id === this.user?._id);
      this.gamesLiked = games.filter((game) => game.likesList.some((like) => like._id === this.user?._id));
    });
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  isFieldTextMissing(controlName: string) {
    return (
      this.form.get(controlName)?.touched &&
      this.form.get(controlName)?.errors?.['required']
    );
  }

  get isNotMinLength() {
    return (
      this.form.get('username')?.touched &&
      this.form.get('username')?.errors?.['minlength']
    );
  }

  get isEmailNotValid() {
    return (
      this.form.get('email')?.touched &&
      this.form.get('email')?.errors?.['email']
    );
  }

  get hasOnlyDigits() {
    return (
      this.form.get('telephone')?.touched &&
      this.form.get('telephone')?.errors?.['pattern']
    );
  }

  handleSaveProfile() {
    if (this.form.invalid) {
      return;
    }

    this.profileDetails = this.form.value as ProfileDetails;
    const { username, email, telephone } = this.profileDetails;

    this.userService.updateProfile(username, email, telephone,).subscribe(() => {
      this.toggleEditMode();
    });
  }

  onCancel(event: Event) {
    event.preventDefault();
    this.toggleEditMode();
  }  
}
