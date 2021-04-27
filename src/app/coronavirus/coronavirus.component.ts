import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Observable, of } from 'rxjs';
import { combineAll, map, mergeMap, pluck, switchMap, tap } from 'rxjs/operators';

import { CountryEntityService } from '../store/country/country-entity.service';
import { SummaryEntityService } from './../store/summary/summary-entity.service';
import { VaccineEntityService } from '../store/vaccine/vaccines-entity.service';

import { Continent, Country, CurrentCountryCases, Vaccine } from './models/coronavirus.model';
import { Summary } from './models/covid.model';
import { CoronavirusApiService } from './services/coronavirus-api.service';


@Component({
  selector: 'app-coronavirus',
  templateUrl: './coronavirus.component.html',
  styleUrls: ['./coronavirus.component.scss']
})
export class CoronavirusComponent implements OnInit {
  countrySelect: EventEmitter<string> = new EventEmitter();
  countryCases$: Observable<Country[]>;
  countryGlobalCases$: Observable<Partial<Country>>;
  countrySelectedCases$: Observable<Country>;
  global$: Observable<Country>;
  continents: Continent[] = [
    { name: 'Asia', disabled: false, countries: [] = [] },
    { name: 'Europe', disabled: false, countries: [] = [] },
    { name: 'Africa', disabled: false, countries: [] = [] },
    { name: 'North America', disabled: false, countries: [] = [] },
    { name: 'South America', disabled: false, countries: [] = [] },
    { name: 'Oceania', disabled: false, countries: [] = [] },
    { name: 'Desconocido', disabled: false, countries: [] = [] }
  ];

  countrySelector: {
    country: string,
    abbreviation: string,
    continent: string
  }[];
  selectedCountry$: Observable<{
    country: string,
    abbreviation: string,
    continent: string
  }>;
  summaryLoaded$: Observable<boolean>;
  loadingSummary$: Observable<boolean>;
  countryLoaded$: Observable<boolean>;
  loadingCountry$: Observable<boolean>;
  vaccinesLoaded$: Observable<boolean>;
  loadingVaccine$: Observable<boolean>;
  vaccines$: Observable<Vaccine[]>;
  globalVaccine$: Observable<Vaccine>;
  defaultElevation = 4;
  raisedElevation = 6;
  summary$: Observable<Summary>;
  constructor(
    private countryCountryService: CountryEntityService,
    private summaryEntityService: SummaryEntityService,
    private vaccinesEntityService: VaccineEntityService
  ) {
    this.summaryLoaded$ = this.summaryEntityService.loaded$;
    this.loadingSummary$ = this.summaryEntityService.loading$;
    this.countryLoaded$ = this.countryCountryService.loaded$;
    this.loadingCountry$ = this.countryCountryService.loading$;
    this.vaccinesLoaded$ = this.vaccinesEntityService.loaded$;
    this.loadingVaccine$ = this.vaccinesEntityService.loading$;
  }


  ngOnInit(): void {
    this.countryCases$ = this.countryCountryService.entities$
    this.summary$ = this.summaryEntityService.entities$.pipe(
      map(summary => summary.pop())
    )
    this.globalVaccine$ = this.vaccinesEntityService.entities$.pipe(
      map(vaccines => vaccines.find(v => v.name == 'Global'))
    )
    /* this.countryCases$ = this.countryCountryService.entities$
      .pipe(
        map(countries => {
          const countrySelect = countries.map(country => {
            return {
              country: country.name,
              abbreviation: country.abbreviation ? country.abbreviation : 'Desconocido',
              continent: country.continent ? country.continent : 'Desconocido'
            }
          });
          this.continents.map(continent => {
            continent.countries.push(...countrySelect.filter(x => x.continent == continent.name))
          })
          //this.getLocation();
          return countries;
        }),

      ); */
    this.global$ = this.countryCountryService.entities$
      .pipe(
        map(countries => countries.find(x => x.name == 'Global')),
        //tap(res => console.log(res))
      );
  }
  onChangeSelection(abbreviation?: string) {
    this.countrySelect.emit(abbreviation);
  }
  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        console.log({ lon: longitude, lat: latitude })
      });
    } else {
      console.log("No support for geolocation")
    }
  }
}
