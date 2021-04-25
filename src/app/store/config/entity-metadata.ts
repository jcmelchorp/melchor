import { EntityMetadataMap, PropsFilterFnFactory } from "@ngrx/data";

import { Country } from "src/app/coronavirus/models/coronavirus.model";
import { Coin } from "src/app/cryptocurrency/models/cryptocurrency.model";

import * as fromCoin from './../coin';
import * as fromCountry from '../country';

export const entityMetadata: EntityMetadataMap = {
  [fromCoin.entityCollectionName]: {
    entityDispatcherOptions: {},
    selectId: (coin: Coin) => coin.id,
  },

  [fromCountry.entityCollectionName]: {
    entityDispatcherOptions: {},
    selectId: (element: Country) => element.name,
    filterFn: PropsFilterFnFactory<Country>(['name', 'location', 'continent'])
  }
}
export const pluralNames = {
  [fromCoin.entityCollectionName]: fromCoin.pluralizedEntityName,
  [fromCountry.entityCollectionName]: fromCountry.pluralizedEntityName,
}

export function sortByName(a: { name: string }, b: { name: string }): number {
  return a.name.localeCompare(b.name);
}

export const entityConfig = {
  entityMetadata,
  pluralNames
};
