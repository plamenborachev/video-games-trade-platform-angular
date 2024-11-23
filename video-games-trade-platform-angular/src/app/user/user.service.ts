import { Injectable } from '@angular/core';
import { UserForAuth } from '../types/user';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  USER_KEY = '[user]';
  user: UserForAuth | null = null;

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) {    
    try {
      const lsUser = localStorage.getItem(this.USER_KEY) || '';
      this.user = JSON.parse(lsUser);
    } catch (error) {
      this.user = null;
    }
  }

  login() {
    this.user = {
      username: 'p1amen',
      email: 'p1amen@abv.bg',
      password: 'asdasd',
    };

    localStorage.setItem(this.USER_KEY, JSON.stringify(this.user));
  }

  // register(){
  //   const { apiUrl } = environment;
  //   let url = `${apiUrl}/auth/register`;
  //   return this.http.post(url);
  // }

  logout() {
    this.user = null;
    localStorage.removeItem(this.USER_KEY);
  }
}