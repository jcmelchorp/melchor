import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';

import { Observable, combineLatest, of, merge, from } from 'rxjs';
import { map, mergeMap, pluck, tap, combineAll, switchMap, concatMap, subscribeOn } from 'rxjs/operators';

import { Summary, History } from 'src/app/coronavirus/models/covid.model';

import { Cases, Country } from '../../coronavirus/models/coronavirus.model';
import { CoronavirusApiService } from '../../coronavirus/services/coronavirus-api.service';

import * as fromCountry from '.';
import { CountryEntityService } from './country-entity.service';
@Injectable()
export class CountryDataService extends DefaultDataService<Country> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private coronavirusApiService: CoronavirusApiService,
    private countryEntityService: CountryEntityService
  ) {
    super(fromCountry.entityCollectionName, http, httpUrlGenerator);
  }
  getAll(): Observable<Country[]> {
    let obsAll = this.coronavirusApiService.getCurrentCases()
    return obsAll
  }
  getWithQuery(queryParams: QueryParams): Observable<Country[]> {
    return this.coronavirusApiService.getCurrentCountryTimelineCases(queryParams) as Observable<Country[]>;
  }
}
