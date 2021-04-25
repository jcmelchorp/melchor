import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ChartDataSets } from 'chart.js';

import { Label } from 'ng2-charts';

import { Observable } from 'rxjs';

import { CountrySummary } from './../../models/country.model';
import { CountryData } from '../../models/country.model';
import { CountryEntityService } from './../../../store/country-data/country-entity.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnChanges {
  @Input() countryIn: CountrySummary;
  slug: string;
  dataSets: ChartDataSets[] = [];
  historical$: Observable<CountryData[]>;
  time: Label[];
  loaded$: Observable<boolean>;
  loading$: Observable<boolean>;
  constructor(
    private countryEntityService: CountryEntityService,
  ) {
    this.loaded$ = this.countryEntityService.loaded$;
    this.loading$ = this.countryEntityService.loading$;
  }
  ngOnChanges(changes: SimpleChanges) {
    this.countryEntityService.setFilter(changes['countryIn'].currentValue.Country);
    this.countryEntityService.filteredEntities$
      .subscribe(countryData => {
        if (countryData.length == 0) this.countryEntityService.getWithQuery(changes['countryIn'].currentValue.Slug);
        this.generateDataSets(countryData)
      });
  }
  generateDataSets(currentCountry: CountryData[]) {
    this.dataSets = [];
    this.time = [];
    this.dataSets.push({ data: currentCountry.map(out => out.Active), label: 'Active' });
    this.dataSets.push({ data: currentCountry.map(out => out.Confirmed), label: 'Confirmed' });
    this.dataSets.push({ data: currentCountry.map(out => out.Deaths), label: 'Deaths' });
    this.dataSets.push({ data: currentCountry.map(out => out.Recovered), label: 'Recovered' });
    this.time = currentCountry.map(out => new Date(out.Date).toLocaleDateString());
  }

}

