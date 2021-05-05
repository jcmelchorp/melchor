import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { combineAll, map, mergeMap, pluck, switchMap, tap, catchError } from 'rxjs/operators';

import { CountryEntityService } from '../store/country/country-entity.service';
import { FullCountryEntityService } from '../store/full-country/full-country-entity.service';
import { SummaryEntityService } from './../store/summary/summary-entity.service';
import { VaccineEntityService } from '../store/vaccine/vaccines-entity.service';

import { Continent, Country, CurrentCountryCases, Vaccine } from './models/coronavirus.model';
import { Cases, FullCountry } from './models/country.model';
import { Summary } from './models/covid.model';
import { CoronavirusApiService } from './services/coronavirus-api.service';


@Component({
  selector: 'app-coronavirus',
  templateUrl: './coronavirus.component.html',
  styleUrls: ['./coronavirus.component.scss']
})
export class CoronavirusComponent implements OnInit {
  /* countrySelect: EventEmitter<Country> = new EventEmitter();
  countryGlobalCases$: Observable<Partial<Country>>;*/
  continents: Continent[] = [
    { name: 'Favoritos', disabled: false, countries: [] = [] },
    { name: 'Asia', disabled: false, countries: [] = [] },
    { name: 'Europe', disabled: false, countries: [] = [] },
    { name: 'Africa', disabled: false, countries: [] = [] },
    { name: 'North America', disabled: false, countries: [] = [] },
    { name: 'South America', disabled: false, countries: [] = [] },
    { name: 'Oceania', disabled: false, countries: [] = [] },
    { name: 'unknown', disabled: false, countries: [] = [] }
  ];
  continents$: Observable<Continent[]>;
  countrySelector: {
    name: string,
    id: string,
    continent: string
  }[];
  country: {
    name: string;
    id: string;
    continent: string;
  }

  countryName: string;

  /* countries$: Observable<any[]> */

  /* timeLine$: Observable<Cases[]>; */


  fullCountries$: Observable<FullCountry[]>;
  country$: Observable<any>;
  loaded$: Observable<boolean>;
  loading$: Observable<boolean>;
  worldTimeline: Observable<{ date: string, list: any }[]>;
  totalTimeline: Observable<{ date: string, confirmed: number, deaths: number, recovered: number, id: string }[]>;


  constructor(
    private fullCountryEntityService: FullCountryEntityService,
    private api: CoronavirusApiService
  ) {
    this.loaded$ = this.fullCountryEntityService.loaded$;
    this.loading$ = this.fullCountryEntityService.loading$;
  }
  ngOnInit(): void {
    this.worldTimeline = this.api.getWorldTimeLine();
    this.totalTimeline = this.api.getTotalTimeLine();
    this.countryName = 'Global';

    this.fullCountries$ = this.fullCountryEntityService.entities$;
    this.continents$ = this.fullCountryEntityService.entities$
      .pipe(
        map(countries => {
          this.countrySelector = countries
            .map(country => {
              return {
                name: country.name,
                id: country.id ? country.id : 'all',
                continent: country.continent ? country.continent : 'unknown'
              }
            });
          this.continents
            .forEach(continent => {
              continent.countries
                .push(...this.countrySelector
                  .filter(x => x.continent == continent.name))
            });
          this.continents
            .find(cont => cont.name == 'Favoritos').countries
            .push(...this.countrySelector
              .filter(x => x.name == 'Mexico' || x.name == 'Global'));
          return this.continents;
        })
      );
    this.country$ = this.mergeCountryHistory(this.countryName);
  }

  onChangeSelection(countryName) {
    this.country$ = this.mergeCountryHistory(countryName);
  }
  mergeCountryHistory(countryName): Observable<FullCountry> {
    return this.fullCountryEntityService.entities$.pipe(
      map(countries => countries.find(c => c.name == countryName)),
      switchMap(country => this.api.fetchCountryTimeLine(countryName).pipe(
        map(history => {
          const timeline = history.date.map((d, i) => {
            return {
              id: country.id,
              name: country.name,
              confirmed: history.confirmed[i],
              deaths: history.deaths[i],
              recovered: history.recovered[i],
              date: history.date[i],
              active: history.confirmed[i] - history.deaths[i] - history.recovered[i]
            }
          })
          return { ...country, history: timeline }
        })
      ))
    );
  }
  /* mergeCountryData(countryName: string): Observable<FullCountry> {
    this.countryName = countryName;
    return this.countryEntityService.entities$
      .pipe(
        map(cc => cc.find(c => c.name == countryName)),
        switchMap(cases => this.vaccinesEntityService.entities$
          .pipe(
            map(vac => {
              const vaccines = vac.find(v => v.name == countryName);
              const result: FullCountry = {
                id: cases.abbreviation,
                active: cases.active,
                area: cases.sq_km_area,
                capital_city: cases.capital_city,
                continent: cases.continent,
                country: cases.country,
                date: cases.updated,
                elevation: cases.elevation_in_meters,
                iso: cases.iso,
                life_expectancy: cases.life_expectancy,
                lat: cases.lat,
                long: cases.long,
                location: cases.location,
                name: cases.country,
                population: cases.population,
                province: cases.province,
                confirmed: cases.confirmed,
                deaths: cases.deaths,
                recovered: cases.recovered,
                administered: vaccines.administered,
                p_vaccinated: vaccines.people_partially_vaccinated,
                vaccinated: vaccines.people_vaccinated,
              };
              return result;
            }),

          )
        ),
        switchMap(obs => this.api.fetchCountryTimeLine(countryName)
          .pipe(
            map(historicals => {
              const timeline = [];
              for (let i = 0; i < historicals.date.length - 1; i++) {
                const h = {
                  ...obs,
                  confirmed: historicals.confirmed[i],
                  deaths: historicals.deaths[i],
                  recovered: historicals.recovered[i],
                  date: historicals.date[i],
                  active: historicals.confirmed[i] - historicals.deaths[i] - historicals.recovered[i]
                };
                timeline.push(h);
              }
              return { ...obs, history: timeline }
            })
          )
        ), catchError(err => of({} as FullCountry))
      )
  } */

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
