import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-catsapp',
  templateUrl: './catsapp.component.html',
  styleUrls: ['./catsapp.component.scss']
})
export class CatsappComponent implements OnInit {
  public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  constructor(
    private breakpointObserver: BreakpointObserver,
  ) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
