import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-sepomex-toolbar',
  templateUrl: './sepomex-toolbar.component.html',
  styleUrls: ['./sepomex-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SepomexToolbarComponent implements OnInit {
  @Input() isHandset: boolean
  constructor() { }

  ngOnInit(): void {
  }

}
