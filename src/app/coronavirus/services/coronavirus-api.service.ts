import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatCardXlImage } from '@angular/material/card';

import countries2 from '@amcharts/amcharts4-geodata/data/countries2';

import { QueryParams } from '@ngrx/data';

import { environment } from 'src/environments/environment';

import { Observable, throwError } from 'rxjs';
import { retry, catchError, tap, map, pluck, mergeMap, flatMap, switchMap } from 'rxjs/operators';

import { Cases, Vaccine } from './../models/coronavirus.model';
import { Country, CountrySelector } from '../models/coronavirus.model';
import { CountryInfo, HistoryData, Summary } from '../models/covid.model';

@Injectable()
export class CoronavirusApiService {

  private SERVER_URL: string = environment.coronavirusApi;
  private COVID19_URL: string = environment.countriesApi;
  constructor(private _httpClient: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }),
  };
  // History from amcharts example
  getWorldTimeLine(): Observable<Cases[]> {
    return this._httpClient.get('https://raw.githubusercontent.com/amcharts/covid-charts/master/data/json/total_timeline.json')
      .pipe(map(resp => resp as Cases[]));
  }
  //   COVID19 API
  getCountries(): Observable<CountryInfo[]> {
    const url: string = 'countries/';
    return this._httpClient.get(this.COVID19_URL + url, {
      observe: 'body',
    }).pipe(
      retry(3),
      map((resp) => resp as CountryInfo[]),
      catchError(this.handleError)
    );
  }
  getHistory(slug: string): Observable<HistoryData[]> {
    const url: string = `total/country/${slug}`;
    return this._httpClient.get(this.COVID19_URL + url, {
      observe: 'body',
    }).pipe(
      retry(3),
      map((resp) => resp as HistoryData[]),
      catchError(this.handleError)
    );
  }
  getSummary(): Observable<Summary[]> {
    const url: string = 'summary';
    return this._httpClient.get<Summary>(this.COVID19_URL + url, {
      observe: 'body',
    }).pipe(
      retry(3),
      map((resp) => [resp]),
      catchError(this.handleError)
    );
  }

  //   CORONAVIRUS API
  getVaccines(): Observable<Vaccine[]> {
    const url: string = 'vaccines/';
    return this._httpClient.get(this.SERVER_URL + url, {
      observe: 'body',
    }).pipe(
      retry(3),
      //tap(resp => console.log(resp)),
      map((resp) => {
        let arr = Object.keys(resp).map(key => { return { ...resp[key], name: key } });
        let newArr = arr.map(vaccine => {
          let ordered: Vaccine = {
            ...vaccine.All,
            name: vaccine.name,
            province: Object.keys(vaccine).filter(c => c != 'All').map(key => { return { ...vaccine[key], name: key } })
          };
          return ordered;
        });
        return newArr;
      }),
      catchError(this.handleError)

    );
  }
  getCurrentCountryTimelineCases(queryParams: QueryParams) {
    const url: string = 'history/';
    return this._httpClient.get(this.SERVER_URL + url, {
      params: new HttpParams({ fromObject: queryParams }),
      observe: 'body',
    }).pipe(
      retry(3),
      tap(resp => console.log(resp)),
      map((resp) => resp),
      catchError(this.handleError)
    );
  }
  fetchCountryTimeLine(countryName: string) {
    return this.getCurrentCountryTimelineCases({ country: countryName, status: 'deaths' }).pipe(
      pluck('All', 'dates'),
      map(res => {
        return {
          deaths: Object.values(res).reverse()
        }
      }),
      mergeMap(case1 => this.getCurrentCountryTimelineCases({ country: countryName, status: 'recovered' }).pipe(
        pluck('All', 'dates'),
        map(res => {
          return {
            deaths: case1.deaths,
            recovered: Object.values(res).reverse()
          }
        })
      )),
      mergeMap(case2 => this.getCurrentCountryTimelineCases({ country: countryName, status: 'confirmed' }).pipe(
        pluck('All', 'dates'),
        map(res => {
          return {
            name: countryName,
            date: Object.keys(res).reverse(),
            deaths: case2.deaths,
            recovered: case2.recovered,
            confirmed: Object.values(res).reverse()
          }
        })
      ))
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
            province: Object.keys(country).filter(c => c != 'All').map(key => { return { ...country[key], id: country.CountryCode, name: key } })
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
