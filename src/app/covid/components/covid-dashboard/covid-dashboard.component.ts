import { Component, OnInit } from '@angular/core';

import { ChartDataSets } from 'chart.js';

import { Label } from 'ng2-charts';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';

import { Country, CountryData, Summary, CountrySummary } from './../../models/country.model';
import { Covid19apiService } from './../../services/covid19api.service';

@Component({
  templateUrl: './covid-dashboard.component.html',
  styleUrls: ['./covid-dashboard.component.scss']
})
export class CovidDashboardComponent implements OnInit {
  countries$: Observable<Country[]>;
  casesByCountry$: Observable<CountryData[]>;
  summary$: Observable<Summary>;
  dataPoints: ChartDataSets[];
  dataLabels: Label[];
  selectedSlug: string;
  selectedCountry: CountrySummary;
  destroy$: Subject<boolean> = new Subject<boolean>();
  loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();
  constructor(
    private covid19apiService: Covid19apiService,
  ) { }

  ngOnInit(): void {
    this.countries$ = this.covid19apiService.getCountries();
    //this.summary$ = this.covid19apiService.getSummary();
  }
  onChangeSelection(country: CountrySummary) {
    this.selectedCountry = country
  }
  onSelectChange(country: Country) {
    this.loadingSubject.next(true)
    this.covid19apiService.getCasesByCountry(country.Slug)
      .pipe(
        map(dataSet => {
          this.dataPoints = [];
          this.dataPoints.push({ data: dataSet.map(data => data.Active), label: 'Active' });
          this.dataPoints.push({ data: dataSet.map(data => data.Confirmed), label: 'Confirmed' });
          this.dataPoints.push({ data: dataSet.map(data => data.Deaths), label: 'Deaths' });
          this.dataPoints.push({ data: dataSet.map(data => data.Recovered), label: 'Recovered' });
          this.dataLabels = dataSet.map(data => new Date(data.Date).toLocaleDateString());
          return dataSet
        }),
        catchError(
          () => of({
            dataPoints: [{ data: [], label: '' }] as ChartDataSets[], dataLabels: [] as Label[]
          })
        ),
        finalize(
          () => this.loadingSubject.next(false)
        )).subscribe();
  }
  requestData() {

  }
}
