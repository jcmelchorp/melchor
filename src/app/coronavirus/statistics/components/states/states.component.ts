import { Component, AfterViewInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { StatesService } from '../../services/states.service';

@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.scss'],
})
export class StatesComponent implements AfterViewInit {
  result: any;
  covdata: any[] = [];
  isLoading = true;
  public newData: ChartDataSets[] = [{ data: [], label: '' }];
  public lineChartLabels: Label[] = [];
  constructor(private stateService: StatesService) {}
  /* getConfirmedStates() {
    this.stateService.getConfirmed().subscribe((data) => {
      console.log(data);
      const list = data.split('\n');
      list.forEach((e) => {
        this.covdata.push(e);
      });
      console.log(this.covdata);
    });
  } */
  ngAfterViewInit(): void {
    //this.getConfirmedStates();
  }
}
