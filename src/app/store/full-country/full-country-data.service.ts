import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';

import { Observable } from 'rxjs';

import { FullCountry } from 'src/app/coronavirus/models/country.model';

import { CoronavirusApiService } from '../../coronavirus/services/coronavirus-api.service';

import * as fromFullCountry from './';
@Injectable()
export class FullCountryDataService extends DefaultDataService<FullCountry> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private coronavirusApiService: CoronavirusApiService,
  ) {
    super(fromFullCountry.entityCollectionName, http, httpUrlGenerator);
  }
  getAll(): Observable<FullCountry[]> {
    return this.coronavirusApiService.getFullCountry();
  }

}
