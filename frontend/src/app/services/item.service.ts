import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Item } from '../models/item';
import { Error } from '../models/error';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private itemUrl = 'http://localhost:3000/api/item';

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

  read(): Observable<Item | {}> {
    return this.http.get<Item>(this.itemUrl)
      .pipe(
        tap((item: Item) => {
          return item;
        }),
        catchError(this.handleError())
      )
  }

  readWon(userId: number): Observable<Item | {}> {
    return this.http.get<Item>(this.itemUrl + '/won?userId=' + userId)
      .pipe(
        tap((item: Item) => {
          return item;
        }),
        catchError(this.handleError())
      )
  }

  readOwn(userId: number): Observable<Item | {}> {
    return this.http.get<Item>(this.itemUrl + '/own?userId=' + userId)
      .pipe(
        tap((item: Item) => {
          return item;
        }),
        catchError(this.handleError())
      )
  }
  
  readById(id: number): Observable<Item | {}> {
    return this.http.get<Item>(this.itemUrl + '/findById?id=' + id)
      .pipe(
        tap((item: Item) => {
          return item;
        }),
        catchError(this.handleError())
      )
  }

  update(item: Item): Observable<Item | {}> {
    const httpOptions: object = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text'
    };
    return this.http.put<Item>(this.itemUrl, item, httpOptions)
      .pipe(
        catchError(this.handleError())
      )
  }

  create(item: Item) {
    const httpOptions: object = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text',
    };
    return this.http.post<Item>(this.itemUrl, item, httpOptions)
      .pipe(
        catchError(this.handleError())
      )
  }

  delete(item: Item) {
    const id = typeof item === 'number' ? item : item.id;
    const url = `${this.itemUrl}?id=${id}`;

    return this.http.delete(url, { responseType: 'text' })
      .pipe(
        catchError(this.handleError())
      );
  }
}
