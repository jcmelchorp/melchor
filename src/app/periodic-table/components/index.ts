import { AppPhaseComponent } from './app-phase/app-phase.component';
import { AppWikiComponent } from './app-wiki/app-wiki.component';
import { AtomDetailsComponent } from './atom-details/atom-details.component';
import { AtomComponent } from './atom/atom.component';
import { FooterComponent } from './footer/footer.component';
import { PeriodicTableComponent } from './periodic-table/periodic-table.component';
import { SelectionBarComponent } from './selection-bar/selection-bar.component';

export const periodicTableComponents: any[] = [
  SelectionBarComponent,
  PeriodicTableComponent,
  AtomComponent,
  AtomDetailsComponent,
  FooterComponent,
  AppPhaseComponent,
  AppWikiComponent,
]
export * from './app-phase/app-phase.component';
export * from './app-wiki/app-wiki.component';
export * from './atom-details/atom-details.component';
export * from './atom/atom.component';
export * from './footer/footer.component';
export * from './periodic-table/periodic-table.component';
export * from './selection-bar/selection-bar.component';

