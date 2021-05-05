import { Injectable } from '@angular/core';

import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';

import { FullCountry } from 'src/app/coronavirus/models/country.model';

import * as fromFullCountry from './';

@Injectable()
export class FullCountryEntityService extends EntityCollectionServiceBase<FullCountry> {
  constructor(readonly serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super(fromFullCountry.entityCollectionName, serviceElementsFactory);
  }
}
