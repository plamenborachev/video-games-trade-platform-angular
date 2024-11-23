import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../environments/environment.development";
import { Game } from "./types/game";

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    constructor(private http: HttpClient) {}

    getLastThreeGames(){
        const { apiUrl } = environment; //TODO extract variable
        let url = `${apiUrl}/`;
        return this.http.get<Game[]>(url);
    }

    getAll(){
        const { apiUrl } = environment;
        let url = `${apiUrl}/games/catalog`;
        return this.http.get<Game[]>(url);
    }    

    getOne(id: string){
        const { apiUrl } = environment;
        let url = `${apiUrl}/games/details/${id}`;
        return this.http.get(url);
    }

    getProfile(){
        const { apiUrl } = environment;
        let url = `${apiUrl}/profile`;
        return this.http.get(url);
    }

    remove(id: string){
        const { apiUrl } = environment;
        let url = `${apiUrl}/games/delete/${id}`;
        return this.http.delete(url);
    }
}