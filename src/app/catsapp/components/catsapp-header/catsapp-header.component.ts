import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';

import { faCat, faEllipsisV, faGlobe } from '@fortawesome/free-solid-svg-icons';

import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-catsapp-header',
  templateUrl: './catsapp-header.component.html',
  styleUrls: ['./catsapp-header.component.scss']
})
export class CatsappHeaderComponent implements OnInit {
  @Input() isHandset: boolean;
  cat = faCat; dots = faEllipsisV; lang = faGlobe;
  ngOnInit() { };
}
