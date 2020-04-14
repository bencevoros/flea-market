import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { User } from '../models/user';
import { Error } from '../models/error';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userUrl = 'http://localhost:3000/api/user';

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

  read(): Observable<User | {}> {
    return this.http.get<User>(this.userUrl)
      .pipe(
        tap((user: User) => {
          return user;
        }),
        catchError(this.handleError())
      )
  }
  
  readById(id: number): Observable<User | {}> {
    return this.http.get<User>(this.userUrl + '/findById?id=' + id)
      .pipe(
        tap((user: User) => {
          return user;
        }),
        catchError(this.handleError())
      )
  }

  update(user: User): Observable<User | {}> {
    const httpOptions: object = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text'
    };
    return this.http.put<User>(this.userUrl, user, httpOptions)
      .pipe(
        catchError(this.handleError())
      )
  }

  create(user: User) {
    const httpOptions: object = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text',
    };
    return this.http.post<User>(this.userUrl, user, httpOptions)
      .pipe(
        catchError(this.handleError())
      )
  }

  delete(user: User) {
    const id = typeof user === 'number' ? user : user.id;
    const url = `${this.userUrl}?id=${id}`;

    return this.http.delete(url, { responseType: 'text' })
      .pipe(
        catchError(this.handleError())
      );
  }
}
