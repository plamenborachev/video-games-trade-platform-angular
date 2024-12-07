import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Game } from "./types/game";

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    constructor(private http: HttpClient) {}

    getLastThreeGames(){
        let url = '/api/';
        return this.http.get<Game[]>(url);
    }

    getAll(){
        let url = '/api/games/catalog';
        return this.http.get<Game[]>(url);
    }

    search(title: string, ganre: string){
        let url = '/api/games/search';
        let params = new HttpParams();
        params = params.append('title', title);
        params = params.append('ganre', ganre);
        return this.http.get<Game[]>(url, { params });
    }    

    getOne(id: string){
        let url = `/api/games/details/${id}`;
        return this.http.get<Game>(url);
    }

    getProfile(){
        let url = '/api/profile';
        return this.http.get(url);
    }

    createGame(title: string, ganre: string, image: string, description: string, price: number){
        let url = '/api/games/create';
        const payload = { title, ganre, image, description, price };
        return this.http.post<Game>(url, payload);
    }

    edit(id: string, title: string, ganre: string, image: string, description: string, price: number){
        let url = `/api/games/edit/${id}`;
        const payload = { title, ganre, image, description, price };
        return this.http.put<Game>(url, payload);
    }

    remove(id: string){
        let url = `/api/games/delete/${id}`;
        return this.http.delete(url);
    }

    like(id: string){
        let url = `/api/games/like/${id}`;
        return this.http.put(url, {});
    }
}