import { EntityMetadataMap } from "@ngrx/data";

import { Coin } from "src/app/cryptocurrency/models/cryptocurrency.model";

import * as fromCoin from './../coin';

export const entityMetadata: EntityMetadataMap = {
  [fromCoin.entityCollectionName]: {
    entityDispatcherOptions: {
    },
    selectId: (coin: Coin) => coin.id,
  }
};
export const pluralNames = {
  [fromCoin.entityCollectionName]: fromCoin.pluralizedEntityName
};

export function sortByName(a: { name: string }, b: { name: string }): number {
  return a.name.localeCompare(b.name);
}

export const entityConfig = {
  entityMetadata,
  pluralNames
};
