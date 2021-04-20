import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { ChartOptions } from 'chart.js';

import { Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-country-doughnut',
  templateUrl: './country-doughnut.component.html',
  styleUrls: ['./country-doughnut.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryDoughnutComponent implements OnInit {
  @Input() public doughnutChartLabels: Label[];
  @Input() public doughnutChartData: MultiDataSet;
  public doughnutColors = [
    {
      backgroundColor: [
        'rgba(240,240,50,1)',
        'rgba(200,60,60,1)',
        'rgba(60,160,60,1)',
      ],
    },
  ];
  public doughnutOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'left',
    },
  };
  constructor() { }

  ngOnInit() {
  }

}
