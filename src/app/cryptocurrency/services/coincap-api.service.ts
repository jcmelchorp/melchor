import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { throwError, Observable } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';

import { Coin, CoinHistoryData } from './../models/cryptocurrency.model';



@Injectable()
export class CoincapApiService {
  private ROOT_URL = environment.cryptocurrencyApi;
  constructor(private http: HttpClient) { }
  getAll(): Observable<Coin[]> {
    // Add safe, URL encoded_page parameter
    //const options = { params: new HttpParams({ fromString: '_page=1&_limit=20' }), observe: 'response' };
    return this.http.get<Coin[]>(this.ROOT_URL, { observe: 'body' })
      .pipe(
        retry(3),
        map(coins => coins['data']),
        catchError(this.handleError),
        // tap(res => console.log(res))
      );
  }

  getHistory(id: string, interval: string, start?: number, end?: number) {
    return this.http.get<CoinHistoryData[]>(`${this.ROOT_URL}/${id}/history`, {
      observe: 'response',
      params: new HttpParams(
        {
          fromString: `interval=${interval}&${(start && end) ? `start=${start}&end=${end}` : ''}`
        }
      )
    }).pipe(
      retry(3),
      map(coins => coins.body['data']),
      catchError(this.handleError),
      /* tap(res => console.log(res)) */
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
