import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { QueryParams } from '@ngrx/data';

import { Observable, Subscription } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';

import { Result, Municipality } from './../../models/states.model';
import { State } from '../../models/states.model';
import { SepomexService } from './../../services/sepomex.service';

@Component({
  selector: 'app-zip-codes',
  templateUrl: './zip-codes.component.html',
  styleUrls: ['./zip-codes.component.scss']
})
export class ZipCodesComponent implements OnInit, OnDestroy {
  searchForm: FormGroup;
  states$: Observable<State[]>;
  states: State[] = [];
  results: Observable<Result>;
  municipalities: Municipality[];
  stateSub: Subscription;
  munSub: Subscription;

  constructor(
    private sepomexService: SepomexService,
    private fb: FormBuilder
  ) { }


  ngOnInit(): void {
    this.stateSub = this.sepomexService.getStates({ page: '1' }).subscribe(pageOne => this.states.push(...pageOne));
    this.stateSub = this.sepomexService.getStates({ page: '2' }).subscribe(pageTwo => this.states.push(...pageTwo));
    this.stateSub = this.sepomexService.getStates({ page: '3' }).subscribe(pageThree => this.states.push(...pageThree));
    this.initSearchForm();
  }



  initSearchForm() {
    this.searchForm = this.fb.group({
      zip_code: new FormControl(''),
      state: new FormControl(''),
      municipality: new FormControl(''),
      city: new FormControl(''),
      colony: new FormControl(''),
    })
  }

  onSelectState(state) {
    this.sepomexService.getMunicipalities(state.id).subscribe(m =>
      this.municipalities = m.sort()
    );
  }

  onSearch() {
    const queryParams: QueryParams = {};
    this.searchForm['_forEachChild']((control, name) => {
      if (control.dirty) {
        queryParams[name] = control.value.name.toLowerCase();
      }
    });
    this.results = this.sepomexService.getPostalInfo(queryParams);

  }
  ngOnDestroy(): void {
    this.stateSub.unsubscribe();
    this.munSub.unsubscribe();
  }
}
