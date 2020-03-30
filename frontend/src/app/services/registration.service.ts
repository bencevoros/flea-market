import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { User } from '../models/user';
import { Error } from '../models/error';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private registrationUrl = 'http://localhost:3000/api/registration';

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

  create(user: User): Observable<Object>{
    return this.http.post(this.registrationUrl, user, { responseType: 'text' })
      .pipe(
        tap((object: Object) => {
          return object;
        }),
        catchError(this.handleError())
      );
  }
}
