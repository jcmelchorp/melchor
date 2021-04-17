import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { faCommentDollar, faCommentsDollar } from '@fortawesome/free-solid-svg-icons';

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
  faCommentsDollar = faCommentsDollar;

  constructor(
    private layoutService: LayoutService,
    public translate: TranslateService,
  ) {
    //translate.use('es');
    this.layoutService.toggleSidenavLeft.subscribe(() => {
      this.sidenavLeft.toggle();
    });
  }

  ngOnInit() { }
}
