import { Injectable, OnDestroy } from '@angular/core';
import { UserForAuth } from '../types/user';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subscription, tap } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy{
  private user$$ = new BehaviorSubject<UserForAuth | null>(null);
  private user$ = this.user$$.asObservable();

  USER_KEY = '[user]';
  user: UserForAuth | null = null;
  userSubscription: Subscription | null = null;

  get isLogged(): boolean {
    const isLogged = !!this.user;
    // console.log('isLogged: ' + isLogged);
    // console.log('user: ' + JSON.stringify(this.user));
    return isLogged;
  }

  constructor(private http: HttpClient) {    
    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user;
    });
  }
  
  login(email: string, password: string) {
    return this.http
        .post<UserForAuth>('/api/auth/login', { email, password })
        .pipe(tap((user) => {    
          // console.log(user);      
          this.user$$.next(user);          
        }
        ));    
  }

  register(
    username: string,
    email: string,
    telephone: string,
    password: string,
    rePassword: string
  ) {
    return this.http
      .post<UserForAuth>('/api/auth/register', {
        username,
        email,
        telephone,
        password,
        rePassword,
      })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  logout() {
    return this.http
      .get('/api/auth/logout', {})
      .pipe(tap((user) => this.user$$.next(null)));
  }

  getProfile() {
    return this.http
      .get<UserForAuth>('/api/users/profile')
      .pipe(tap((user) => this.user$$.next(user)));
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}