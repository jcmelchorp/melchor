import { CasesCardComponent } from './cases-card/cases-card.component';
import { CasesDoughnutComponent } from './cases-doughnut/cases-doughnut.component';
import { DrillDownComponent } from './drill-down/drill-down.component';
import { GlobalSummaryComponent } from './global-summary/global-summary.component';
import { HeatMapComponent } from './heat-map/heat-map.component';
import { WorldMapComponent } from './world-map/world-map.component';
import { WorldmapComponent } from './worldmap/worldmap.component';

export const coronavirusComponents: any[] = [
  CasesCardComponent,
  CasesDoughnutComponent,
  GlobalSummaryComponent,
  WorldMapComponent,
  DrillDownComponent,
  HeatMapComponent,
  WorldmapComponent,
]
export * from './cases-card/cases-card.component';
export * from './cases-doughnut/cases-doughnut.component';
export * from './global-summary/global-summary.component';
export * from './worldmap/worldmap.component';
export * from './world-map/world-map.component';
export * from './drill-down/drill-down.component';
export * from './heat-map/heat-map.component';

