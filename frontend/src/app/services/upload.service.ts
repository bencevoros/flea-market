import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Error } from '../models/error';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private uploadUrl = 'http://localhost:3000/api/upload';

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

  uploadImage(formData: FormData): Observable<Object> {
    return this.http.post<Object>(this.uploadUrl, formData)
      .pipe(
        tap((resp: { filename: string }) => {
          return resp;
        }),
        catchError(this.handleError())
      )
  }
}
