import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { CountrySummary, Summary, Total } from '../../models/country.model';
import { SummaryEntityService } from './../../../store/summary/summary-entity.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  summary$: Observable<Summary>;
  selectedCountry: CountrySummary;
  global: CountrySummary;
  loaded$: Observable<boolean>;
  loading$: Observable<boolean>;
  constructor(
    private summaryEntityService: SummaryEntityService,
  ) {
    this.loaded$ = this.summaryEntityService.loaded$;
    this.loading$ = this.summaryEntityService.loading$;
  }

  ngOnInit(): void {
    this.summary$ = this.summaryEntityService.entities$
      .pipe(
        map(summary => {
          this.global = {
            Country: 'Global',
            CountryCode: 'world',
            Slug: '',
            ID: summary[0].ID,
            Date: summary[0].Global.Date,
            NewConfirmed: summary[0].Global.NewConfirmed,
            NewDeaths: summary[0].Global.NewDeaths,
            NewRecovered: summary[0].Global.NewRecovered,
            TotalConfirmed: summary[0].Global.TotalConfirmed,
            TotalDeaths: summary[0].Global.TotalDeaths,
            TotalRecovered: summary[0].Global.TotalRecovered
          };
          this.selectedCountry = summary[0].Countries.find(x => x.Country == 'Mexico')
          return summary[0]
        })
      )
  }
  onChangeSelection(country: CountrySummary) {
    this.selectedCountry = country;
  }
}
