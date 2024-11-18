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
}