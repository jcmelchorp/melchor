import { Component, ViewChild, Input } from '@angular/core';

import pluginAnnotations from 'chartjs-plugin-annotation';

import { ChartAnimationOptions, ChartDataSets, ChartOptions, ChartType } from 'chart.js';

import { BaseChartDirective, Color, Label } from 'ng2-charts';



@Component({
  selector: 'app-historical-by-country',
  templateUrl: './historical-by-country.component.html',
  styleUrls: ['./historical-by-country.component.scss'],
})
export class HistoricalByCountryComponent {
  @Input() public lineChartData: ChartDataSets[];
  @Input() public lineChartLabels: Label[];
  public lineChartOptions: (ChartOptions & { annotation?: any } & ChartAnimationOptions) = {
    responsive: true,
    title: {
      text: 'Historial de casos',
      display: true,
      position: 'top',
      fontFamily: 'sarabun',
      fontSize: 20,
    },
    aspectRatio: 2,
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Fecha',
          fontSize: 16
        },
        distribution: 'series',
        ticks: {
          beginAtZero: false,
          fontColor: 'black',
        },
      }],
      yAxes: [{
        id: 'y-axis-0',
        position: 'left',
        gridLines: {
          color: 'rgba(50,50,50,0.5)',
        },
        scaleLabel: {
          display: true,
          labelString: 'Casos',
          fontSize: 16
        },
        ticks: {
          beginAtZero: true,
          fontColor: 'black',
          callback: function (tick) {
            if (tick > 1000 && tick <= 1000000) {
              let tempTick = +tick / 1000;
              return tempTick.toLocaleString() + 'k';
            } else if (tick > 1000000) {
              let tempTick = +tick / 1000000;
              return tempTick.toLocaleString() + 'M';
            } else {
              return tick.toLocaleString();
            }
          }
        },
      }]
    },
    animation: {
      animateScale: true,
      animateRotate: true,
      //duration: 1000,
      easing: 'easeInOutElastic',
    },
    annotation: {
      drawTime: 'beforeDatasetsDraw',
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: '1/1/2021',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: '2021',
            position: 'top'
          }
        },
      ]
    }
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'rgba(50,50,200,1)',
      backgroundColor: 'rgba(30,30,180,0.5)',
      hoverBackgroundColor: 'rgba(30,30,180,0.2)',
      pointRadius: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(30,30,30,0.5)',
      pointHoverBorderColor: 'rgba(30,30,180,1)',
      pointBorderWidth: 0,
    },
    {
      borderColor: 'rgba(200,200,50,1)',
      backgroundColor: 'rgba(180,180,30,0.5)',
      hoverBackgroundColor: 'rgba(180,180,30,0.2)',
      pointBackgroundColor: 'rgba(200,200,50,0.5)',
      //pointBorderColor: '#fff',
      //pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(180,180,30,0.5)',
      pointRadius: 1,
    },
    {
      borderColor: 'rgba(200,50,50,1)',
      backgroundColor: 'rgba(180,30,30,0.5)',
      hoverBackgroundColor: 'rgba(180,30,30,0.2)',
      pointBackgroundColor: 'rgba(200,50,50,0.5)',
      //pointBorderColor: '#fff',
      //pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(180,30,30,0.5)',
      pointRadius: 1,
    },
    {
      borderColor: 'rgba(50,200,50,1)',
      backgroundColor: 'rgba(30,180,30,0.5)',
      hoverBackgroundColor: 'rgba(30,180,30,0.2)',
      pointBackgroundColor: 'rgba(50,200,50,0.5)',
      //pointBorderColor: '#fff',
      //pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(30,180,30,0.5)',
      pointRadius: 1,

    }
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(

  ) {

  }
  ngOnChanges() {
  }

}


