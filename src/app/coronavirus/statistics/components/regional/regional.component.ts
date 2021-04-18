import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-regional',
  templateUrl: './regional.component.html',
  styleUrls: ['./regional.component.scss'],
})
export class RegionalComponent implements AfterViewInit {
  private map;
  private states;
  constructor(public mapService: MapService) {}

  ngAfterViewInit(): void {
    this.initMap();
    this.mapService.makePlotStates(this.map).subscribe((states) => {
      this.states = states;
      this.initStatesLayer();
    });
  }
  private initStatesLayer() {
    const stateLayer = L.geoJSON(this.states, {
      style: (feature) => ({
        weight: 1,
        opacity: 0.5,
        color: '#008f68',
        fillOpacity: 0.4,
        fillColor: '#6DB65B',
      }),
      onEachFeature: (feature, layer) =>
        layer
          .bindPopup(this.mapService.makeStatesPopup(feature.properties))
          .on({
            mouseover: (e) => this.highlightFeature(e),
            mouseout: (e) => this.resetFeature(e),
          }),
    });

    this.map.addLayer(stateLayer);
    stateLayer.bringToBack();
  }

  private highlightFeature(e) {
    const layer = e.target;
    layer.setStyle({
      weight: 2,
      opacity: 1.0,
      color: '#DFA612',
      fillOpacity: 1.0,
      fillColor: '#FAE042',
    });
  }

  private resetFeature(e) {
    const layer = e.target;
    layer.setStyle({
      weight: 1,
      opacity: 0.5,
      color: '#008f68',
      fillOpacity: 0.8,
      fillColor: '#6DB65B',
    });
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [22, -101],
      zoom: 4,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution:
          '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tiles.addTo(this.map);
  }
}
