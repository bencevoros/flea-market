import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Sample } from '../models/sample';
import { Error } from '../models/error';

@Injectable({
  providedIn: 'root',
})
export class SampleService {
  private sampleUrl = 'http://localhost:3000/api/sample';

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

  read(): Observable<Sample | {}> {
    return this.http.get<Sample>(this.sampleUrl)
      .pipe(
        tap((sample: Sample) => {
          return sample;
        }),
        catchError(this.handleError())
      )
  }

  update(sample: Sample): Observable<Sample | {}> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put<Sample>(this.sampleUrl, sample, httpOptions)
      .pipe(
        tap((sample: Sample) => {
          return sample;
        }),
        catchError(this.handleError())
      )
  }

  create(sample: Sample): Observable<Sample | {}> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post<Sample>(this.sampleUrl, sample, httpOptions)
      .pipe(
        tap((sample: Sample) => {
          return sample;
        }),
        catchError(this.handleError())
      )
  }

  delete(sample: Sample) {
    const id = typeof sample === 'number' ? sample : sample.id;
    const url = `${this.sampleUrl}?id=${id}`;

    return this.http.delete(url, { responseType: 'text' })
      .pipe(
        catchError(this.handleError())
      );
  }
}
