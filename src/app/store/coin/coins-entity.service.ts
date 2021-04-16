import { Injectable } from '@angular/core';

import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';

import { Coin } from './../../cryptocurrency/models/cryptocurrency.model';

import * as fromCoin from './';

@Injectable()
export class CoinsEntityService extends EntityCollectionServiceBase<Coin> {
  constructor(readonly serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super(fromCoin.entityCollectionName, serviceElementsFactory);
  }
}
