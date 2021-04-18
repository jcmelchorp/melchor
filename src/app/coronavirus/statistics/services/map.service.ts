import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  states: string =
    'https://raw.githubusercontent.com/mexicovid19/Mexico-datos/master/datos/geograficos/mexico.geojson';

  constructor(private http: HttpClient) {}

  makePlotStates(map: L.map): Observable<any> {
    return this.http.get(this.states);
  }
  makeStatesPopup(data: any): string {
    return (
      `` +
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
}
