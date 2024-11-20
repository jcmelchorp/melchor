import { Injectable } from '@angular/core';

import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';

import { Country } from 'src/app/coronavirus/models/coronavirus.model';

import * as fromCountry from '.';

@Injectable()
export class CountryEntityService extends EntityCollectionServiceBase<Country> {
  constructor(readonly serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super(fromCountry.entityCollectionName, serviceElementsFactory);
  }
}
