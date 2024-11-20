import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { QueryParams } from '@ngrx/data';

import { throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

import { Municipality } from './../models/states.model';
import { Result, State } from '../models/states.model';
import { environment } from './../../../environments/environment';

@Injectable()
export class SepomexService {
  private SERVER_URL = environment.sepomex;
  constructor(private _http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }),
  };

  getPostalInfo(queryParams?: QueryParams) {
    return this._http.get(`${this.SERVER_URL}zip_codes`, {
      params: new HttpParams({ fromObject: queryParams }),
      observe: 'body',
    }).pipe(
      retry(3),
      map(resp => resp as Result),
      catchError(this.handleError)
    );
  }
  getStates(queryParams?: QueryParams) {

    return this._http.get(`${this.SERVER_URL}states`, {
      params: new HttpParams({ fromObject: queryParams }),
      observe: 'body',
    }).pipe(
      retry(3),
      map(resp => resp['states'] as State[]),
      catchError(this.handleError)
    );
  }
  getMunicipalities(stateId: string, queryParams?: QueryParams) {
    return this._http.get(`${this.SERVER_URL}states/${stateId}/municipalities`, {
      params: new HttpParams({ fromObject: queryParams }),
      observe: 'body',
    }).pipe(
      retry(3),
      map(resp => resp['municipalities'] as Municipality[]),
      catchError(this.handleError)
    );
  }
  getCities(stateId: string, queryParams?: QueryParams) {
    return this._http.get(`cities`, {
      params: new HttpParams({ fromObject: queryParams }),
      observe: 'body',
    }).pipe(
      retry(3),
      map(resp => resp),
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
