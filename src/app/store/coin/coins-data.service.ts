import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';

import { Coin } from 'src/app/cryptocurrency/models/cryptocurrency.model';

import { Observable } from 'rxjs';

import { CoincapApiService } from './../../cryptocurrency/services/coincap-api.service';

import * as fromClass from '.';
@Injectable()
export class CoinsDataService extends DefaultDataService<Coin> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private coincapApiService: CoincapApiService
  ) {
    super(fromClass.entityCollectionName, http, httpUrlGenerator);
  }
  getAll(): Observable<Coin[]> {
    return this.coincapApiService.getAll();
  }
  /* getWithQuery(queryParams?: QueryParams) {
    return this.coincapApiService.getClassesWithQuery(queryParams);
  } */
  getByKey(courseId: string): Observable<Coin> {
    return this.getById(courseId)
  }

}
