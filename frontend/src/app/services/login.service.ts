import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { User } from '../models/user';
import { Error } from '../models/error';

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    private registrationUrl = 'http://localhost:3000/api/login';

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

    login(user: User): Observable<Object>{
        return this.http.post(this.registrationUrl, user)
            .pipe(
                tap((object: Object) => {
                  console.log(object);
                  return object;
                }),
                catchError(this.handleError())
            );
    }
}
