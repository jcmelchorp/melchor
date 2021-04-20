import { Component, Input, OnInit, ChangeDetectionStrategy, OnChanges } from '@angular/core';

import { faHeadSideMask, faHeadSideVirus, faSkullCrossbones } from '@fortawesome/free-solid-svg-icons';

import { MultiDataSet, SingleDataSet } from 'ng2-charts';

import { CountrySummary } from './../../models/country.model';

@Component({
  selector: 'app-summary-card',
  templateUrl: './summary-card.component.html',
  styleUrls: ['./summary-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,


})
export class SummaryCardComponent implements OnChanges {
  faHeadSideVirus = faHeadSideVirus;
  faSkullCrossbones = faSkullCrossbones;
  faHeadSideMask = faHeadSideMask;

  @Input() total: Partial<CountrySummary>;
  multiDataSet: MultiDataSet;

  constructor() { }
  ngOnChanges() {
    const totalData: SingleDataSet = [this.total.TotalConfirmed, this.total.TotalDeaths, this.total.TotalRecovered];
    const newData: SingleDataSet = [this.total.TotalConfirmed, this.total.TotalDeaths, this.total.TotalRecovered];
    this.multiDataSet = [totalData];
  }
}
