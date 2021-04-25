import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Observable, of } from 'rxjs';
import { combineAll, map, mergeMap, pluck, switchMap, tap } from 'rxjs/operators';

import { CountryEntityService } from '../store/country/country-entity.service';

import { Continent, Country, CurrentCountryCases } from './models/coronavirus.model';
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
  loaded$: Observable<boolean>;
  loading$: Observable<boolean>;
  defaultElevation = 4;
  raisedElevation = 6;
  constructor(
    private countryCountryService: CountryEntityService,
  ) {
    this.loaded$ = this.countryCountryService.loaded$;
    this.loading$ = this.countryCountryService.loading$;
    this.countryCases$ = this.countryCountryService.entities$
  }


  ngOnInit(): void {
    this.countryCases$ = this.countryCountryService.entities$
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

      );
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
