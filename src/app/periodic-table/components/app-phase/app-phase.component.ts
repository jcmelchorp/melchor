import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-phase',
  templateUrl: './app-phase.component.html',
  styleUrls: ['./app-phase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppPhaseComponent implements OnInit {
  @Output()
  enter = new EventEmitter<string>();

  @Input()
  selected: boolean;

  @Input()
  symbol: string;

  @Input()
  type: string;

  constructor() { }

  ngOnInit() { }
}
