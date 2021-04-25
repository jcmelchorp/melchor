import { Component, Input, OnInit, ChangeDetectionStrategy, OnChanges } from '@angular/core';

import { faHeadSideMask, faHeadSideVirus, faSkullCrossbones } from '@fortawesome/free-solid-svg-icons';

import { MultiDataSet, SingleDataSet } from 'ng2-charts';

import { Country } from './../../models/coronavirus.model';

@Component({
  selector: 'app-cases-card',
  templateUrl: './cases-card.component.html',
  styleUrls: ['./cases-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CasesCardComponent implements OnChanges {
  @Input() casesCountry: Country;
  multiDataSet: MultiDataSet;
  faHeadSideVirus = faHeadSideVirus;
  faSkullCrossbones = faSkullCrossbones;
  faHeadSideMask = faHeadSideMask;
  constructor() { }
  ngOnInit() {
    const date = new Date().toLocaleDateString();
    this.casesCountry = { ...this.casesCountry, abbreviation: 'all' }
  }
  ngOnChanges() {
    const totalData: SingleDataSet = [this.casesCountry.confirmed, this.casesCountry.deaths, this.casesCountry.recovered];
    //const newData: SingleDataSet = [this.total.TotalConfirmed, this.total.TotalDeaths, this.total.TotalRecovered];
    this.multiDataSet = [totalData];
  }
}
