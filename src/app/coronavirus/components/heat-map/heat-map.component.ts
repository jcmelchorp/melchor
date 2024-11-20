import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

@Component({
  selector: 'app-heat-map',
  templateUrl: './heat-map.component.html',
  styleUrls: ['./heat-map.component.scss']
})
export class HeatMapComponent implements OnInit, AfterViewInit {
  @Input() countries: any[];
  //@Input() countryname: string;
  caseSelected: string;
  world: any[];
  constructor() { }
  ngOnInit(): void {
    this.caseSelected = "deaths";
    this.world = this.countries.map(country => {
      return {
        ...country,
        value: country[this.caseSelected]
      }
    })

  }
  ngAfterViewInit(): void {
    am4core.useTheme(am4themes_animated);

    var chart = am4core.create("chartdiv", am4maps.MapChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.geodata = am4geodata_worldLow;
    chart.projection = new am4maps.projections.Miller();

    var title = chart.chartContainer.createChild(am4core.Label);
    title.text = "Life expectancy in the World";
    title.fontSize = 20;
    title.paddingTop = 30;
    title.align = "center";
    title.zIndex = 100;

    var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    var polygonTemplate = polygonSeries.mapPolygons.template;
    polygonSeries.mapPolygons.template.tooltipText = "{name}: {value}";
    polygonSeries.heatRules.push({
      property: "fill",
      target: polygonSeries.mapPolygons.template,
      min: am4core.color("rgb(245,245,00)"),
      max: am4core.color("rgb(45,45,00)")
    });
    polygonSeries.useGeodata = true;
    polygonSeries.dataFields.id = "id";
    polygonSeries.dataFields.value = "value";
    // add heat legend
    var heatLegend = chart.chartContainer.createChild(am4maps.HeatLegend);
    heatLegend.valign = "bottom";
    heatLegend.align = "left";
    heatLegend.width = am4core.percent(100);
    heatLegend.series = polygonSeries;
    heatLegend.orientation = "horizontal";
    heatLegend.padding(20, 20, 20, 20);
    heatLegend.valueAxis.renderer.labels.template.fontSize = 10;
    heatLegend.valueAxis.renderer.minGridDistance = 40;

    polygonSeries.mapPolygons.template.events.on("over", event => {
      handleHover(event.target);
    });

    polygonSeries.mapPolygons.template.events.on("hit", event => {
      handleHover(event.target);
    });

    function handleHover(mapPolygon) {
      if (mapPolygon.dataItem.value) {
        heatLegend.valueAxis.showTooltipAt(mapPolygon.dataItem.value);
      } else {
        heatLegend.valueAxis.hideTooltip();
      }
    }

    polygonSeries.mapPolygons.template.strokeOpacity = 0.4;
    polygonSeries.mapPolygons.template.events.on("out", event => {
      heatLegend.valueAxis.hideTooltip();
    });

    chart.zoomControl = new am4maps.ZoomControl();
    chart.zoomControl.valign = "top";
    polygonSeries.data = this.world;
    console.log(polygonSeries.data)
  }

}
