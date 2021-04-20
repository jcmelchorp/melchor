import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';

import { Coin } from 'src/app/cryptocurrency/models/cryptocurrency.model';

import { Observable } from 'rxjs';

import * as fromRegional from '.';
import { Regional } from 'src/app/covid/models/country.model';
import { Covid19apiService } from 'src/app/covid/services/covid19api.service';
@Injectable()
export class RegionalDataService extends DefaultDataService<Regional> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private covid19apiService: Covid19apiService
  ) {
    super(fromRegional.entityCollectionName, http, httpUrlGenerator);
  }
  getAll(): Observable<Regional[]> {
    return this.covid19apiService.getRegional();
  }
}
