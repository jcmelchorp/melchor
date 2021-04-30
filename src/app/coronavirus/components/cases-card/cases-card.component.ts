import { Component, Input, OnInit, ChangeDetectionStrategy, OnChanges } from '@angular/core';

import { faFirstAid, faHandHoldingMedical, faHeadSideMask, faHeadSideVirus, faShieldVirus, faSkullCrossbones, faSyringe } from '@fortawesome/free-solid-svg-icons';

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
  @Input() country: any
  multiDataSet: MultiDataSet;
  faHeadSideVirus = faHeadSideVirus;
  faSkullCrossbones = faSkullCrossbones;
  faHeadSideMask = faHeadSideMask;
  faSyringe = faSyringe;
  faHandHoldingMedical = faHandHoldingMedical;
  faShieldVirus = faShieldVirus;
  faFirstAid = faFirstAid;
  constructor() { }
  ngOnInit() {
    const date = new Date().toLocaleDateString();
  }
  ngOnChanges() {

  }
}
