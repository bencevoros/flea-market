import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Follower } from '../models/follower';
import { Error } from '../models/error';

@Injectable({
  providedIn: 'root',
})
export class FollowerService {
  private followerUrl = 'http://localhost:3000/api/follower';

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

  read(): Observable<Follower | {}> {
    return this.http.get<Follower>(this.followerUrl)
      .pipe(
        tap((follower: Follower) => {
          return follower;
        }),
        catchError(this.handleError())
      )
  }
  
  readById(id: number): Observable<Follower | {}> {
    return this.http.get<Follower>(this.followerUrl + '/findById?id=' + id)
      .pipe(
        tap((follower: Follower) => {
          return follower;
        }),
        catchError(this.handleError())
      )
  }

  update(follower: Follower): Observable<Follower | {}> {
    const httpOptions: object = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text'
    };
    return this.http.put<Follower>(this.followerUrl, follower, httpOptions)
      .pipe(
        catchError(this.handleError())
      )
  }

  create(follower: Follower) {
    const httpOptions: object = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text',
    };
    return this.http.post<Follower>(this.followerUrl, follower, httpOptions)
      .pipe(
        catchError(this.handleError())
      )
  }

  delete(follower: Follower) {
    const id = typeof follower === 'number' ? follower : follower.id;
    const url = `${this.followerUrl}?id=${id}`;

    return this.http.delete(url, { responseType: 'text' })
      .pipe(
        catchError(this.handleError())
      );
  }

  readByItemId(itemId: number): Observable<Object>{
    return this.http.get(this.followerUrl + '/findByItemId' + '?itemId=' + itemId)
      .pipe(
        tap((followers: Follower[] | []) => {
          return followers;
        }),
        catchError(this.handleError())
      )
  }

  findByUserId(userId: number): Observable<Follower[] | []> {
    return this.http.get(this.followerUrl + '/findByUserId' + '?userId=' + userId)
      .pipe(
        tap((follows: Follower[] | []) => {
          return follows;
        }),
        catchError(this.handleError())
      );
  }

}
