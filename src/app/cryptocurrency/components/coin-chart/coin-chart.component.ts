import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';

import { Label, Color, BaseChartDirective } from 'ng2-charts';

import * as pluginAnnotations from 'chartjs-plugin-annotation';


@Component({
  selector: 'app-coin-chart',
  templateUrl: './coin-chart.component.html',
  styleUrls: ['./coin-chart.component.scss'],
})
export class CoinChartComponent implements OnInit {
  @Input() dataPoint: ChartDataSets;
  @Input() dataLabels: Label[];
  lineChartData: ChartDataSets[];
  lineChartLabels: Label[];
  public lineChartOptions: (ChartOptions & { annotation?: any }) = {
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
  public lineChartPlugins = [pluginAnnotations];
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor() {

  }

  ngOnInit(): void {
    this.lineChartData = [this.dataPoint];
    this.lineChartLabels = this.dataLabels;
  }
  // events
  /* chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  } */
}
