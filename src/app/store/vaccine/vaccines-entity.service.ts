import { Injectable } from '@angular/core';

import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';

import { Vaccine } from 'src/app/coronavirus/models/coronavirus.model';

import * as fromVaccine from '.';

@Injectable()
export class VaccineEntityService extends EntityCollectionServiceBase<Vaccine> {
  constructor(readonly serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super(fromVaccine.entityCollectionName, serviceElementsFactory);
  }
}
