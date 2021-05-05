import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';

import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { CountryData, Summary } from 'src/app/coronavirus/models/covid.model';

import { CoronavirusApiService } from '../../coronavirus/services/coronavirus-api.service';

import * as fromSummary from './';
@Injectable()
export class SummaryDataService extends DefaultDataService<Summary> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private coronavirusApiService: CoronavirusApiService,
  ) {
    super(fromSummary.entityCollectionName, http, httpUrlGenerator);
  }
  getAll(): Observable<Summary[]> {

    const x = this.coronavirusApiService.getSummary().pipe(
      map(summary => {
        var histArr: CountryData[] = []
        let aux: CountryData[] = summary[0].Countries
        aux.map(country => {
          let obs = this.coronavirusApiService.getHistory(country.Slug).pipe(
            map(history => {
              return { ...country, history: history };
            })
          )
          mergeMap(() => obs.pipe(
            map(country => {
              return { ...country }
            })
          ))
        });
        return [{
          Countries: aux,
          ID: summary[0].ID,
          Date: summary[0].Date,
          Message: summary[0].Message,
          Global: summary[0].Global
        } as Summary]
      })
    );








    return x;
  }

}
