import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_worldHigh from '@amcharts/amcharts4-geodata/worldHigh';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';
import am4geodata_data_countries2 from '@amcharts/amcharts4-geodata/data/countries2';
import am4geodata_lang_ES from '@amcharts/amcharts4-geodata/lang/ES';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
@Component({
  selector: 'app-drill-down',
  templateUrl: './drill-down.component.html',
  styleUrls: ['./drill-down.component.scss']
})
export class DrillDownComponent implements AfterViewInit {
  @Input() countries: any[];

  constructor() { }

  ngAfterViewInit(): void {
    am4core.useTheme(am4themes_animated);
    var continents = {
      "AF": 0,
      "AN": 1,
      "AS": 2,
      "EU": 3,
      "NA": 4,
      "OC": 5,
      "SA": 6
    }
    // Create map instance
    var chart = am4core.create("chartdiv", am4maps.MapChart);
    chart.projection = new am4maps.projections.Miller();

    // Create map polygon series for world map
    var worldSeries = chart.series.push(new am4maps.MapPolygonSeries());
    worldSeries.useGeodata = true;
    worldSeries.geodata = am4geodata_worldLow;
    worldSeries.exclude = ["AQ"];
    worldSeries.data = this.countries;

    var worldPolygon = worldSeries.mapPolygons.template;
    worldPolygon.tooltipText = "{name}";
    worldPolygon.nonScalingStroke = true;
    worldPolygon.strokeOpacity = 0.5;
    worldPolygon.fill = am4core.color("#eee");
    worldPolygon.propertyFields.fill = "color";

    var hs = worldPolygon.states.create("hover");
    hs.properties.fill = chart.colors.getIndex(9);


    // Create country specific series (but hide it for now)
    var countrySeries = chart.series.push(new am4maps.MapPolygonSeries());
    countrySeries.useGeodata = true;
    countrySeries.hide();
    countrySeries.geodataSource.events.on("done", (ev) => {
      worldSeries.hide();
      countrySeries.show();
    });

    var countryPolygon = countrySeries.mapPolygons.template;
    countryPolygon.tooltipText = "{name}";
    countryPolygon.nonScalingStroke = true;
    countryPolygon.strokeOpacity = 0.5;
    countryPolygon.fill = am4core.color("#eee");

    var hs = countryPolygon.states.create("hover");
    hs.properties.fill = chart.colors.getIndex(9);

    // Set up click events
    worldPolygon.events.on("hit", (ev) => {
      ev.target.series.chart.zoomToMapObject(ev.target);
      var map = ev.target.dataItem.dataContext['map'];
      if (map) {
        ev.target.isHover = false;
        countrySeries.geodataSource.url = "https://www.amcharts.com/lib/4/geodata/json/" + map + ".json";
        countrySeries.geodataSource.load();
      }
    });

    // Set up data for countries
    var data = [];
    for (var id in am4geodata_data_countries2) {
      if (am4geodata_data_countries2.hasOwnProperty(id)) {
        var country = am4geodata_data_countries2[id];
        if (country.maps.length) {
          data.push({
            id: id,
            color: chart.colors.getIndex(continents[country.continent_code]),
            map: country.maps[0]
          });
        }
      }
    }
    worldSeries.data = data;

    // Zoom control
    chart.zoomControl = new am4maps.ZoomControl();

    var homeButton = new am4core.Button();
    homeButton.events.on("hit", function () {
      worldSeries.show();
      countrySeries.hide();
      chart.goHome();
    });

    homeButton.icon = new am4core.Sprite();
    homeButton.padding(7, 5, 7, 5);
    homeButton.width = 30;
    homeButton.icon.path = "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
    homeButton.marginBottom = 10;
    homeButton.parent = chart.zoomControl;
    homeButton.insertBefore(chart.zoomControl.plusButton);

  }
}


