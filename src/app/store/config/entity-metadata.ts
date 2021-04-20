import { EntityMetadataMap } from "@ngrx/data";
import { Regional, Summary } from "src/app/covid/models/country.model";

import { Coin } from "src/app/cryptocurrency/models/cryptocurrency.model";

import * as fromCoin from './../coin';
import * as fromSummary from './../summary';
import * as fromRegional from './../regional';

export const entityMetadata: EntityMetadataMap = {
  [fromCoin.entityCollectionName]: {
    entityDispatcherOptions: {
    },
    selectId: (coin: Coin) => coin.id,
  },
  [fromSummary.entityCollectionName]: {
    entityDispatcherOptions: {
    },
    selectId: (summary: Summary) => summary.ID,
  },
  [fromRegional.entityCollectionName]: {
    entityDispatcherOptions: {
    },
    selectId: (regional: Regional) => regional.ID,
  },
};
export const pluralNames = {
  [fromCoin.entityCollectionName]: fromCoin.pluralizedEntityName,
  [fromSummary.entityCollectionName]: fromCoin.pluralizedEntityName
};

export function sortByName(a: { name: string }, b: { name: string }): number {
  return a.name.localeCompare(b.name);
}

export const entityConfig = {
  entityMetadata,
  pluralNames
};
