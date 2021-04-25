/**
 * Object response model for API Request
 *   https://covid-api.mmediagroup.fr/v1/cases?country=${country}
 *   Ej. GET
 */
export interface Country extends CurrentCountryCases {
  province?: Province[]
}
export interface CurrentCountryCases {
  country: string;
  abbreviation: string;
  continent: string;
  name: string;
  iso: number;
  capital_city: string;
  elevation_in_meters: null
  life_expectancy: string;
  location: string;
  population: number;
  sq_km_area: number;
  lat: string,
  long: string,
  history?: Cases;
  confirmed: number;
  deaths: number;
  recovered: number;
  updated: string;

}
export interface Cases {
  confirmed: number[];
  deaths: number[];
  recovered: number[];
  updated: string[]
}
/**
 * Object response model for API Request to the route /cases
 *   https://covid-api.mmediagroup.fr/v1/history?country=${country}&status=${status}
 */
export interface CountryHistoricalCases {
  all: CurrentCountryCases
}

export interface Continent {
  name: string;
  disabled?: boolean;
  countries?: any[];
}

export interface Province {
  name: string;
  lat: string;
  long: string;
  confirmed: number;
  recovered: number;
  deaths: number;
  updated: string;
}
