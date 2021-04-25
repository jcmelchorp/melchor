import { DataSource } from '@angular/cdk/collections';
import { isPlatformBrowser } from '@angular/common';
import { Component, Input, OnInit, AfterViewInit, Inject, PLATFORM_ID, OnDestroy, NgZone, OnChanges, SimpleChanges } from '@angular/core';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_worldHigh from '@amcharts/amcharts4-geodata/worldHigh';

import { Country } from '../../models/coronavirus.model';

@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.scss']
})
export class WorldMapComponent implements AfterViewInit, OnChanges {
  @Input() countries: Country[]
  @Input() abbreviation: string;
  chart: am4maps.MapChart;
  polygonSeries: am4maps.MapPolygonSeries;
  constructor(private zone: NgZone) { }

  ngAfterViewInit() {

    /* Create map instance */
    this.chart = am4core.create('chartdiv', am4maps.MapChart);

    /* Set map definition */
    this.chart.geodata = am4geodata_worldHigh;

    /* Set projection */
    this.chart.projection = new am4maps.projections.NaturalEarth1();

    /* Create map polygon series */
    this.polygonSeries = this.chart.series.push(new am4maps.MapPolygonSeries());

    /* Make map load polygon (like country names) data from GeoJSON */
    this.polygonSeries.useGeodata = true;

    /* Configure series */
    var polygonTemplate = this.polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = '{name}: {deaths}';
    polygonTemplate.fill = am4core.color('#74B266');
    polygonTemplate.events.on('hit', function (ev) {
      ev.target.series.chart.zoomToMapObject(ev.target);
    });

    /* Create hover state and set alternative fill color */
    var hs = polygonTemplate.states.create('hover');
    hs.properties.fill = am4core.color('#367B25');

    // No thanks, Antarctica, no thanks.
    this.polygonSeries.exclude = ['AQ'];
    this.chart.zoomControl = new am4maps.ZoomControl();

    this.polygonSeries.events.on('inited', () => {
      this.polygonSeries.addData(this.countries)
    })
  };


  ngOnChanges(changes: SimpleChanges) {
    setTimeout(() => {
      const animation = this.chart.zoomToMapObject(this.polygonSeries.getPolygonById(changes.abbreviation.currentValue))
      animation.events.on('animationended', () => {
        this.chart.homeGeoPoint = this.chart.centerGeoPoint;
        this.chart.homeZoomLevel = this.chart.zoomLevel;
      });
    }, 500);
  };
}

function createMarkers(chart) {
  console.log('calling createMarkers');
  const demoAddress = { my_lat: 35.6895, my_lng: 139.6917 };
  const mapImageSeries = chart.series.push(new am4maps.MapImageSeries());

  const imageSeriesTemplate = mapImageSeries.mapImages.template;
  const circle = imageSeriesTemplate.createChild(am4core.Circle);
  circle.radius = 10;
  circle.fill = am4core.color('#ff0000');
  circle.stroke = am4core.color('#FFFFFF');
  circle.strokeWidth = 2;
  circle.nonScaling = true;
  circle.tooltipText = 'hi';
  imageSeriesTemplate.propertyFields.latitude = 'latitude';
  imageSeriesTemplate.propertyFields.longitude = 'longitude';
  mapImageSeries.data = { latitude: demoAddress.my_lat, longitude: demoAddress.my_lng };
  return chart;
}




