import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { HighlightState } from './models/atom.model';

@Component({
  selector: 'app-periodic',
  templateUrl: './periodic.component.html',
  styleUrls: ['./periodic.component.scss']
})
export class PeriodicComponent {
  highlightState: HighlightState;
  category: string;

  constructor(titleService: Title) {
    titleService.setTitle('Periodic Table');
  }

  highlightElement(highlightState: HighlightState) {
    this.highlightState = highlightState;
  }

  setCurrentAtomCategory(category: string) {
    this.category = category;
  }


}
