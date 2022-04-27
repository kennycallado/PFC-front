import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

import { Table } from '../models/table';
import { Booking } from '../models/booking';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl: string = "https://api.sensacion.kennycallado.dev/api/"
  private available: string = "table/available?date="

  constructor(private http: HttpClient) { }

  getAvailability(date: string): Observable<Table[]> {
    return this.http.get<Table[]>(this.apiUrl + this.available + date)
  }

  sendBooking(booking: Booking): Observable<Booking> {
    let headers = new HttpHeaders();
    headers = headers.set('content-type', 'application/json');

    return this.http.post<any>("https://api.sensacion.kennycallado.dev/api/booking", JSON.stringify(booking), { headers })
  }
}
