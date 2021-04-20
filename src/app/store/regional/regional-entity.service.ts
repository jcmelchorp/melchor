import { Injectable } from '@angular/core';

import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Regional } from 'src/app/covid/models/country.model';

import * as fromRegional from '.';

@Injectable()
export class RegionalEntityService extends EntityCollectionServiceBase<Regional> {
  constructor(readonly serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super(fromRegional.entityCollectionName, serviceElementsFactory);
  }
}
