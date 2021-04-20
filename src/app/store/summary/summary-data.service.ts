import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';

import { Coin } from 'src/app/cryptocurrency/models/cryptocurrency.model';

import { Observable } from 'rxjs';

import { CoincapApiService } from '../../cryptocurrency/services/coincap-api.service';

import * as fromSummary from '.';
import { Summary } from 'src/app/covid/models/country.model';
import { Covid19apiService } from 'src/app/covid/services/covid19api.service';
@Injectable()
export class SummaryDataService extends DefaultDataService<Summary> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private covid19apiService: Covid19apiService
  ) {
    super(fromSummary.entityCollectionName, http, httpUrlGenerator);
  }
  getAll(): Observable<Summary[]> {
    return this.covid19apiService.getSummary();
  }
}
