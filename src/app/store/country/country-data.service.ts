import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';

import { Observable } from 'rxjs';
import { map, mergeMap, pluck, tap } from 'rxjs/operators';

import { Cases, Country } from '../../coronavirus/models/coronavirus.model';
import { CoronavirusApiService } from '../../coronavirus/services/coronavirus-api.service';

import * as fromCountry from '.';
@Injectable()
export class CountryDataService extends DefaultDataService<Country> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private coronavirusApiService: CoronavirusApiService
  ) {
    super(fromCountry.entityCollectionName, http, httpUrlGenerator);
  }
  getAll(): Observable<Country[]> {
    this.coronavirusApiService.getCurrentCases().pipe(
      map(countries => {
        countries.map(country => {
          const obsHist = this.coronavirusApiService.getCurrentCountryTimelineCases({ country: country.name, status: 'deaths' }).pipe(
            pluck('All', 'dates'),
            map(res => {
              return {
                deaths: Object.values(res).reverse()
              }
            }),
            mergeMap(case1 => this.coronavirusApiService.getCurrentCountryTimelineCases({ country: country.name, status: 'confirmed' }).pipe(
              pluck('All', 'dates'),
              map(res => {
                return {
                  deaths: case1.deaths,
                  confirmed: Object.values(res).reverse()
                }
              })
            )),
            mergeMap(case2 => this.coronavirusApiService.getCurrentCountryTimelineCases({ country: country.name, status: 'recovered' }).pipe(
              pluck('All', 'dates'),
              map(res => {
                return {
                  dates: Object.keys(res).reverse(),
                  deaths: case2.deaths,
                  confirmed: case2.confirmed,
                  recovered: Object.values(res).reverse()
                }
              })
            ))
          );

        })
      })
    );

    return;
  }
  getWithQuery(queryParams: QueryParams): Observable<Country[]> {
    return this.coronavirusApiService.getCurrentCountryTimelineCases(queryParams) as Observable<Country[]>;
  }
}
