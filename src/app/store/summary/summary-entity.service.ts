import { Injectable } from '@angular/core';

import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Summary } from 'src/app/covid/models/country.model';

import * as fromSummary from './';

@Injectable()
export class SummaryEntityService extends EntityCollectionServiceBase<Summary> {
  constructor(readonly serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super(fromSummary.entityCollectionName, serviceElementsFactory);
  }
}
