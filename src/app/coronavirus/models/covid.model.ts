export interface Summary {
  ID: string;
  Date: string;
  Global: Data;
  Countries: CountryData[];
  Message: string;
}
export interface History {
  Active: number;
  City: string;
  CityCode: string;
  Confirmed: number;
  Country: string;
  CountryCode: string;
  Date: string;
  Deaths: number;
  Lat: string;
  Lon: string;
  Province: string;
  Recovered: number;
}
export class CountryData implements CountryInfo, Data {
  uid?: string;
  id: string;
  name?: string;
  value?: number;
  history?: History[];
  Date: string;
  NewConfirmed: number;
  NewDeaths: number;
  NewRecovered: number;
  TotalConfirmed: number;
  TotalDeaths: number;
  TotalRecovered: number;
  Country: string;
  CountryCode: string;
  Slug: string;
}

export interface CountryInfo {
  Country: string;
  CountryCode: string;
  Slug: string;
}

export interface Data {
  Date: string;
  NewConfirmed: number;
  NewDeaths: number;
  NewRecovered: number;
  TotalConfirmed: number;
  TotalDeaths: number;
  TotalRecovered: number;
}
