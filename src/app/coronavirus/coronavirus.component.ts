import { Component, OnInit } from '@angular/core';

import { faVirus } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-coronavirus',
  templateUrl: './coronavirus.component.html',
  styleUrls: ['./coronavirus.component.scss']
})
export class CoronavirusComponent implements OnInit {
  faVirus = faVirus;
  constructor() { }
  ngOnInit(): void {
  }

}
