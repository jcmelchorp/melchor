import { Component, Input, OnInit, ChangeDetectionStrategy, OnChanges } from '@angular/core';

import { faHandHoldingMedical, faHeadSideMask, faHeadSideVirus, faShieldVirus, faSkullCrossbones, faSyringe } from '@fortawesome/free-solid-svg-icons';

import { Vaccine } from 'src/app/coronavirus/models/coronavirus.model';

import { MultiDataSet, SingleDataSet } from 'ng2-charts';

import { Country } from './../../models/coronavirus.model';

@Component({
  selector: 'app-cases-card',
  templateUrl: './cases-card.component.html',
  styleUrls: ['./cases-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CasesCardComponent implements OnChanges {
  @Input() cases: Country;
  @Input() vaccine: Vaccine;
  multiDataSet: MultiDataSet;
  faHeadSideVirus = faHeadSideVirus;
  faSkullCrossbones = faSkullCrossbones;
  faHeadSideMask = faHeadSideMask;
  faSyringe = faSyringe;
  faHandHoldingMedical = faHandHoldingMedical;
  faShieldVirus = faShieldVirus;
  constructor() { }
  ngOnInit() {
    const date = new Date().toLocaleDateString();
  }
  ngOnChanges() {
    const totalData: SingleDataSet = [this.cases.confirmed, this.cases.deaths, this.cases.recovered, this.vaccine.administered, this.vaccine.people_partially_vaccinated, this.vaccine.people_vaccinated];
    //const newVacc: SingleDataSet = [this.vaccine.administered, this.vaccine.people_partially_vaccinated, this.vaccine.people_vaccinated];
    //this.multiDataSet = [totalData];
  }
}
