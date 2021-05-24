import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { faCat, faCommentDollar, faCommentsDollar, faFlask, faViruses } from '@fortawesome/free-solid-svg-icons';

import { TranslateService } from '@ngx-translate/core';

import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @ViewChild('leftSidenav') sidenavLeft: MatSidenav;
  @Input() isHandset: boolean;
  faFlask = faFlask;
  faCat = faCat;
  faCommentsDollar = faCommentsDollar;
  faViruses = faViruses;
  constructor(
    private layoutService: LayoutService,
    public translate: TranslateService,
  ) {
    //translate.use('es');
    this.layoutService.toggleSidenavLeft.subscribe(() => {
      this.sidenavLeft.toggle();
    });
  }
  toggleSidenavLeft($event: any) {
    this.layoutService.toggleSidenavLeft.emit($event);
  }
  ngOnInit() { }
}
