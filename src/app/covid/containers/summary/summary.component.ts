import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { CountryEntityService } from 'src/app/store/country-data/country-entity.service';

import { CountryData } from './../../models/country.model';
import { CountrySummary, Summary } from '../../models/country.model';
import { SummaryEntityService } from './../../../store/summary/summary-entity.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,

})
export class SummaryComponent implements OnInit {
  summary$: Observable<Summary>;
  countriesData$: Observable<CountryData[]>;
  countryPoint$: Observable<{
    Country: string,
    CountryCode: string,
    Lat: number,
    Lon: number,
    Date: string,
    Active: number,
    Confirmed: number,
    Deaths: number,
    Recovered: number,
  }[]>;
  selectedCountry: CountrySummary;
  global: CountrySummary;
  sloaded$: Observable<boolean>;
  sloading$: Observable<boolean>;
  cloaded$: Observable<boolean>;
  cloading$: Observable<boolean>;
  constructor(
    private countryEntityService: CountryEntityService,
  ) {
    this.cloaded$ = this.countryEntityService.loaded$;
    this.cloading$ = this.countryEntityService.loading$;
    this.sloaded$ = this.summaryEntityService.loaded$;
    this.sloading$ = this.summaryEntityService.loading$;
  }
  ngOnInit(): void {
    this.summary$ = this.summaryEntityService.entities$
      .pipe(
        map(summary => {
          this.global = {
            Country: 'Global',
            CountryCode: 'all',
            Slug: 'world',
            ID: summary[0].ID,
            Date: summary[0].Global.Date,
            NewConfirmed: summary[0].Global.NewConfirmed,
            NewDeaths: summary[0].Global.NewDeaths,
            NewRecovered: summary[0].Global.NewRecovered,
            TotalConfirmed: summary[0].Global.TotalConfirmed,
            TotalDeaths: summary[0].Global.TotalDeaths,
            TotalRecovered: summary[0].Global.TotalRecovered
          };
          this.selectedCountry = summary[0].Countries.find(x => x.Country == 'Mexico');
          //this.onChangeSelection(this.selectedCountry)
          return summary[0]
        })
      );
  }

  onChangeSelection(country?: CountrySummary) {
    if (country.Country == 'Global') this.selectAllCountries();
  }
  selectAllCountries() {
    this.countryPoint$ = this.summaryEntityService.entities$
      .pipe(
        map(summary => {
          const countryPoints: any[] = [];
          summary[0].Countries.map(country => country.Slug).forEach(slug => {
            if (slug != 'world') return this.countryEntityService.getWithQuery(slug)
              .pipe(
                map(countriesData => {
                  return {
                    Country: countriesData.pop().Country,
                    CountryCode: countriesData.pop().CountryCode,
                    Lat: countriesData.pop().Lat,
                    Lon: countriesData.pop().Lon,
                    Date: countriesData.pop().Date,
                    Active: countriesData.pop().Active,
                    Confirmed: countriesData.pop().Confirmed,
                    Deaths: countriesData.pop().Deaths,
                    Recovered: countriesData.pop().Recovered,
                  }
                }),
                switchMap(async (fromTop) => {
                  const parcedData = { ...fromTop };
                  countryPoints.push(parcedData);
                }),
                catchError(() => of({}))
              ); //pipe
          });
          console.log(countryPoints)
          return countryPoints;
        })
      );
  }
}
