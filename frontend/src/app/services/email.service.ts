import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Error } from '../models/error';


@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private emailUrl = 'http://localhost:3000/api/email';

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

  sendEmail(type: string,email : string): Observable<string | object> {

      return this.http.get(this.emailUrl+'?type='+type+"&email="+email,{responseType: 'text'})
        .pipe(
          catchError(this.handleError())
        );
  }
}
