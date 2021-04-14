import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

import { Coincap, CryptoHistoryData } from './../models/coincap.model';


@Injectable()
export class CoincapApiService {
  private ROOT_URL = 'https://api.coincap.io/v2/assets';
  constructor(private http: HttpClient) { }
  getAll() {
    // Add safe, URL encoded_page parameter
    //const options = { params: new HttpParams({ fromString: '_page=1&_limit=20' }), observe: 'response' };
    return this.http.get<Coincap[]>(this.ROOT_URL, { observe: 'response' })
      .pipe(
        retry(3),
        catchError(this.handleError),
        tap(res => console.log(res))
      );
  }

  getHistory(id: string) {
    return this.http.get<CryptoHistoryData[]>(`${this.ROOT_URL}/${id}/history`, {
      observe: 'response',
      params: new HttpParams(
        {
          fromString: 'interval=1d'
        }
      )
    }).pipe(
      retry(3),
      catchError(this.handleError),
      tap(res => console.log(res))
    );
  }
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
