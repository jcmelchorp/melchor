export interface Country {
  Country: string
  Slug: string;
  ISO2: string;
}
export interface CountryData {
  Active: number;
  City: string;
  CityCode: string;
  Confirmed: number;
  Country: string;
  CountryCode: string;
  Date: string;
  Deaths: number;
  ID: string;
  Lat: string;
  Lon: string;
  Province: string;
  Recovered: number;
}
export interface Summary {
  Countries: CountrySummary[];
  ID: string;
  Date: string;
  Global: Total;
  Message: string;
}

export interface CountrySummary extends Total {
  ID: string;
  Country: string;
  CountryCode: string;
  Slug: string;
}
export interface Total {
  Date: string;
  NewConfirmed: number;
  NewDeaths: number;
  NewRecovered: number;
  TotalConfirmed: number;
  TotalDeaths: number;
  TotalRecovered: number;
}
export interface Regional {
  Active: number;
  City: string;
  CityCode: string;
  Confirmed: number;
  Country: string;
  CountryCode: string;
  Date: string;
  Deaths: number;
  ID: string;
  Lat: number;
  Lon: number;
  Province: string;
  Recovered: number;
}
