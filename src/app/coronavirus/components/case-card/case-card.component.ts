import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { IconDefinition } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-case-card',
  templateUrl: './case-card.component.html',
  styleUrls: ['./case-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CaseCardComponent implements OnInit {
  @Input() data: {
    name: string,
    case: number,
    icon: IconDefinition,
    color: string,
    casePerCapita: number,
  };
  constructor() { }

  ngOnInit(): void {
  }

}
