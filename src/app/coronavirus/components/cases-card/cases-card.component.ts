import { Component, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';

import { faFirstAid, faHandHoldingMedical, faHeadSideMask, faHeadSideVirus, faShieldVirus, faSkullCrossbones, faSyringe } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-cases-card',
  templateUrl: './cases-card.component.html',
  styleUrls: ['./cases-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CasesCardComponent implements OnChanges {
  @Input() country: any
  cases: any[];
  faHeadSideVirus = faHeadSideVirus;
  faSkullCrossbones = faSkullCrossbones;
  faHeadSideMask = faHeadSideMask;
  faSyringe = faSyringe;
  faHandHoldingMedical = faHandHoldingMedical;
  faShieldVirus = faShieldVirus;
  faFirstAid = faFirstAid;

  makeCards(country) { }

  ngOnChanges(changes: SimpleChanges): void {
    /*  this.cases = [{
       name: 'Confirmados',
       case: changes.confirmed.currentValue,
       icon: faHeadSideVirus,
       color: 'warning',
       casePerCapita: changes.confirmed.currentValue / changes.population.currentValue * 100,
     },
     {
       name: 'Muertes',
       case: changes.deaths.currentValue,
       icon: faSkullCrossbones,
       color: 'danger',
       casePerCapita: changes.deaths.currentValue / changes.population.currentValue * 100,
     },
     {
       name: 'Recuperados',
       case: changes.recovered.currentValue,
       icon: faHeadSideMask,
       color: 'success',
       casePerCapita: changes.recovered.currentValue / changes.population.currentValue * 100,
     },
     {
       name: 'Administradas',
       case: changes.administered.currentValue,
       icon: faHandHoldingMedical,
       color: 'secondary',
       casePerCapita: changes.administered.currentValue / changes.population.currentValue * 100,
     },
     {
       name: 'Parcialmente vacunados',
       case: changes.p_vaccinated.currentValue,
       icon: faSyringe,
       casePerCapita: changes.p_vaccinated.currentValue / changes.population.currentValue * 100,
     },
     {
       name: 'Vacunados',
       case: changes.vaccinated.currentValue,
       icon: faShieldVirus,
       color: 'success',
       casePerCapita: changes.vaccinated.currentValue / changes.population.currentValue * 100,
     }
     ] */
  }

}
