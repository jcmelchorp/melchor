import { Component, Input, OnInit } from '@angular/core';

import { Country, CurrentCountryCases } from './../../models/coronavirus.model';

@Component({
  selector: 'app-global-summary',
  templateUrl: './global-summary.component.html',
  styleUrls: ['./global-summary.component.scss']
})
export class GlobalSummaryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

}
