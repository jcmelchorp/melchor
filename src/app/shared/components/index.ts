import { AlertComponent } from './alert/alert.component';
import { BrandButtonComponent } from './brand-button/brand-button.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { DummyTextComponent } from './dummy-text/dummy-text.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SnackComponent } from './snack/snack.component';
import { UnderConstructionComponent } from './under-construction/under-construction.component';
export const sharedComponents: any[] = [
  AlertComponent,
  SnackComponent,
  DummyTextComponent,
  UnderConstructionComponent,
  NotFoundComponent,
  BrandButtonComponent,
  BreadcrumbComponent
]
export * from './alert/alert.component';
export * from './snack/snack.component';
export * from './dummy-text/dummy-text.component';
export * from './under-construction/under-construction.component';
export * from './not-found/not-found.component';
export * from './brand-button/brand-button.component';
export * from './breadcrumb/breadcrumb.component';
