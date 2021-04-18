import { Component, OnInit } from '@angular/core';
import { KatexOptions } from 'ng-katex';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { FormBuilder, Validators } from '@angular/forms';

export interface Result {
  suc?: number;
  inf?: number;
  rec?: number;
  t?: number;
}

@Component({
  selector: 'app-s-i-r',
  templateUrl: './s-i-r.component.html',
  styleUrls: ['./s-i-r.component.scss'],
})
export class SIRComponent implements OnInit {
  public results: Result[] = [];
  public sirData: ChartDataSets[] = [{ data: [], label: '' }];
  public lineChartLabels: Label[] = [];
  // Plot parameters
  public lineChartColors: Color[] = [
    {
      borderColor: 'rgba(0,120,0,1)',
      backgroundColor: 'rgba(0,120,0,0.3)',
    },
    {
      borderColor: 'rgba(50,80,180,1)',
      backgroundColor: 'rgba(50,80,180,0.3)',
    },
    {
      borderColor: 'rgba(230,160,0,1)',
      backgroundColor: 'rgba(230,160,0,0.5)',
    },
  ];
  // Form
  public sirForm = this.formBuilder.group({
    totalPop: [
      null,
      Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(8),
      ]),
    ],
    beta: [
      null,
      Validators.compose([
        Validators.required,
        Validators.min(0),
        Validators.max(1),
      ]),
    ],
    gamma: [
      null,
      Validators.compose([
        Validators.required,
        Validators.min(0),
        Validators.max(1),
      ]),
    ],
    delta_t: [
      null,
      Validators.compose([
        Validators.required,
        Validators.min(0),
        Validators.max(1),
      ]),
    ],
    totalTime: [
      null,
      Validators.compose([
        Validators.required,
        Validators.min(0),
        Validators.max(5000),
      ]),
    ],
    i0: [null, Validators.compose([Validators.required, Validators.min(1)])],
    r0: [null, Validators.compose([Validators.required, Validators.min(0)])],
  });
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.sirForm.setValue({
      totalPop: 1000,
      beta: 0.2,
      gamma: 0.1,
      delta_t: 0.25,
      totalTime: 80,
      i0: 1,
      r0: 0,
    });
    this.plotData(this.sirForm.value);
  }

  onSubmit() {
    this.plotData(this.sirForm.value);
  }

  plotData(formData: any) {
    var N = formData.totalPop;
    var beta = formData.beta;
    var gamma = formData.gamma;
    var dt = formData.delta_t;
    var totalTime = formData.totalTime;
    var i0 = formData.i0;
    var r0 = formData.r0;
    this.results = this.calculate(N, beta, gamma, dt, totalTime, i0, r0);
    this.sirData = this.createSeries(this.results).outDataSet;
    this.lineChartLabels = this.createSeries(this.results).days;
  }

  calculate(
    N: number,
    beta: number,
    gamma: number,
    dt: number,
    totalTime: number,
    initInfected: number,
    initRecover: number
  ): Result[] {
    var sucept: number;
    var infect: number;
    var r: number;
    var steps: number;
    var t: number;
    var dsdt: number;
    var dinfectdt: number;
    var drdt: number;
    var output: Result[] = [];
    steps = totalTime * (1 / dt);
    for (var i = 0; i <= steps; i++) {
      t = dt * i;

      if (i == 0) {
        sucept = N - initInfected;
        infect = initInfected;
        r = initRecover;
      } else {
        sucept = sucept + (dt / 2) * dsdt;
        infect = infect + (dt / 2) * dinfectdt;
        r = r + (dt / 2) * drdt;
      }
      /* -- Euler Step -- */
      // iResult[] = [];
      dsdt = (-beta * sucept * infect) / N;
      dinfectdt = (beta * sucept * infect) / N - gamma * infect;
      drdt = gamma * infect;
      // i + 1
      sucept = sucept + dt * dsdt;
      infect = infect + dt * dinfectdt;
      r = r + dt * drdt;
      /* -- end of Euler Step -- */

      /* -- Fordward diferentiation -- */
      // i + 1
      dsdt = (-beta * sucept * infect) / N;
      dinfectdt = -dsdt - gamma * infect;
      drdt = gamma * infect;
      // preparing results
      output.push({ t: 0, suc: 0, inf: 0, rec: 0 });
      output[i].t = t;
      output[i].suc = sucept;
      output[i].inf = infect;
      output[i].rec = r;
    }
    return output;
  }

  createSeries(resultArr: Result[]) {
    var time = resultArr.map(({ t }) => t);
    var suceptible = resultArr.map(({ suc }) => suc);
    var infected = resultArr.map(({ inf }) => inf);
    var recovered = resultArr.map(({ rec }) => rec);
    var outDataSet: ChartDataSets[] = [
      { data: suceptible, label: 'Suceptibles' },
      { data: infected, label: 'Infectados' },
      { data: recovered, label: 'Recuperados' },
    ];
    var days: string[] = [''];
    for (var i in time) {
      days[i] = time[i].toString();
    }
    return { outDataSet, days };
  }
}
