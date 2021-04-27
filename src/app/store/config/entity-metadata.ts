import { EntityMetadataMap, PropsFilterFnFactory } from "@ngrx/data";

import { Country, Vaccine } from "src/app/coronavirus/models/coronavirus.model";
import { Coin } from "src/app/cryptocurrency/models/cryptocurrency.model";

import * as fromCoin from './../coin';
import * as fromCountry from '../country';
import * as fromSummary from '../summary';
import * as fromVaccine from '../vaccine';
import { Summary } from './../../coronavirus/models/covid.model';

export const entityMetadata: EntityMetadataMap = {
  [fromCoin.entityCollectionName]: {
    entityDispatcherOptions: {},
    selectId: (coin: Coin) => coin.id,
  },

  [fromCountry.entityCollectionName]: {
    entityDispatcherOptions: {},
    selectId: (element: Country) => element.name,
    filterFn: PropsFilterFnFactory<Country>(['name', 'location', 'continent'])
  },
  [fromSummary.entityCollectionName]: {
    entityDispatcherOptions: {},
    selectId: (element: Summary) => element.ID
  },
  [fromVaccine.entityCollectionName]: {
    entityDispatcherOptions: {},
    selectId: (element: Vaccine) => element.name
  }
}
export const pluralNames = {
  [fromCoin.entityCollectionName]: fromCoin.pluralizedEntityName,
  [fromCountry.entityCollectionName]: fromCountry.pluralizedEntityName,
  [fromSummary.entityCollectionName]: fromSummary.pluralizedEntityName,
  [fromVaccine.entityCollectionName]: fromVaccine.pluralizedEntityName,
}

export function sortByName(a: { name: string }, b: { name: string }): number {
  return a.name.localeCompare(b.name);
}

export const entityConfig = {
  entityMetadata,
  pluralNames
};
