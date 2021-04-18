import { Component, OnInit } from '@angular/core';
import {
  trigger,
  transition,
  animate,
  style,
  state,
} from '@angular/animations';

import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { MediaObserver, MediaChange } from '@angular/flex-layout';

@Component({
  selector: 'app-assistance',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss'],
  animations: [
    trigger('fadeInOutAnimation', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [style({ opacity: 0 }), animate(600)]),
    ]),
  ],
})
export class InformationComponent implements OnInit {
  menu = faBars;
  mediaSub: Subscription;
  deviceSm: boolean;
  deviceSize: string;

  constructor(public mediaObserver: MediaObserver) {}

  ngOnInit(): void {
    this.mediaSub = this.mediaObserver.media$.subscribe(
      (result: MediaChange) => {
        this.deviceSize = result.mqAlias;
        this.deviceSm =
          this.deviceSize === 'sm' || this.deviceSize === 'xs' ? true : false;
      }
    );
  }
}
