import { Component, Input, OnInit } from '@angular/core';

import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';

import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-states-timeline',
  templateUrl: './states-timeline.component.html',
  styleUrls: ['./states-timeline.component.scss']
})
export class StatesTimelineComponent implements OnInit {
  @Input() public lineChartData: ChartDataSets[];
  @Input() public lineChartLabels: Label[];
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  constructor() { }

  ngOnInit() {
  }

}
