import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatCardXlImage } from '@angular/material/card';

import { QueryParams } from '@ngrx/data';

import { environment } from 'src/environments/environment';

import { Observable, throwError } from 'rxjs';
import { retry, catchError, tap, map, pluck } from 'rxjs/operators';

import { Country } from '../models/coronavirus.model';

@Injectable()
export class CoronavirusApiService {
  private SERVER_URL: string = environment.coronavirusApi;
  constructor(private _httpClient: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }),
  };
  getCurrentCountryTimelineCases(queryParams: QueryParams) {
    const url: string = 'history/';
    return this._httpClient.get(this.SERVER_URL + url, {
      params: new HttpParams({ fromObject: queryParams }),
      observe: 'body',
    }).pipe(
      retry(3),
      /* tap(resp => console.log(resp.body)), */
      map((resp) => resp),
      catchError(this.handleError)
    );
  }
  getCurrentCases(): Observable<Country[]> {
    const url: string = 'cases/';
    return this._httpClient.get(this.SERVER_URL + url, {
      params: new HttpParams({ fromString: '' }),
      observe: 'body',
    }).pipe(
      retry(3),
      //pluck('All'),
      map((resp) => {
        let arr = Object.keys(resp).map(key => { return { ...resp[key], name: key } });
        let newArr = arr.map(country => {
          let ordered: Country = {
            ...country.All,
            name: country.name,
            province: Object.keys(country).filter(c => c != 'All').map(key => { return { ...country[key], name: key } })
          };
          return ordered;
        });
        return newArr;
      }),
      //tap(resp => console.log(resp)),
      catchError(this.handleError)
    );
  }
  getCasesWithQuery(queryParams: QueryParams): Observable<Country[]> {
    const url: string = 'cases/';
    return this._httpClient.get(this.SERVER_URL + url, {
      params: new HttpParams({ fromObject: queryParams }),
      observe: 'body',
    }).pipe(
      retry(3),
      tap(resp => console.log(resp)),
      map((resp) => {
        const arr = Object.keys(resp).map(key => resp[key]);
        let modifiedResponse = { ...arr['All'], provinces: arr.filter(x => x.hasOwnProperty('All')) }
        console.log(modifiedResponse)
        return arr
      }),
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
    window.confirm(errorMessage);
    return throwError(errorMessage);
  }
}
