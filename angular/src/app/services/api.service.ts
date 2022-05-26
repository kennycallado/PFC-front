import { environment } from '../../environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

import { Table } from '../models/table';
import { Booking } from '../models/booking';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  /* la url debería venir desde una variable de entorno */

  /* IMPORTANTE: */
  /* en el navegador no hay variables de entorno */
  /* por eso para especificar diferentes url dependiendo */
  /* de si está en producción se usa environment.production */
  private apiUrl: string = "https://api.sensacion.kennycallado.dev/api/"
  private available: string = "table/available?date="

  constructor(private http: HttpClient) {
    /* si no está en producción usar api local */
    if (!environment.production) {
      this.apiUrl = "http://localhost:8000/api/"
    }
  }

  getAvailability(date: string): Observable<Table[]> {
    return this.http.get<Table[]>(this.apiUrl + this.available + date)
  }

  sendBooking(booking: Booking): Observable<Booking> {
    let headers = new HttpHeaders();
    headers = headers.set('content-type', 'application/json');

    return this.http.post<any>(this.apiUrl + "booking", JSON.stringify(booking), { headers })
  }
}
