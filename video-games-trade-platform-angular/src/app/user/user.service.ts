import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subscription, tap } from 'rxjs';

import { UserForAuth } from '../types/user';


@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy{
  private user$$ = new BehaviorSubject<UserForAuth | null>(null);
  private user$ = this.user$$.asObservable();

  user: UserForAuth | null = null;
  userSubscription: Subscription | null = null; 

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
      .post('/api/auth/logout', {})
      .pipe(tap((user) => this.user$$.next(null)));
  }

  getProfile() {
    return this.http
      .get<UserForAuth>('/api/profile')
      .pipe(tap((user) => this.user$$.next(user)));
  }

  updateProfile(username: string, email: string, telephone: string) {
    return this.http
      .put<UserForAuth>(`/api/profile`, {
        username,
        email,
        telephone,
      })
      // .pipe(tap((user) => {
      //   this.user$$.next(user);
      //   console.log(user);
      // }));
  }

  get isLogged(): boolean {
    return !!this.user;
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}