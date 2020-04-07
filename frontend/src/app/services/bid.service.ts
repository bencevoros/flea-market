import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Bid } from '../models/bid';
import { Error } from '../models/error';

@Injectable({
  providedIn: 'root',
})
export class BidService {
  private bidUrl = 'http://localhost:3000/api/bid';

  constructor(
    private http: HttpClient,
  ) { }

  private handleError<T> () {
    return (error: HttpErrorResponse) => {
      console.error(error);
      let message = error.statusText;

      if (error.status === 0) {
        message = 'Something went wrong.';
      }

      throw new Error(message);
    };
  }

  read(): Observable<Bid | {}> {
    return this.http.get<Bid>(this.bidUrl)
      .pipe(
        tap((bid: Bid) => {
          return bid;
        }),
        catchError(this.handleError())
      )
  }
  
  readById(id: number): Observable<Bid | {}> {
    return this.http.get<Bid>(this.bidUrl + '/findById?id=' + id)
      .pipe(
        tap((bid: Bid) => {
          return bid;
        }),
        catchError(this.handleError())
      )
  }

  update(bid: Bid): Observable<Bid | {}> {
    const httpOptions: object = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text'
    };
    return this.http.put<Bid>(this.bidUrl, bid, httpOptions)
      .pipe(
        catchError(this.handleError())
      )
  }

  create(bid: Bid) {
    const httpOptions: object = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text',
    };
    return this.http.post<Bid>(this.bidUrl, bid, httpOptions)
      .pipe(
        catchError(this.handleError())
      )
  }

  delete(bid: Bid) {
    const id = typeof bid === 'number' ? bid : bid.id;
    const url = `${this.bidUrl}?id=${id}`;

    return this.http.delete(url, { responseType: 'text' })
      .pipe(
        catchError(this.handleError())
      );
  }
}
