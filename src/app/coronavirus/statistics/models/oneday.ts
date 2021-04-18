export class Oneday {
  constructor(
    public country: string,
    public countryCode: string,
    public province: string,
    public city: string,
    public cityCode: string,
    public lat: number,
    public lon: number,
    public confirmed: number,
    public deaths: number,
    public recovered: number,
    public active: number,
    public date: string
  ) {}
}
