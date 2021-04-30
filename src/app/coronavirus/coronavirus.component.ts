import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { combineAll, map, mergeMap, pluck, switchMap, tap } from 'rxjs/operators';

import { CountryEntityService } from '../store/country/country-entity.service';
import { SummaryEntityService } from './../store/summary/summary-entity.service';
import { VaccineEntityService } from '../store/vaccine/vaccines-entity.service';

import { Cases, Continent, Country, CurrentCountryCases, Vaccine } from './models/coronavirus.model';
import { Summary } from './models/covid.model';
import { CoronavirusApiService } from './services/coronavirus-api.service';


@Component({
  selector: 'app-coronavirus',
  templateUrl: './coronavirus.component.html',
  styleUrls: ['./coronavirus.component.scss']
})
export class CoronavirusComponent implements OnInit {
  countrySelect: EventEmitter<Country> = new EventEmitter();
  countryGlobalCases$: Observable<Partial<Country>>;
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


  summary$: Observable<Summary>;
  timeLine$: Observable<Cases[]>;
  summaryLoaded$: Observable<boolean>;
  loadingSummary$: Observable<boolean>;

  countries$: Observable<Country[]>;
  country$: Observable<any>;
  countryLoaded$: Observable<boolean>;
  loadingCountry$: Observable<boolean>;


  vaccines$: Observable<Vaccine[]>;
  vaccine$: Observable<Vaccine[]>;
  vaccinesLoaded$: Observable<boolean>;
  loadingVaccine$: Observable<boolean>;

  constructor(
    private countryEntityService: CountryEntityService,
    private summaryEntityService: SummaryEntityService,
    private vaccinesEntityService: VaccineEntityService,
    //private api: CoronavirusApiService
  ) {
    this.summaryLoaded$ = this.summaryEntityService.loaded$;
    this.loadingSummary$ = this.summaryEntityService.loading$;
    this.countryLoaded$ = this.countryEntityService.loaded$;
    this.loadingCountry$ = this.countryEntityService.loading$;
    this.vaccinesLoaded$ = this.vaccinesEntityService.loaded$;
    this.loadingVaccine$ = this.vaccinesEntityService.loading$;
  }
  ngOnInit(): void {
    // this.timeLine$ = this.api.getWorldTimeLine();
    this.vaccines$ = this.vaccinesEntityService.entities$
      .pipe(
        map(vaccines => {
          vaccines.push(vaccines.find(v => v.name == 'Global'))
          return vaccines;
        })
      );
    this.summary$ = this.summaryEntityService.entities$
      .pipe(
        map(summary => summary.pop())
      )
    this.countries$ = this.countryEntityService.entities$
      .pipe(
        map(countries => {
          countries.push(countries.find(x => x.name == 'Global'))
          this.countrySelector = countries.map(country => {
            return {
              name: country.name,
              id: country.abbreviation ? country.abbreviation : 'all',
              continent: country.continent ? country.continent : 'Desconocido'
            }
          });
          this.continents.map(continent => {
            continent.countries.push(...this.countrySelector.filter(x => x.continent == continent.name))
          });
          //console.log(countries)
          return countries;
        }),
      );
    this.countryName = 'Global';
    this.country$ = this.mergeCountryData(this.countryName);
  }
  onChangeSelection(countryName) {
    this.country$ = this.mergeCountryData(countryName);
  }

  mergeCountryData(countryName: string) {
    return this.countries$
      .pipe(
        map(cc => cc.find(c => c.name == countryName)),
        switchMap(cases => this.vaccines$
          .pipe(
            map(vac => {
              const vaccines = vac.find(v => v.name == countryName);
              return {
                id: cases.abbreviation,
                area: vaccines.sq_km_area,
                capital_city: vaccines.capital_city,
                continent: vaccines.continent,
                country: vaccines.country,
                date: vaccines.updated,
                elevation: vaccines.elevation_in_meters,
                iso: vaccines.iso,
                life_expectancy: vaccines.life_expectancy,
                location: vaccines.location,
                name: vaccines.country,
                population: vaccines.population,
                province: cases.province,
                confirmed: cases.confirmed,
                deaths: cases.deaths,
                recovered: cases.recovered,
                administered: vaccines.administered,
                p_vaccinated: vaccines.people_partially_vaccinated,
                vaccinated: vaccines.people_vaccinated,
              }

            })
          )
        )
      );
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
