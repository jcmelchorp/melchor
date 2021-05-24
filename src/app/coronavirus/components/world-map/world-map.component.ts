import { waitForAsync } from '@angular/core/testing';
import { Component, Input, OnInit, AfterViewInit, Inject, PLATFORM_ID, OnDestroy, NgZone, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_worldHigh from '@amcharts/amcharts4-geodata/worldHigh';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';
import am4geodata_data_countries2 from '@amcharts/amcharts4-geodata/data/countries2';
import am4geodata_lang_ES from '@amcharts/amcharts4-geodata/lang/ES';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

import { Country } from '../../models/coronavirus.model';
import { Cases, FullCountry } from './../../models/country.model';

@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.scss'],
})
export class WorldMapComponent implements AfterViewInit,/* OnChanges, */ OnInit {
  @Input() country: FullCountry
  @Input() countries: FullCountry[];
  bubbleSeries: am4maps.MapImageSeries;
  mapChart: am4maps.MapChart;
  polygonSeries: am4maps.MapPolygonSeries;
  currentCountry: string;
  countryName: am4core.Label;
  currentDate: Date;
  currentPolygon: any;
  dateAxis: am4charts.DateAxis;
  lineChart: am4charts.XYChart;
  valueAxis: am4charts.ValueAxis;
  countryDataTimeout: any;
  perCapita: boolean;
  max: { confirmed: number; recovered: number; deaths: number; active: number; };
  maxPC: { confirmed: number; recovered: number; deaths: number; active: number; };
  currentType: any;
  currentIndex: any;
  numberFormatter: any;
  currentTypeName: string;
  buttonsAndChartContainer: am4core.Container;
  buttonsContainer: am4core.Container;
  buttons: { active: any; confirmed: any; recovered: any; deaths: any; };
  nameAndButtonsContainer: am4core.Container;
  backgroundColor: am4core.Color | am4core.Pattern | am4core.LinearGradient | am4core.RadialGradient;
  activeColor: am4core.Color;
  recoveredColor: am4core.Color;
  deathsColor: am4core.Color;
  confirmedColor: am4core.Color;
  countryIndexMap: [];
  mapGlobeSwitch: am4core.SwitchButton;
  colors: { active: am4core.Color; confirmed: am4core.Color; recovered: am4core.Color; deaths: am4core.Color; };
  countryColor: am4core.Color;
  buttonStrokeColor: am4core.Color;
  countryStrokeColor: am4core.Color;
  countryHoverColor: am4core.Color;
  activeCountryColor: am4core.Color;
  playButton: am4core.PlayButton;
  slider: am4core.Slider;
  sliderAnimation: any;
  series: am4charts.LineSeries;
  bullet: am4charts.CircleBullet;
  seriesTypeSwitch: am4core.SwitchButton;
  columnSeries: any;
  col_series: am4charts.ColumnSeries;
  button: am4core.Button;
  lastDate: Date;
  circle: am4core.Circle;
  circleActiveState: am4core.SpriteState<am4core.ICircleProperties, am4core.ICircleAdapters>;
  currentSeries: any;
  activeButton: any;
  activeHoverState: am4core.SpriteState<am4core.IRoundedRectangleProperties, am4core.IRoundedRectangleAdapters>;
  circleHoverState: am4core.SpriteState<am4core.ICircleProperties, am4core.ICircleAdapters>;
  polygonTemplate: am4maps.MapPolygon;
  absolutePerCapitaSwitch: am4core.SwitchButton;
  activeSeries: am4charts.LineSeries;
  label: am4core.Label;
  image: am4maps.MapImage;
  animation: am4core.Animation;
  population: number;
  imageTemplate: am4maps.MapImage;
  imageHoverState: am4core.SpriteState<am4maps.IMapImageProperties, am4maps.IMapImageAdapters>;
  container: am4core.Container;
  sliderContainer: am4core.Container;
  chartAndSliderContainer: am4core.Container;
  sizeSlider: am4core.Slider;
  title: am4core.Label;
  polygonActiveState: am4core.SpriteState<am4maps.IMapPolygonProperties, am4maps.IMapPolygonAdapters>;
  polygonHoverState: am4core.SpriteState<am4maps.IMapPolygonProperties, am4maps.IMapPolygonAdapters>;
  filterSlider: am4core.Slider;
  sizeLabel: am4core.Label;
  filterLabel: am4core.Label;
  /* ngOnChanges(changes: SimpleChanges): void {
    const index = changes.countries.currentValue.findIndex(c => c.name == changes.country.currentValue.name)
    changes.countries.currentValue[index] = changes.country.currentValue;
  }
 */
  constructor(private _ngZone: NgZone) { }
  ngOnInit(): void { }
  ngAfterViewInit(): void {

    this.currentCountry = this.country.name;

    am4core.useTheme(am4themes_animated);
    this.numberFormatter = new am4core.NumberFormatter();

    this.backgroundColor = am4core.color("#444");
    this.activeColor = am4core.color("#ff8726");
    this.confirmedColor = am4core.color("#1c5fe5");
    this.recoveredColor = am4core.color("#45d21a");
    this.deathsColor = am4core.color("#d21a1a");

    // for an easier access by key
    this.colors = { active: this.activeColor, confirmed: this.confirmedColor, recovered: this.recoveredColor, deaths: this.deathsColor };

    this.countryColor = am4core.color("#21563b");
    this.countryStrokeColor = am4core.color("#000000");
    this.buttonStrokeColor = am4core.color("#ffffff");
    this.countryHoverColor = am4core.color("#888");
    this.activeCountryColor = am4core.color("#0f0f0f");

    this.currentIndex;
    // last date of the data
    this.lastDate = new Date(this.country.history[this.country.history.length - 1].date);
    this.currentDate = this.lastDate;
    this.perCapita = false;

    //////////////////////////////////////////////////////////////////////////////
    // PREPARE DATA
    //////////////////////////////////////////////////////////////////////////////

    // make a map of country indexes for later use
    this.countryIndexMap = [];
    this.countries.forEach((country, i) => {
      this.countryIndexMap[country.name] = i;
    })



    // get slide data
    /*  function getSlideData(index?) {
       if (index == undefined) {
         index = this.country.history.length - 1
       }
       var data = this.country.history[index];
       return data
     } */

    //var slideData = getSlideData()
    // as we will be modifying raw data, make a copy
    var mapData = JSON.parse(JSON.stringify(this.countries));

    // remove items with 0 values for better performance
    for (var i = mapData.length - 1; i >= 0; i--) {
      if (mapData[i].confirmed == 0) {
        mapData.splice(i, 1);
      }
    }


    this.max = { confirmed: 0, recovered: 0, deaths: 0, active: 0 };
    this.maxPC = { confirmed: 0, recovered: 0, deaths: 0, active: 0 };

    // the last day will have most
    for (var i = 0; i < mapData.length; i++) {
      var di = mapData[i];
      if (di.confirmed > this.max.confirmed) {
        this.max.confirmed = di.confirmed;
      }
      if (di.recovered > this.max.recovered) {
        this.max.recovered = di.recovered;
      }
      if (di.deaths > this.max.deaths) {
        this.max.deaths = di.deaths
      }
      this.max.active = this.max.confirmed;
    }

    // END OF DATA

    //////////////////////////////////////////////////////////////////////////////
    // LAYOUT & CHARTS
    //////////////////////////////////////////////////////////////////////////////

    // main container
    // https://www.amcharts.com/docs/v4/concepts/svg-engine/containers/
    this.container = am4core.create("chartdiv", am4core.Container);
    this.container.width = am4core.percent(100);
    this.container.height = am4core.percent(100);

    this.container.tooltip = new am4core.Tooltip();
    this.container.tooltip.background.fill = am4core.color("#000000");
    this.container.tooltip.background.stroke = this.activeColor;
    this.container.tooltip.fontSize = "0.9em";
    this.container.tooltip.getFillFromObject = false;
    this.container.tooltip.getStrokeFromObject = false;

    // MAP CHART
    // https://www.amcharts.com/docs/v4/chart-types/map/
    this.mapChart = this.container.createChild(am4maps.MapChart);
    this.mapChart.height = am4core.percent(60);
    this.mapChart.zoomControl = new am4maps.ZoomControl();
    this.mapChart.zoomControl.align = "right";
    this.mapChart.zoomControl.marginRight = 15;
    this.mapChart.zoomControl.valign = "middle";
    this.mapChart.homeGeoPoint = { longitude: 0, latitude: -2 };

    // by default minus button zooms out by one step, but we modify the behavior so when user clicks on minus, the map would fully zoom-out and show world data
    this.mapChart.zoomControl.minusButton.events.on("hit", this.showWorld);
    // clicking on a "sea" will also result a full zoom-out
    this.mapChart.seriesContainer.background.events.on("hit", this.showWorld);
    this.mapChart.seriesContainer.background.events.on("over", this.resetHover);
    this.mapChart.seriesContainer.background.fillOpacity = 0;
    this.mapChart.zoomEasing = am4core.ease.sinOut;

    // https://www.amcharts.com/docs/v4/chart-types/map/#Map_data
    // you can use more accurate world map or map of any other country - a wide selection of maps available at: https://github.com/amcharts/amcharts4-geodata
    this.mapChart.geodata = am4geodata_worldLow;

    // Set projection
    // https://www.amcharts.com/docs/v4/chart-types/map/#Setting_projection
    // instead of Miller, you can use Mercator or many other projections available: https://www.amcharts.com/demos/map-using-d3-projections/
    this.mapChart.projection = new am4maps.projections.Miller();
    this.mapChart.panBehavior = "move";

    // when map is globe, beackground is made visible
    this.mapChart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 0.05;
    this.mapChart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color("#ffffff");
    this.mapChart.backgroundSeries.hidden = true;


    // Map polygon series (defines how country areas look and behave)
    this.polygonSeries = this.mapChart.series.push(new am4maps.MapPolygonSeries());
    this.polygonSeries.dataFields.id = "id";
    this.polygonSeries.dataFields.value = "confirmedPC";
    this.polygonSeries.interpolationDuration = 0;

    this.polygonSeries.exclude = ["AQ"]; // Antarctica is excluded in non-globe projection
    this.polygonSeries.useGeodata = true;
    this.polygonSeries.nonScalingStroke = true;
    this.polygonSeries.strokeWidth = 0.5;
    // this helps to place bubbles in the visual middle of the area
    this.polygonSeries.calculateVisualCenter = true;
    this.polygonSeries.data = mapData;

    this.polygonTemplate = this.polygonSeries.mapPolygons.template;
    this.polygonTemplate.fill = this.countryColor;
    this.polygonTemplate.fillOpacity = 0.5;
    this.polygonTemplate.stroke = this.countryStrokeColor;
    this.polygonTemplate.strokeOpacity = 0.15
    this.polygonTemplate.setStateOnChildren = true;
    this.polygonTemplate.tooltipPosition = "fixed";

    this.polygonTemplate.events.on("hit", this.handleCountryHit);
    this.polygonTemplate.events.on("over", this.handleCountryOver);
    this.polygonTemplate.events.on("out", this.handleCountryOut);


    this.polygonSeries.heatRules.push({
      target: this.polygonTemplate,
      property: "fill",
      min: this.countryColor,
      max: this.countryColor,
      dataField: "value"
    })



    // you can have pacific - centered map if you set this to -154.8
    this.mapChart.deltaLongitude = -8;

    // polygon states
    this.polygonHoverState = this.polygonTemplate.states.create("hover");
    this.polygonHoverState.transitionDuration = 1400;
    this.polygonHoverState.properties.fill = this.countryHoverColor;

    this.polygonActiveState = this.polygonTemplate.states.create("active")
    this.polygonActiveState.properties.fill = this.activeCountryColor;

    // Bubble series
    this.bubbleSeries = this.mapChart.series.push(new am4maps.MapImageSeries());
    this.bubbleSeries.data = JSON.parse(JSON.stringify(mapData));

    this.bubbleSeries.dataFields.value = "confirmed";
    this.bubbleSeries.dataFields.id = "id";

    // adjust tooltip
    this.bubbleSeries.tooltip.animationDuration = 0;
    this.bubbleSeries.tooltip.showInViewport = false;
    this.bubbleSeries.tooltip.background.fillOpacity = 0.2;
    this.bubbleSeries.tooltip.getStrokeFromObject = true;
    this.bubbleSeries.tooltip.getFillFromObject = false;
    this.bubbleSeries.tooltip.background.fillOpacity = 0.2;
    this.bubbleSeries.tooltip.background.fill = am4core.color("#055595");

    this.imageTemplate = this.bubbleSeries.mapImages.template;
    // if you want bubbles to become bigger when zoomed, set this to false
    this.imageTemplate.nonScaling = true;
    this.imageTemplate.strokeOpacity = 0;
    this.imageTemplate.fillOpacity = 0.55;
    this.imageTemplate.tooltipText = "{name}: [bold]{value}[/]";
    this.imageTemplate.applyOnClones = true;

    this.imageTemplate.events.on("over", this.handleImageOver);
    this.imageTemplate.events.on("out", this.handleImageOut);
    this.imageTemplate.events.on("hit", this.handleImageHit);

    // this is needed for the tooltip to point to the top of the circle instead of the middle
    this.imageTemplate.adapter.add("tooltipY", (tooltipY, target) => {
      return -target.children.getIndex(0)['radius']
    })

    // When hovered, circles become non-opaque
    this.imageHoverState = this.imageTemplate.states.create("hover");
    this.imageHoverState.properties.fillOpacity = 1;

    // add circle inside the image
    this.circle = this.imageTemplate.createChild(am4core.Circle);
    // this makes the circle to pulsate a bit when showing it
    this.circle.hiddenState.properties.scale = 0.0001;
    this.circle.hiddenState.transitionDuration = 2000;
    this.circle.defaultState.transitionDuration = 2000;
    this.circle.defaultState.transitionEasing = am4core.ease.elasticOut;
    // later we set fill color on template (when changing what type of data the map should show) and all the clones get the color because of this
    this.circle.applyOnClones = true;

    // heat rule makes the bubbles to be of a different width. Adjust min/max for smaller/bigger radius of a bubble
    this.bubbleSeries.heatRules.push({
      target: this.circle,
      property: "radius",
      min: 3,
      max: 30,
      dataField: "value"
    })

    // when data items validated, hide 0 value bubbles (because min size is set)
    this.bubbleSeries.events.on("dataitemsvalidated", () => {
      this.bubbleSeries.dataItems.each((dataItem) => {
        var mapImage = dataItem.mapImage;
        var circle = mapImage.children.getIndex(0);
        if (mapImage.dataItem.value == 0) {
          circle.hide(0);
        }
        else if (circle.isHidden || circle.isHiding) {
          circle.show();
        }
      })
    })

    // this places bubbles at the visual center of a country
    this.imageTemplate.adapter.add("latitude", (latitude, target) => {
      var polygon = this.polygonSeries.getPolygonById(target.dataItem.id);
      if (polygon) {
        target.disabled = false;
        return polygon.visualLatitude;
      }
      else {
        target.disabled = true;
      }
      return latitude;
    })

    this.imageTemplate.adapter.add("longitude", (longitude, target) => {
      var polygon = this.polygonSeries.getPolygonById(target.dataItem.id);
      if (polygon) {
        target.disabled = false;
        return polygon.visualLongitude;
      }
      else {
        target.disabled = true;
      }
      return longitude;
    })

    // END OF MAP

    // top title
    this.title = this.mapChart.titles.create();
    this.title.fontSize = "1.5em";
    this.title.text = "COVID-19 World Spread Data";
    this.title.align = "left";
    this.title.horizontalCenter = "left";
    this.title.marginLeft = 20;
    this.title.paddingBottom = 10;
    this.title.fill = am4core.color("#888888");
    this.title.y = 20;

    // switch between map and globe
    this.mapGlobeSwitch = this.mapChart.createChild(am4core.SwitchButton);
    this.mapGlobeSwitch.align = "right"
    this.mapGlobeSwitch.y = 15;
    this.mapGlobeSwitch.leftLabel.text = "Mapa";
    this.mapGlobeSwitch.leftLabel.fill = am4core.color("#000");
    this.mapGlobeSwitch.rightLabel.fill = am4core.color("#000");
    this.mapGlobeSwitch.rightLabel.text = "Globo";
    this.mapGlobeSwitch.verticalCenter = "top";


    this.mapGlobeSwitch.events.on("toggled", () => {
      if (this.mapGlobeSwitch.isActive) {
        this.mapChart.projection = new am4maps.projections.Orthographic;
        this.mapChart.backgroundSeries.show();
        this.mapChart.panBehavior = "rotateLongLat";
        this.polygonSeries.exclude = [];
      } else {
        this.mapChart.projection = new am4maps.projections.Miller;
        this.mapChart.backgroundSeries.hide();
        this.mapChart.panBehavior = "move";
        this.removeAntarctica(mapData);
        this.polygonSeries.data = this.countries;

        this.polygonSeries.exclude = ["AQ"];
      }
    })


    // switch between map and globe
    this.absolutePerCapitaSwitch = this.mapChart.createChild(am4core.SwitchButton);
    this.absolutePerCapitaSwitch.align = "center"
    this.absolutePerCapitaSwitch.y = 15;
    this.absolutePerCapitaSwitch.leftLabel.text = "Absolute";
    this.absolutePerCapitaSwitch.leftLabel.fill = am4core.color("#000");
    this.absolutePerCapitaSwitch.rightLabel.fill = am4core.color("#000");
    this.absolutePerCapitaSwitch.rightLabel.text = "Per Capita";
    this.absolutePerCapitaSwitch.rightLabel.interactionsEnabled = true;
    this.absolutePerCapitaSwitch.rightLabel.tooltipText = "When calculating max value, countries with population less than 100.000 are not included."
    this.absolutePerCapitaSwitch.verticalCenter = "top";


    this.absolutePerCapitaSwitch.events.on("toggled", () => {
      if (this.absolutePerCapitaSwitch.isActive) {
        this.bubbleSeries.hide(0);
        this.perCapita = true;
        this.bubbleSeries.interpolationDuration = 0;
        this.polygonSeries.heatRules.getIndex(0).max = this.colors[this.currentType];
        this.polygonSeries.heatRules.getIndex(0).maxValue = this.maxPC[this.currentType];
        this.polygonSeries.mapPolygons.template.applyOnClones = true;

        this.sizeSlider.hide()
        this.filterSlider.hide();
        this.sizeLabel.hide();
        this.filterLabel.hide();

        this.updateCountryTooltip();

      } else {
        this.perCapita = false;
        this.polygonSeries.interpolationDuration = 0;
        this.bubbleSeries.interpolationDuration = 1000;
        this.bubbleSeries.show();
        this.polygonSeries.heatRules.getIndex(0).max = this.countryColor;
        this.polygonSeries.mapPolygons.template.tooltipText = undefined;
        this.sizeSlider.show()
        this.filterSlider.show();
        this.sizeLabel.show();
        this.filterLabel.show();
      }
      this.polygonSeries.mapPolygons.each(mapPolygon => {
        mapPolygon.fill = mapPolygon.fill;
        mapPolygon.defaultState.properties.fill = undefined;
      })
    })


    // buttons & chart container
    this.buttonsAndChartContainer = this.container.createChild(am4core.Container);
    this.buttonsAndChartContainer.layout = "vertical";
    this.buttonsAndChartContainer.height = am4core.percent(65); // make this bigger if you want more space for the chart
    this.buttonsAndChartContainer.width = am4core.percent(100);
    this.buttonsAndChartContainer.valign = "bottom";

    // country name and buttons container
    this.nameAndButtonsContainer = this.buttonsAndChartContainer.createChild(am4core.Container)
    this.nameAndButtonsContainer.width = am4core.percent(100);
    this.nameAndButtonsContainer.padding(0, 10, 5, 20);
    this.nameAndButtonsContainer.layout = "horizontal";

    // name of a country and date label
    this.countryName = this.nameAndButtonsContainer.createChild(am4core.Label);
    this.countryName.fontSize = "1.1em";
    this.countryName.fill = am4core.color("#000");
    this.countryName.valign = "middle";

    // buttons container (active/confirmed/recovered/deaths)
    this.buttonsContainer = this.nameAndButtonsContainer.createChild(am4core.Container);
    this.buttonsContainer.layout = "grid";
    this.buttonsContainer.width = am4core.percent(100);
    this.buttonsContainer.x = 10;
    this.buttonsContainer.contentAlign = "right";

    // Chart & slider container
    this.chartAndSliderContainer = this.buttonsAndChartContainer.createChild(am4core.Container);
    this.chartAndSliderContainer.layout = "vertical";
    this.chartAndSliderContainer.height = am4core.percent(100);
    this.chartAndSliderContainer.width = am4core.percent(100);
    this.chartAndSliderContainer.background = new am4core.RoundedRectangle();
    this.chartAndSliderContainer.background.fill = am4core.color("#ffffff");
    //this.chartAndSliderContainer.background.cornerRadius(30, 30, 0, 0);
    this.chartAndSliderContainer.background.fillOpacity = 0.25;
    this.chartAndSliderContainer.paddingTop = 12;
    this.chartAndSliderContainer.paddingBottom = 0;

    // Slider container
    this.sliderContainer = this.chartAndSliderContainer.createChild(am4core.Container);
    this.sliderContainer.width = am4core.percent(100);
    this.sliderContainer.padding(0, 15, 15, 10);
    this.sliderContainer.layout = "horizontal";

    this.slider = this.sliderContainer.createChild(am4core.Slider);
    this.slider.width = am4core.percent(100);
    this.slider.valign = "middle";
    this.slider.background.opacity = 0.4;
    this.slider.opacity = 0.7;
    this.slider.background.fill = am4core.color("#000");
    this.slider.marginLeft = 20;
    this.slider.marginRight = 35;
    this.slider.height = 10;
    this.slider.start = 1;


    // what to do when slider is dragged
    /*  slider.events.on("rangechanged", (event) => {
       var index = Math.round((mapData[this.currentCountry].history.length - 1) * slider.start);
       updateMapData(mapData[this.currentCountry].history[index]);
       updateTotals(index);
     }) */
    // stop animation if dragged
    this.slider.startGrip.events.on("drag", () => {
      this.stop();
      if (this.sliderAnimation) {
        this.sliderAnimation.setProgress(this.slider.start);
      }
    });

    // play button
    this.playButton = this.sliderContainer.createChild(am4core.PlayButton);
    this.playButton.valign = "middle";
    // play button behavior
    this.playButton.events.on("toggled", (event) => {
      if (event.target.isActive) {
        this.play();
      } else {
        this.stop();
      }
    })
    // make slider grip look like play button
    this.slider.startGrip.background.fill = this.playButton.background.fill;
    this.slider.startGrip.background.strokeOpacity = 0;
    this.slider.startGrip.icon.stroke = am4core.color("#000");
    this.slider.startGrip.background.states.copyFrom(this.playButton.background.states)


    // bubble size slider
    this.sizeSlider = this.container.createChild(am4core.Slider);
    this.sizeSlider.orientation = "horizontal";
    this.sizeSlider.width = am4core.percent(20);
    this.sizeSlider.marginLeft = 25;
    this.sizeSlider.align = "left";
    this.sizeSlider.valign = "top";
    this.sizeSlider.verticalCenter = "middle";
    this.sizeSlider.opacity = 0.7;
    this.sizeSlider.background.fill = am4core.color("#000");
    this.sizeSlider.adapter.add("y", (y, target) => {
      return this.container.pixelHeight * (1 - this.buttonsAndChartContainer.percentHeight / 100) * 0.25;
    })

    this.sizeSlider.startGrip.background.fill = this.activeColor;
    this.sizeSlider.startGrip.background.fillOpacity = 0.8;
    this.sizeSlider.startGrip.background.strokeOpacity = 0;
    this.sizeSlider.startGrip.icon.stroke = am4core.color("#888");
    this.sizeSlider.startGrip.background.states.getKey("hover").properties.fill = this.activeColor;
    this.sizeSlider.startGrip.background.states.getKey("down").properties.fill = this.activeColor;
    this.sizeSlider.horizontalCenter = "middle";


    this.sizeSlider.events.on("rangechanged", () => {
      this.sizeSlider.startGrip.scale = 0.75 + this.sizeSlider.start;
      this.bubbleSeries.heatRules.getIndex(0).max = 30 + this.sizeSlider.start * 100;
      this.circle.clones.each((clone) => {
        clone.radius = clone.radius;
      })
    })


    this.sizeLabel = this.container.createChild(am4core.Label);
    this.sizeLabel.text = "max bubble size *";
    this.sizeLabel.fill = am4core.color("#555");
    this.sizeLabel.rotation = 90;
    this.sizeLabel.fontSize = "10px";
    this.sizeLabel.fillOpacity = 0.8;
    this.sizeLabel.horizontalCenter = "middle";
    this.sizeLabel.align = "left"
    this.sizeLabel.paddingBottom = 40;
    this.sizeLabel.tooltip.setBounds({ x: 0, y: 0, width: 200000, height: 200000 })
    this.sizeLabel.tooltip.label.wrap = true;
    this.sizeLabel.tooltip.label.maxWidth = 300;
    this.sizeLabel.tooltipText = "Some countries have so many cases that bubbles for countries with smaller values often look the same even if there is a significant difference between them. This slider can be used to increase maximum size of a bubble so that when you zoom in to a region with relatively small values you could compare them anyway."
    this.sizeLabel.fill = am4core.color("#555");

    this.sizeLabel.adapter.add("y", (y, target) => {
      return this.container.pixelHeight * (1 - this.buttonsAndChartContainer.percentHeight / 100) * 0.25;
    })

    // filter slider

    // bubble size slider
    this.filterSlider = this.container.createChild(am4core.Slider);
    this.filterSlider.orientation = "horizontal";
    this.filterSlider.height = am4core.percent(20);
    this.filterSlider.marginLeft = 25;
    this.filterSlider.align = "left";
    this.filterSlider.valign = "top";
    this.filterSlider.verticalCenter = "middle";
    this.filterSlider.opacity = 0.7;
    this.filterSlider.background.fill = am4core.color("#999");
    this.filterSlider.adapter.add("y", (y, target) => {
      return this.container.pixelHeight * (1 - this.buttonsAndChartContainer.percentHeight / 100) * 0.7;
    })

    this.filterSlider.startGrip.background.fill = this.activeColor;
    this.filterSlider.startGrip.background.fillOpacity = 0.8;
    this.filterSlider.startGrip.background.strokeOpacity = 0;
    this.filterSlider.startGrip.icon.stroke = am4core.color("#444");
    this.filterSlider.startGrip.background.states.getKey("hover").properties.fill = this.activeColor;
    this.filterSlider.startGrip.background.states.getKey("down").properties.fill = this.activeColor;
    this.filterSlider.horizontalCenter = "middle";
    this.filterSlider.start = 1;


    this.filterSlider.events.on("rangechanged", () => {
      var maxValue = this.max[this.currentType] * this.filterSlider.start + 1;
      if (!isNaN(maxValue) && this.bubbleSeries.inited) {
        this.bubbleSeries.heatRules.getIndex(0).maxValue = maxValue;
        this.circle.clones.each(clone => {
          if (clone.dataItem.getValue('value') > maxValue) {
            clone.dataItem.hide();
          }
          else {
            clone.dataItem.show();
          }
          clone.radius = clone.radius;
        })
      }
    })


    this.filterLabel = this.container.createChild(am4core.Label);
    this.filterLabel.text = "filter max values *";
    this.filterLabel.rotation = 90;
    this.filterLabel.fontSize = "10px";
    this.filterLabel.fill = am4core.color("#9b8a48");
    this.filterLabel.fontSize = "0.8em";
    this.filterLabel.fillOpacity = 0.5;
    this.filterLabel.horizontalCenter = "middle";
    this.filterLabel.align = "left"
    this.filterLabel.paddingBottom = 40;
    this.filterLabel.tooltip.label.wrap = true;
    this.filterLabel.tooltip.label.maxWidth = 300;
    this.filterLabel.tooltipText = "This filter allows to remove countries with many cases from the map so that it would be possible to compare countries with smaller number of cases."
    this.filterLabel.fill = am4core.color("#2ebb9a");

    this.filterLabel.adapter.add("y", (y, target) => {
      return this.container.pixelHeight * (1 - this.buttonsAndChartContainer.percentHeight / 100) * 0.7;
    })





    // BOTTOM CHART
    // https://www.amcharts.com/docs/v4/chart-types/xy-chart/
    this.lineChart = this.chartAndSliderContainer.createChild(am4charts.XYChart);
    this.lineChart.fontSize = "0.8em";
    this.lineChart.paddingRight = 30;
    this.lineChart.paddingLeft = 30;
    this.lineChart.maskBullets = false;
    this.lineChart.zoomOutButton.disabled = true;
    this.lineChart.paddingBottom = 5;
    this.lineChart.paddingTop = 3;

    // make a copy of data as we will be modifying it
    this.lineChart.data = JSON.parse(JSON.stringify(this.countries));

    // date axis
    // https://www.amcharts.com/docs/v4/concepts/axes/date-axis/
    this.dateAxis = this.lineChart.xAxes.push(new am4charts.DateAxis());
    this.dateAxis.renderer.minGridDistance = 50;
    this.dateAxis.renderer.grid.template.stroke = am4core.color("#000000");
    this.dateAxis.renderer.grid.template.strokeOpacity = 0.25;
    this.dateAxis.max = this.lastDate.getTime() + am4core.time.getDuration("day", 5);
    this.dateAxis.tooltip.label.fontSize = "0.8em";
    this.dateAxis.tooltip.background.fill = this.activeColor;
    this.dateAxis.tooltip.background.stroke = this.activeColor;
    this.dateAxis.renderer.labels.template.fill = am4core.color("#000");

    /*  this.dateAxis.renderer.labels.template.adapter.add("fillOpacity", (fillOpacity, target) => {
       return this.dateAxis.valueToPosition(target.dataItem["value"]) + 0.1;
     }) */

    // value axis
    // https://www.amcharts.com/docs/v4/concepts/axes/value-axis/
    this.valueAxis = this.lineChart.yAxes.push(new am4charts.ValueAxis());
    this.valueAxis.renderer.opposite = true;
    this.valueAxis.interpolationDuration = 3000;
    this.valueAxis.renderer.grid.template.stroke = am4core.color("#000000");
    this.valueAxis.renderer.grid.template.strokeOpacity = 0.25;
    this.valueAxis.renderer.minGridDistance = 30;
    this.valueAxis.renderer.maxLabelPosition = 0.98;
    //this.valueAxis.renderer.baseGrid.disabled = true;
    this.valueAxis.tooltip.disabled = true;
    this.valueAxis.extraMax = 0.05;
    this.valueAxis.maxPrecision = 0;
    this.valueAxis.renderer.inside = true;
    this.valueAxis.renderer.labels.template.verticalCenter = "bottom";
    this.valueAxis.renderer.labels.template.fill = am4core.color("#222");
    this.valueAxis.renderer.labels.template.padding(2, 2, 2, 2);
    this.valueAxis.adapter.add("max", (max, target) => {
      if (max < 5) {
        max = 5
      }
      return max;
    })

    this.valueAxis.adapter.add("min", (min, target) => {
      if (!this.seriesTypeSwitch.isActive) {
        if (min < 0) {
          min = 0;
        }
      }
      return min;
    })

    // cursor
    // https://www.amcharts.com/docs/v4/concepts/chart-cursor/
    this.lineChart.cursor = new am4charts.XYCursor();
    this.lineChart.cursor.maxTooltipDistance = 0;
    this.lineChart.cursor.behavior = "none"; // set zoomX for a zooming possibility
    this.lineChart.cursor.lineY.disabled = true;
    this.lineChart.cursor.lineX.stroke = this.activeColor;
    this.lineChart.cursor.xAxis = this.dateAxis;
    // this prevents cursor to move to the clicked location while map is dragged
    am4core.getInteraction().body.events.off("down", this.lineChart.cursor.handleCursorDown, this.lineChart.cursor)
    am4core.getInteraction().body.events.off("up", this.lineChart.cursor.handleCursorUp, this.lineChart.cursor)

    // legend
    // https://www.amcharts.com/docs/v4/concepts/legend/
    this.lineChart.legend = new am4charts.Legend();
    this.lineChart.legend.parent = this.lineChart.plotContainer;
    this.lineChart.legend.labels.template.fill = am4core.color("#888");
    this.lineChart.legend.markers.template.height = 8;
    this.lineChart.legend.contentAlign = "left";
    //this.lineChart.legend.fontSize = "10px";
    this.lineChart.legend.itemContainers.template.valign = "middle";
    var legendDown = false;
    this.lineChart.legend.itemContainers.template.events.on("down", () => {
      legendDown = true;
    })
    this.lineChart.legend.itemContainers.template.events.on("up", () => {
      setTimeout(() => {
        legendDown = false;
      }, 100)
    })


    this.seriesTypeSwitch = this.lineChart.legend.createChild(am4core.SwitchButton);
    this.seriesTypeSwitch.leftLabel.text = "totals";
    this.seriesTypeSwitch.rightLabel.text = "day change"
    this.seriesTypeSwitch.leftLabel.fill = am4core.color("#888");
    this.seriesTypeSwitch.rightLabel.fill = am4core.color("#222");

    this.seriesTypeSwitch.events.on("down", () => {
      legendDown = true;
    })
    this.seriesTypeSwitch.events.on("up", () => {
      setTimeout(() => {
        legendDown = false;
      }, 100)
    })

    this.seriesTypeSwitch.events.on("toggled", () => {
      if (this.seriesTypeSwitch.isActive) {
        if (!this.columnSeries) {
          this.createColumnSeries();
        }

        for (var key in this.columnSeries) {
          this.columnSeries[key].hide(0);
        }

        for (var key in series) {
          series[key].hiddenInLegend = true;
          series[key].hide();
        }

        this.columnSeries[this.currentType].show();
      }
      else {
        for (var key in this.columnSeries) {
          this.columnSeries[key].hiddenInLegend = true;
          this.columnSeries[key].hide();
        }

        for (var key in this.series) {
          this.series[key].hiddenInLegend = false;
          this.series[key].hide();
        }

        this.series[this.currentType].show();

      }
    })




    // create series
    this.activeSeries = this.addSeries("active", this.activeColor);
    // active series is visible initially
    this.activeSeries.tooltip.disabled = true;
    this.activeSeries.hidden = false;

    var confirmedSeries = this.addSeries("confirmed", this.confirmedColor);
    var recoveredSeries = this.addSeries("recovered", this.recoveredColor);
    var deathsSeries = this.addSeries("deaths", this.deathsColor);

    var series = { active: this.activeSeries, confirmed: confirmedSeries, recovered: recoveredSeries, deaths: deathsSeries };











    this.lineChart.plotContainer.events.on("up", () => {
      if (!legendDown) {
        this.slider.start = this.lineChart.cursor.xPosition * ((this.dateAxis.max - this.dateAxis.min) / (this.lastDate.getTime() - this.dateAxis.min));
      }
    })


    // data warning label
    this.label = this.lineChart.plotContainer.createChild(am4core.Label);
    this.label.text = "Current day stats may be incomplete until countries submit their data.";
    this.label.fill = am4core.color("#222222");
    this.label.fontSize = "0.8em";
    this.label.paddingBottom = 4;
    this.label.opacity = 0.9;
    this.label.align = "right";
    this.label.horizontalCenter = "right";
    this.label.verticalCenter = "bottom";

    // BUTTONS
    // create buttons
    var activeButton = this.addButton("active", this.activeColor);
    var confirmedButton = this.addButton("confirmed", this.confirmedColor);
    var recoveredButton = this.addButton("recovered", this.recoveredColor);
    var deathsButton = this.addButton("deaths", this.deathsColor);

    this.buttons = { active: activeButton, confirmed: confirmedButton, recovered: recoveredButton, deaths: deathsButton };



    /* this.container.events.on("layoutvalidated", () => {
      this.dateAxis.tooltip.hide();
      this.lineChart.cursor.hide();
      this.updateTotals(this.currentIndex);
    }); */

    // set initial data and names
    this.updateCountryName();
    this.changeDataType('active');
    //populateCountries(slideData);

    setTimeout(this.updateSeriesTooltip, 3000);
  }












  // what happens when a country is rolled-over
  rollOverCountry(mapPolygon) {

    this.resetHover();
    if (mapPolygon) {
      mapPolygon.isHover = true;

      // make bubble hovered too
      this.image = this.bubbleSeries.getImageById(mapPolygon.dataItem.id);
      if (this.image) {
        this.image.dataItem.dataContext['name'] = mapPolygon.dataItem.dataContext.name;
        this.image.isHover = true;
      }
    }
  }

  // what happens when a country is rolled-out
  rollOutCountry(mapPolygon) {
    this.image = this.bubbleSeries.getImageById(mapPolygon.dataItem.id)

    this.resetHover();
    if (this.image) {
      this.image.isHover = false;
    }
  }
  // rotate and zoom
  rotateAndZoom(mapPolygon) {
    this.polygonSeries.hideTooltip();
    this.animation = this.mapChart.animate([{ property: "deltaLongitude", to: -mapPolygon.visualLongitude }, { property: "deltaLatitude", to: -mapPolygon.visualLatitude }], 1000)
    this.animation.events.on("animationended", () => {
      this.mapChart.zoomToMapObject(mapPolygon, this.getZoomLevel(mapPolygon));
    })
  }
  // calculate zoom level (default is too close)
  getZoomLevel(mapPolygon) {
    var w = mapPolygon.polygon.bbox.width;
    var h = mapPolygon.polygon.bbox.width;
    // change 2 to smaller walue for a more close zoom
    return Math.min(this.mapChart.seriesWidth / (w * 2), this.mapChart.seriesHeight / (h * 2))
  }
  resetHover() {
    this.polygonSeries.mapPolygons.each((polygon) => {
      polygon.isHover = false;
    })

    this.bubbleSeries.mapImages.each((image) => {
      image.isHover = false;
    })
  }
  // updates country name and date
  updateCountryName() {
    this.countryName.text = this.currentCountry + ", " + this.mapChart.dateFormatter.format(this.currentDate, "MMM dd, yyyy");
  }
  // show world data
  showWorld() {
    this.currentCountry = "Global";
    this.currentPolygon = undefined;
    this.resetHover();

    if (this.countryDataTimeout) {
      clearTimeout(this.countryDataTimeout);
    }

    // make all inactive
    this.polygonSeries.mapPolygons.each((polygon) => {
      polygon.isActive = false;
    })

    this.updateCountryName();

    // update line chart data (again, modifying instead of setting new data for a nice animation)
    for (var i = 0; i < this.lineChart.data.length; i++) {
      var di = this.country.history[i];
      var dataContext = this.lineChart.data[i];

      dataContext.recovered = di.recovered;
      dataContext.confirmed = di.confirmed;
      dataContext.deaths = di.deaths;
      dataContext.active = di.active;
      this.valueAxis.min = undefined;
      this.valueAxis.max = undefined;
    }

    this.lineChart.invalidateRawData();

    this.updateTotals(this.currentIndex);
    this.mapChart.goHome();
  }

  updateSeriesTooltip() {

    var position = this.dateAxis.dateToPosition(this.currentDate);
    position = this.dateAxis.toGlobalPosition(position);
    var x = this.dateAxis.positionToCoordinate(position);

    this.lineChart.cursor.triggerMove({ x: x, y: 0 }, "soft", true);
    this.lineChart.series.each((series) => {
      if (!series.isHidden) {
        series.tooltip.disabled = false;
        series.showTooltipAtDataItem(series.dataItem);
      }
    })
  }
  updateCountryTooltip() {
    this.polygonSeries.mapPolygons.template.tooltipText = "[bold]{name}: {value.formatNumber('#.')}[/]\n[font-size:10px]" + this.currentTypeName + " per million"
  }
  idToName(id) {
    return am4geodata_data_countries2[id] ? am4geodata_data_countries2[id].country : id == "XX" ? "Others" : id;
  }

  removeAntarctica(mapData) {
    for (var i = mapData.length - 1; i >= 0; i--) {
      if (mapData[i].id == "AQ") {
        mapData.splice(i, 1);
      }
    }
  }
  // capitalize first letter
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  handleImageOver(event) {
    this.rollOverCountry(this.polygonSeries.getPolygonById(event.target.dataItem.id));
  }

  handleImageOut(event) {
    this.rollOutCountry(this.polygonSeries.getPolygonById(event.target.dataItem.id));
  }

  handleImageHit(event) {
    this.selectCountry(this.polygonSeries.getPolygonById(event.target.dataItem.id));
  }

  handleCountryHit(event) {
    this.selectCountry(event.target);
  }

  handleCountryOver(event) {
    this.rollOverCountry(event.target);
  }

  handleCountryOut(event) {
    this.rollOutCountry(event.target);
  }
  // update total values in buttons
  updateTotals(index) {
    var di = this.countries[this.currentCountry].history[index];
    var date = new Date(di.date);
    this.currentDate = date;

    this.updateCountryName();

    var position = this.dateAxis.dateToPosition(date);
    position = this.dateAxis.toGlobalPosition(position);
    var x = this.dateAxis.positionToCoordinate(position);

    if (this.lineChart.cursor) {
      this.lineChart.cursor.triggerMove({ x: x, y: 0 }, "soft", true);
    }
    for (var key in this.buttons) {
      var count = Number(this.lineChart.data[index][key])
      if (count) {
        this.buttons[key].label.text = this.capitalizeFirstLetter(key) + ": " + this.numberFormatter.format(count, '#,###');
      }
    }
    this.currentIndex = index;

  }

  // update map data
  updateMapData(data) {
    //modifying instead of setting new data for a nice animation
    this.bubbleSeries.dataItems.each((dataItem) => {
      dataItem.dataContext['confirmed'] = 0;
      dataItem.dataContext['deaths'] = 0;
      dataItem.dataContext['recovered'] = 0;
      dataItem.dataContext['active'] = 0;
    })

    this.maxPC = { active: 0, confirmed: 0, deaths: 0, recovered: 0 };

    for (var i = 0; i < data.length; i++) {
      var di = data[i];
      var image = this.bubbleSeries.getImageById(di.id);
      var polygon = this.polygonSeries.getPolygonById(di.id);

      if (image) {
        this.population = Number(this.countries[i].population);

        image.dataItem.dataContext['confirmed'] = di.confirmed;
        image.dataItem.dataContext['deaths'] = di.deaths;
        image.dataItem.dataContext['recovered'] = di.recovered;
        image.dataItem.dataContext['active'] = di.active;
      }

      if (polygon) {
        polygon.dataItem.dataContext['confirmedPC'] = di.confirmed / this.population * 1000000;
        polygon.dataItem.dataContext['deathsPC'] = di.deaths / this.population * 1000000;
        polygon.dataItem.dataContext['recoveredPC'] = di.recovered / this.population * 1000000;
        polygon.dataItem.dataContext['active'] = di.confirmed - di.recovered - di.deaths;
        polygon.dataItem.dataContext['activePC'] = polygon.dataItem.dataContext['active'] / this.population * 1000000;

        if (this.population > 100000) {
          if (polygon.dataItem.dataContext['confirmedPC'] > this.maxPC.confirmed) {
            this.maxPC.confirmed = polygon.dataItem.dataContext['confirmedPC'];
          }
          if (polygon.dataItem.dataContext['deathsPC'] > this.maxPC.deaths) {
            this.maxPC.deaths = polygon.dataItem.dataContext['deathsPC'];
          }
          if (polygon.dataItem.dataContext['recoveredPC'] > this.maxPC.recovered) {
            this.maxPC.recovered = polygon.dataItem.dataContext['recoveredPC'];
          }
          if (polygon.dataItem.dataContext['activePC'] > this.maxPC.active) {
            this.maxPC.active = polygon.dataItem.dataContext['activePC'];
          }
        }
      }

      this.bubbleSeries.heatRules.getIndex(0).maxValue = this.max[this.currentType];
      this.polygonSeries.heatRules.getIndex(0).maxValue = this.maxPC[this.currentType];

      this.bubbleSeries.invalidateRawData();
      this.polygonSeries.invalidateRawData();
    }
  }
  // change line chart data to the selected countries
  setCountryData(countryIndex) {
    // instead of setting whole data array, we modify current raw data so that a nice animation would happen
    for (var i = 0; i < this.lineChart.data.length; i++) {
      var di = this.country.history[i];

      var countryData = di[countryIndex];
      var dataContext = this.lineChart.data[i];
      if (countryData) {
        dataContext.recovered = countryData.recovered;
        dataContext.confirmed = countryData.confirmed;
        dataContext.deaths = countryData.deaths;
        dataContext.active = countryData.active;
        this.valueAxis.min = undefined;
        this.valueAxis.max = undefined;
      }
      else {
        dataContext.recovered = 0;
        dataContext.confirmed = 0;
        dataContext.deaths = 0;
        dataContext.active = 0;
        this.valueAxis.min = 0;
        this.valueAxis.max = 10;
      }
    }

    this.lineChart.invalidateRawData();
    this.updateTotals(this.currentIndex);
    setTimeout(this.updateSeriesTooltip, 1000);
  }
  // select a country
  selectCountry(mapPolygon) {
    this.resetHover();
    this.polygonSeries.hideTooltip();

    // if the same country is clicked show world
    if (this.currentPolygon == mapPolygon) {
      this.currentPolygon.isActive = false;
      this.currentPolygon = undefined;
      this.showWorld();
      return;
    }
    // save current polygon
    this.currentPolygon = mapPolygon;
    var countryIndex = this.countryIndexMap[mapPolygon.dataItem.id];
    this.currentCountry = mapPolygon.dataItem.dataContext.name;

    // make others inactive
    this.polygonSeries.mapPolygons.each((polygon) => {
      polygon.isActive = false;
    })

    // clear timeout if there is one
    if (this.countryDataTimeout) {
      clearTimeout(this.countryDataTimeout);
    }
    // we delay change of data for better performance (so that data is not changed whil zooming)
    this.countryDataTimeout = setTimeout(() => {
      this.setCountryData(countryIndex);
    }, 1000); // you can adjust number, 1000 is one second

    this.updateTotals(this.currentIndex);
    this.updateCountryName();

    mapPolygon.isActive = true;
    // meaning it's globe
    if (this.mapGlobeSwitch.isActive) {
      // animate deltas (results the map to be rotated to the selected country)
      if (this.mapChart.zoomLevel != 1) {
        this.mapChart.goHome();
        this.rotateAndZoom(mapPolygon);
      }
      else {
        this.rotateAndZoom(mapPolygon);
      }
    }
    // if it's not a globe, simply zoom to the country
    else {
      this.mapChart.zoomToMapObject(mapPolygon, this.getZoomLevel(mapPolygon));
    }
  }
  // play behavior
  play() {
    if (!this.sliderAnimation) {
      this.sliderAnimation = this.slider.animate({ property: "start", to: 1, from: 0 }, 50000, am4core.ease.linear).pause();
      this.sliderAnimation.events.on("animationended", () => {
        this.playButton.isActive = false;
      })
    }

    if (this.slider.start >= 1) {
      this.slider.start = 0;
      this.sliderAnimation.start();
    }
    this.sliderAnimation.resume();
    this.playButton.isActive = true;
  }

  // stop behavior
  stop() {
    if (this.sliderAnimation) {
      this.sliderAnimation.pause();
    }
    this.playButton.isActive = false;
  }
  updateColumnsFill() {
    this.columnSeries.active.columns.each((column) => {
      if (column.dataItem.values.valueY.previousChange < 0) {
        column.fillOpacity = 0;
        column.strokeOpacity = 0.6;
      }
      else {
        column.fillOpacity = 0.6;
        column.strokeOpacity = 0;
      }
    })
  }
  // add series
  addSeries(name, color) {
    this.series = this.lineChart.series.push(new am4charts.LineSeries())
    this.series.dataFields.valueY = name;
    this.series.dataFields.dateX = "date";
    this.series.name = this.capitalizeFirstLetter(name);
    this.series.strokeOpacity = 0.6;
    this.series.stroke = color;
    this.series.fill = color;
    this.series.maskBullets = false;
    this.series.minBulletDistance = 10;
    this.series.hidden = true;
    this.series.hideTooltipWhileZooming = true;


    // series bullet
    this.bullet = this.series.bullets.push(new am4charts.CircleBullet());

    // only needed to pass it to circle
    var bulletHoverState = this.bullet.states.create("hover");
    this.bullet.setStateOnChildren = true;

    this.bullet.circle.fillOpacity = 1;
    this.bullet.circle.fill = this.backgroundColor;
    this.bullet.circle.radius = 2;

    this.circleHoverState = this.bullet.circle.states.create("hover");
    this.circleHoverState.properties.fillOpacity = 1;
    this.circleHoverState.properties.fill = color;
    this.circleHoverState.properties.scale = 1.4;

    // tooltip setup
    this.series.tooltip.pointerOrientation = "down";
    this.series.tooltip.getStrokeFromObject = true;
    this.series.tooltip.getFillFromObject = false;
    this.series.tooltip.background.fillOpacity = 0.4;
    this.series.tooltip.background.fill = am4core.color("#444444");
    this.series.tooltip.dy = -4;
    this.series.tooltip.fontSize = "0.8em";
    this.series.tooltipText = "Total {name}: {valueY}";

    return this.series;
  }
  // handle button clikc
  handleButtonClick(event) {
    // we saved name to dummy data
    this.changeDataType(event.target.dummyData);
  }

  // change data type (active/confirmed/recovered/deaths)
  changeDataType(name) {
    this.currentType = name;
    this.currentTypeName = name;
    if (name != "deaths") {
      this.currentTypeName += " cases";
    }

    this.bubbleSeries.mapImages.template.tooltipText = "[bold]{name}: {value}[/] [font-size:10px]\n" + this.currentTypeName;

    // make button active
    this.activeButton = this.buttons[name];
    this.activeButton.isActive = true;
    // make other buttons inactive
    for (var key in this.buttons) {
      if (this.buttons[key] != this.activeButton) {
        this.buttons[key].isActive = false;
      }
    }
    // tell series new field name
    this.bubbleSeries.dataFields.value = name;
    this.polygonSeries.dataFields.value = name + "PC";

    this.bubbleSeries.dataItems.each((dataItem) => {
      dataItem.setValue("value", dataItem.dataContext[this.currentType]);
    })

    this.polygonSeries.dataItems.each((dataItem) => {
      dataItem.setValue("value", dataItem.dataContext[this.currentType + "PC"]);
      dataItem.mapPolygon.defaultState.properties.fill = undefined;
    })


    // change color of bubbles
    // setting colors on mapImage for tooltip colors
    this.bubbleSeries.mapImages.template.fill = this.colors[name];
    this.bubbleSeries.mapImages.template.stroke = this.colors[name];
    // first child is circle
    this.bubbleSeries.mapImages.template.children.getIndex(0).fill = this.colors[name];

    this.dateAxis.tooltip.background.fill = this.colors[name];
    this.dateAxis.tooltip.background.stroke = this.colors[name];
    this.lineChart.cursor.lineX.stroke = this.colors[name];

    // show series
    if (this.seriesTypeSwitch.isActive) {
      this.currentSeries = this.columnSeries[name];
      this.currentSeries.show();
      // hide other series
      for (var key in this.columnSeries) {
        if (this.columnSeries[key] != this.currentSeries) {
          this.columnSeries[key].hide();
        }
      }
    }
    else {
      this.currentSeries = this.series[name];
      this.currentSeries.show();
      // hide other series
      for (var key in this.series) {
        if (this.series[key] != this.currentSeries) {
          this.series[key].hide();
        }
      }
    }

    // update heat rule's maxValue
    this.bubbleSeries.heatRules.getIndex(0).maxValue = this.max[this.currentType];
    this.polygonSeries.heatRules.getIndex(0).maxValue = this.maxPC[this.currentType];
    if (this.perCapita) {
      this.polygonSeries.heatRules.getIndex(0).max = this.colors[name];
      this.updateCountryTooltip();
    }
  }
  // add series
  addColumnSeries(name, color) {
    this.col_series = this.lineChart.series.push(new am4charts.ColumnSeries())
    this.col_series.dataFields.valueY = name;
    this.col_series.dataFields.valueYShow = "previousChange";
    this.col_series.dataFields.dateX = "date";
    this.col_series.name = this.capitalizeFirstLetter(name);
    this.col_series.hidden = true;
    this.col_series.stroke = color;
    this.col_series.fill = color;
    this.col_series.columns.template.fillOpacity = 0.8;
    this.col_series.columns.template.strokeOpacity = 0;
    this.col_series.hideTooltipWhileZooming = true;
    this.col_series.clustered = false;
    this.col_series.hiddenInLegend = true;
    this.col_series.columns.template.width = am4core.percent(50);

    // tooltip setup
    this.col_series.tooltip.pointerOrientation = "down";
    this.col_series.tooltip.getStrokeFromObject = true;
    this.col_series.tooltip.getFillFromObject = false;
    this.col_series.tooltip.background.fillOpacity = 0.4;
    this.col_series.tooltip.background.fill = am4core.color("#000000");
    this.col_series.tooltip.fontSize = "0.8em";
    this.col_series.tooltipText = "{name}: {valueY.previousChange.formatNumber('+#,###|#,###|0')}";

    return this.col_series;
  }

  // add button
  addButton(name, color) {
    this.button = this.buttonsContainer.createChild(am4core.Button);
    this.button.label.valign = "middle";
    this.button.label.fill = am4core.color("#000");
    //button.label.fontSize = "11px";
    this.button.background.cornerRadius(30, 30, 30, 30);
    this.button.background.strokeOpacity = 0.3;
    this.button.background.fillOpacity = 0;
    this.button.background.stroke = this.buttonStrokeColor;
    this.button.background.padding(2, 3, 2, 3);
    this.button.states.create("active");
    this.button.setStateOnChildren = true;

    this.activeHoverState = this.button.background.states.create("hoverActive");
    this.activeHoverState.properties.fillOpacity = 0;

    this.circle = new am4core.Circle();
    this.circle.radius = 8;
    this.circle.fillOpacity = 0.3;
    this.circle.fill = this.buttonStrokeColor;
    this.circle.strokeOpacity = 0;
    this.circle.valign = "middle";
    this.circle.marginRight = 5;
    this.button.icon = this.circle;

    // save name to dummy data for later use
    this.button.dummyData = name;

    this.circleActiveState = this.circle.states.create("active");
    this.circleActiveState.properties.fill = color;
    this.circleActiveState.properties.fillOpacity = 0.5;

    this.button.events.on("hit", this.handleButtonClick);

    return this.button;
  }
  createColumnSeries() {
    this.columnSeries = {}
    this.columnSeries.active = this.addColumnSeries("active", this.activeColor);
    this.columnSeries.active.events.on("validated", () => {
      this.updateColumnsFill();
    })

    this.columnSeries.confirmed = this.addColumnSeries("confirmed", this.confirmedColor);
    this.columnSeries.recovered = this.addColumnSeries("recovered", this.recoveredColor);
    this.columnSeries.deaths = this.addColumnSeries("deaths", this.deathsColor);
  }
}









