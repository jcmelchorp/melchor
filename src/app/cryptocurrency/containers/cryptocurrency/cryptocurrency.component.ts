import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Coin } from '../../models/cryptocurrency.model';
import { CoincapApiService } from './../../services/coincap-api.service';
import { CoinsEntityService } from './../../../store/coin/coins-entity.service';

@Component({
  selector: 'app-cryptocurrency',
  templateUrl: './cryptocurrency.component.html',
  styleUrls: ['./cryptocurrency.component.scss']
})
export class CryptocurrencyComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

}
