import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment.development';

@Injectable({
providedIn: 'root'
})
export class GeocodingService {
  constructor(private http: HttpClient) { }

  getAddress(latitude: number, longitude: number): Observable<any> {
    const url = `${environment.geocodingApiUrl}?latlng=${latitude},${longitude}&key=${environment.API_KEY}`;
    return this.http.get<any>(url);
  }
}
