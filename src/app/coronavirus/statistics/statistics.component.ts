import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { MediaChange, MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
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
