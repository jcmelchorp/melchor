export interface FullCountry {
  id: string;
  area: number;
  active?: number;
  capital_city: string;
  continent: string;
  country: string;
  date: string;
  elevation: string;
  iso: number;
  life_expectancy: string;
  lat: string;
  long: string;
  location: string;
  name: string;
  population: number;
  province: Province[];
  confirmed: number;
  deaths: number;
  recovered: number;
  administered: number;
  p_vaccinated: number;
  vaccinated: number;
  history?: any[];
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
export interface Cases {
  id: string;
  active?: number;
  confirmed: number;
  deaths: number;
  recovered: number;
  date: string
}
