import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsonPipe } from '@angular/common';

import { Observable } from 'rxjs';

import * as L from 'leaflet';

import { CountryData } from '../models/country.model';

@Injectable()
export class LeafletService {
  url: string = 'https://api.covid19api.com/live/country/mexico';
  states: string = 'assets/data/mx.states.geojson';

  static scaledRadius(val: number, maxVal: number): number {
    return 20 * (val / maxVal);
  }

  constructor(private http: HttpClient) { }


  makeStatesPopup(data: any): string {
    return (
      `${data as JsonPipe}` +
      `<div class="mat-h3">${data.name}</div>` +
      `<div>Población: ${data.population}</div>` +
      `<div>Casos totales: ${data.totales}</div>` +
      `<div>Casos totales (cada 100 mil hab.): ${data.totales_100k}</div>` +
      `<div>Nuevos: ${data.nuevos}</div>` +
      `<div>Muertes: ${data.muertes}</div>` +
      `<div>Muertes nuevas: ${data.muertes_nuevas}</div>` +
      `<div>Sospechosos: ${data.sospechosos}</div>` +
      `<div>Negativos: ${data.negativos}</div>` +
      `<div>Fecha de actualización: ${data.updated_at}</div>`
    );
  }
  makePlotStates(map: L.Map): Observable<any> {
    return this.http.get(this.states);
  }

  makeCityCircleMarkers(map: L.Map): void {
    this.http.get(this.url).subscribe((res: CountryData[]) => {
      const maxPop = Math.max(...res.map(x => x.Active), 0);
      for (const c of res) {
        const lon: number = c.Lon;
        const lat: number = c.Lat;
        const circle = L.circleMarker([lat, lon], {
          radius: LeafletService.scaledRadius(c.Active, maxPop)
        }).addTo(map);
        circle.addTo(map);
      }
    });
  }
}
