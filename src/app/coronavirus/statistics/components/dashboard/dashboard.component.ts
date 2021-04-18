import { StatesService } from './../../services/states.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Summary } from '../../models/summary.interface';
import { Global } from '../../models/global.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';
import { Countries } from '../../models/countries.interface';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, Color, MultiDataSet, SingleDataSet } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  world = faGlobeAmericas;
  summary: Summary;
  global: Global;
  countries: Countries[];
  mexico: Countries;
  date: string;
  timeline: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  isLoading = true;
  isCircleLoading = true;

  public mexicoPieData: SingleDataSet = [0, 0, 0];
  public globalPieData: SingleDataSet = [0, 0, 0];
  public pieLabels: Label[] = ['Confirmados', 'Recuperados', 'Muertes'];
  public pieColors = [
    {
      backgroundColor: [
        'rgba(50,180,50,1)',
        'rgba(50,180,200,1)',
        'rgba(180,50,50,1)',
      ],
    },
  ];
  public pieOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'right',
    },
  };
  public statesBarData: SingleDataSet = [0, 0, 0];
  public barLabels: SingleDataSet = [0, 0, 0];
  constructor(
    private apiService: ApiService,
    private stateService: StatesService
  ) {}

  getCases() {
    this.stateService.getTotalCasos().subscribe((data) => {
      this.timeline = data;
      const fecha = this.timeline.map(({ Fecha }) => Fecha);
      const ags = this.timeline.map(({ Aguascalientes }) => Aguascalientes);
      console.log(ags);
    });
  }

  ngOnInit() {
    this.getCases();
    this.apiService
      .sendGetRequest('summary')
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: HttpResponse<any>) => {
        this.summary = res.body;
        this.global = this.summary.Global;
        this.globalPieData = [
          this.global.TotalConfirmed,
          this.global.TotalRecovered,
          this.global.TotalDeaths,
        ];
        this.countries = this.summary.Countries;
        this.mexico = this.countries.find((x) => x.Slug === 'mexico');
        this.mexicoPieData = [
          this.mexico.TotalConfirmed,
          this.mexico.TotalRecovered,
          this.mexico.TotalDeaths,
        ];
        //this.country = this.countries[109];
        this.date = this.summary.Date;
        this.isLoading = !this.isLoading;
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }
}
