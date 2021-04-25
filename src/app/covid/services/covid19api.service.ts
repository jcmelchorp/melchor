import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { retry, catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Covid19apiService {
  private SERVER_URL: string = 'https://covid-api.mmediagroup.fr/v1/';
  public timeline: number[];

  constructor(private _httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  getCurrentCountryList(): Observable<CurrentData[]> {
    const url: string = '';
    return this._httpClient.get(this.SERVER_URL + url, {
      params: new HttpParams(
        { fromString: '' }
      ),
      observe: 'response',
    }).pipe(
      retry(3),
      //tap(resp => console.log(resp.body)),
      map(resp => resp.body as CurrentData[]),
      catchError(this.handleError)
    );
  }
  getCurrentCases(): Observable<CurrentData[]> {
    const url: string = 'cases/';
    return this._httpClient.get(this.SERVER_URL + url, {
      params: new HttpParams(
        { fromString: '' }
      ),
      observe: 'response',
    }).pipe(
      retry(3),
      //tap(resp => console.log(resp.body)),
      map(resp => resp.body as CurrentData[]),
      catchError(this.handleError)
    );
  }
  // Error handling
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
