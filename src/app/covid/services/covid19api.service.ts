import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { retry, catchError, map, tap } from 'rxjs/operators';

import { Country, CountryData, Summary } from '../models/country.model';
@Injectable({
  providedIn: 'root',
})
export class Covid19apiService {
  getRegional(): Observable<import("../models/country.model").Regional[]> {
    throw new Error('Method not implemented.');
  }
  private SERVER_URL: string = 'https://api.covid19api.com/';
  public timeline: number[];

  constructor(private _httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  public sendGetRequest(url: string) {
    this.timeline = [];
    return this._httpClient
      .get(this.SERVER_URL + url, {
        params: new HttpParams({ fromString: '' }),
        observe: 'response',
      })
      .pipe(
        retry(3),
        catchError(this.handleError));
  }
  /** Returns all cases by case type for a country.
   * Country must be the country_slug from /countries.
   * Cases must be one of: confirmed, recovered, deaths
   * */
  getCasesByCountry(slug: string): Observable<CountryData[]> {
    const url: string = `country/${slug}`;
    console.log(url)
    return this._httpClient.get(this.SERVER_URL + url, {
      params: new HttpParams(
        { fromString: '' }
      ),
      observe: 'response',
    }).pipe(
      retry(3),
      tap(resp => console.log(resp.body)),
      map(resp => resp.body as CountryData[]),
      catchError(this.handleError)
    );
  }
  getSummary() {
    const url: string = 'summary';
    const summaryArray: Summary[] = [];
    return this._httpClient.get(this.SERVER_URL + url, {
      params: new HttpParams(
        { fromString: '' }
      ),
      observe: 'response',
    }).pipe(
      retry(3),
      map(summary => { summaryArray.push(summary.body as Summary); return summaryArray }),
      catchError(this.handleError)
    );
  }
  getCountries(): Observable<Country[]> {
    const url: string = 'countries';
    return this._httpClient.get(this.SERVER_URL + url, {
      params: new HttpParams(
        { fromString: '' }
      ),
      observe: 'response',
    }).pipe(
      retry(3),
      map(coins => coins.body as Country[]),
      catchError(this.handleError)
    );
  }
  getCountryMap() {
    const url: string = 'countries';
    return this._httpClient.get(this.SERVER_URL + url, {
      params: new HttpParams(
        { fromString: '' }
      ),
      observe: 'response',
    }).pipe(
      retry(3),
      map(coins => coins.body as Country[]),
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
