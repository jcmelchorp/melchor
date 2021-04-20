import { Component, OnInit, AfterViewInit } from '@angular/core';

import * as L from 'leaflet';

import { Covid19apiService } from './../../services/covid19api.service';
import { LeafletService } from '../../services/leaflet.service';

@Component({
  selector: 'app-country-map',
  templateUrl: './country-map.component.html',
  styleUrls: ['./country-map.component.scss']
})
export class CountryMapComponent implements AfterViewInit {
  private map;
  private states;
  constructor(
    public leafletService: LeafletService,
  ) { }

  ngAfterViewInit(): void {
    this.initMap();
    this.leafletService.makePlotStates(this.map).subscribe((states) => {
      this.states = states;
      this.initStatesLayer();
    });
    this.leafletService.makeCityCircleMarkers(this.map);
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
          .bindPopup(this.leafletService.makeStatesPopup(feature.properties))
          .on({
            mouseover: (e) => this.highlightFeature(e),
            mouseout: (e) => this.resetFeature(e),
          }),
    });

    this.map.addLayer(stateLayer);
    stateLayer.bringToBack();
  }
  private initMap(): void {
    this.map = L.map('map', {
      center: [22, -101],
      zoom: 4,
    });
    //  End reading a JSON file
    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      });
    tiles.addTo(this.map);
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
}
