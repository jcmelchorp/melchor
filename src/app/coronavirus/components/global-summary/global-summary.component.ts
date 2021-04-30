import { AfterViewInit, Component, Input, SimpleChanges, NgZone, OnDestroy, OnInit } from '@angular/core';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_worldHigh from '@amcharts/amcharts4-geodata/worldHigh';
import am4geodata_ultraWorld from '@amcharts/amcharts4-geodata/worldUltra';
import am4geodata_data_countries2 from '@amcharts/amcharts4-geodata/data/countries2';
import am4geodata_lang_ES from '@amcharts/amcharts4-geodata/lang/ES';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

import { max } from 'rxjs/internal/operators/max';
import { BehaviorSubject, Observable } from 'rxjs';

import { Cases, Vaccine } from '../../models/coronavirus.model';
import { HistoryData } from './../../models/covid.model';
import { CountryData, Summary } from '../../models/covid.model';
import { CoronavirusApiService } from './../../services/coronavirus-api.service';

@Component({
  selector: 'app-global-summary',
  templateUrl: './global-summary.component.html',
  styleUrls: ['./global-summary.component.scss']
})
export class GlobalSummaryComponent implements AfterViewInit, OnDestroy {
  @Input() summary: Summary;
  @Input() vaccines: Vaccine[];
  @Input() timeLine: Cases[];


  renameFields(data: CountryData[]): any[] {
    return data.map(d => {
      return {
        uid: d.id,
        id: d.CountryCode,
        name: d.Country,
        value: d.TotalConfirmed,
        date: d.Date,
        newConfirmed: d.NewConfirmed,
        newDeaths: d.NewDeaths,
        newRecovered: d.NewRecovered,
        totalConfirmed: d.TotalConfirmed,
        totalDeaths: d.TotalDeaths,
        totalRecovered: d.TotalRecovered,
        country: d.Country,
        countryCode: d.CountryCode,
        slug: d.Slug
      }
    })

  }

  ngAfterViewInit() {
    //#region variables
    var perCapita = false;
    var numberFormatter: am4core.NumberFormatter = new am4core.NumberFormatter();
    var colors = { active: activeColor, confirmed: confirmedColor, recovered: recoveredColor, deaths: deathsColor };
    var populations = {
      "AD": "84000",
      "AE": "4975593",
      "AF": "29121286",
      "AG": "86754",
      "AI": "13254",
      "AL": "2986952",
      "AM": "2968000",
      "AN": "300000",
      "AO": "13068161",
      "AQ": "0",
      "AR": "41343201",
      "AS": "57881",
      "AT": "8205000",
      "AU": "21515754",
      "AW": "71566",
      "AX": "26711",
      "AZ": "8303512",
      "BA": "4590000",
      "BB": "285653",
      "BD": "156118464",
      "BE": "10403000",
      "BF": "16241811",
      "BG": "7148785",
      "BH": "738004",
      "BI": "9863117",
      "BJ": "9056010",
      "BL": "8450",
      "BM": "65365",
      "BN": "395027",
      "BO": "9947418",
      "BQ": "18012",
      "BR": "201103330",
      "BS": "301790",
      "BT": "699847",
      "BV": "0",
      "BW": "2029307",
      "BY": "9685000",
      "BZ": "314522",
      "CA": "33679000",
      "CC": "628",
      "CD": "70916439",
      "CF": "4844927",
      "CG": "3039126",
      "CH": "7581000",
      "CI": "21058798",
      "CK": "21388",
      "CL": "16746491",
      "CM": "19294149",
      "CN": "1330044000",
      "CO": "47790000",
      "CR": "4516220",
      "CS": "10829175",
      "CU": "11423000",
      "CV": "508659",
      "CW": "141766",
      "CX": "1500",
      "CY": "1102677",
      "CZ": "10476000",
      "DE": "81802257",
      "DJ": "740528",
      "DK": "5484000",
      "DM": "72813",
      "DO": "9823821",
      "DZ": "34586184",
      "EC": "14790608",
      "EE": "1291170",
      "EG": "80471869",
      "EH": "273008",
      "ER": "5792984",
      "ES": "46505963",
      "ET": "88013491",
      "FI": "5244000",
      "FJ": "875983",
      "FK": "2638",
      "FM": "107708",
      "FO": "48228",
      "FR": "64768389",
      "GA": "1545255",
      "GB": "62348447",
      "GD": "107818",
      "GE": "4630000",
      "GF": "195506",
      "GG": "65228",
      "GH": "24339838",
      "GI": "27884",
      "GL": "56375",
      "GM": "1593256",
      "GN": "10324025",
      "GP": "443000",
      "GQ": "1014999",
      "GR": "11000000",
      "GS": "30",
      "GT": "13550440",
      "GU": "159358",
      "GW": "1565126",
      "GY": "748486",
      "HK": "6898686",
      "HM": "0",
      "HN": "7989415",
      "HR": "4284889",
      "HT": "9648924",
      "HU": "9982000",
      "ID": "242968342",
      "IE": "4622917",
      "IL": "7353985",
      "IM": "75049",
      "IN": "1173108018",
      "IO": "4000",
      "IQ": "29671605",
      "IR": "76923300",
      "IS": "308910",
      "IT": "60340328",
      "JE": "90812",
      "JM": "2847232",
      "JO": "6407085",
      "JP": "127288000",
      "KE": "40046566",
      "KG": "5776500",
      "KH": "14453680",
      "KI": "92533",
      "KM": "773407",
      "KN": "51134",
      "KP": "22912177",
      "KR": "48422644",
      "KW": "2789132",
      "KY": "44270",
      "KZ": "15340000",
      "LA": "6368162",
      "LB": "4125247",
      "LC": "160922",
      "LI": "35000",
      "LK": "21513990",
      "LR": "3685076",
      "LS": "1919552",
      "LT": "2944459",
      "LU": "497538",
      "LV": "2217969",
      "LY": "6461454",
      "MA": "33848242",
      "MC": "32965",
      "MD": "4324000",
      "ME": "666730",
      "MF": "35925",
      "MG": "21281844",
      "MH": "65859",
      "MK": "2062294",
      "ML": "13796354",
      "MM": "53414374",
      "MN": "3086918",
      "MO": "449198",
      "MP": "53883",
      "MQ": "432900",
      "MR": "3205060",
      "MS": "9341",
      "MT": "403000",
      "MU": "1294104",
      "MV": "395650",
      "MW": "15447500",
      "MX": "112468855",
      "MY": "28274729",
      "MZ": "22061451",
      "NA": "2128471",
      "NC": "216494",
      "NE": "15878271",
      "NF": "1828",
      "NG": "154000000",
      "NI": "5995928",
      "NL": "16645000",
      "NO": "5009150",
      "NP": "28951852",
      "NR": "10065",
      "NU": "2166",
      "NZ": "4252277",
      "OM": "2967717",
      "PA": "3410676",
      "PE": "29907003",
      "PF": "270485",
      "PG": "6064515",
      "PH": "99900177",
      "PK": "184404791",
      "PL": "38500000",
      "PM": "7012",
      "PN": "46",
      "PR": "3916632",
      "PS": "3800000",
      "PT": "10676000",
      "PW": "19907",
      "PY": "6375830",
      "QA": "840926",
      "RE": "776948",
      "RO": "21959278",
      "RS": "7344847",
      "RU": "140702000",
      "RW": "11055976",
      "SA": "25731776",
      "SB": "559198",
      "SC": "88340",
      "SD": "35000000",
      "SE": "9828655",
      "SG": "4701069",
      "SH": "7460",
      "SI": "2007000",
      "SJ": "2550",
      "SK": "5455000",
      "SL": "5245695",
      "SM": "31477",
      "SN": "12323252",
      "SO": "10112453",
      "SR": "492829",
      "SS": "8260490",
      "ST": "175808",
      "SV": "6052064",
      "SX": "37429",
      "SY": "22198110",
      "SZ": "1354051",
      "TC": "20556",
      "TD": "10543464",
      "TF": "140",
      "TG": "6587239",
      "TH": "67089500",
      "TJ": "7487489",
      "TK": "1466",
      "TL": "1154625",
      "TM": "4940916",
      "TN": "10589025",
      "TO": "122580",
      "TR": "77804122",
      "TT": "1228691",
      "TV": "10472",
      "TW": "22894384",
      "TZ": "41892895",
      "UA": "45415596",
      "UG": "33398682",
      "UM": "0",
      "US": "310232863",
      "UY": "3477000",
      "UZ": "27865738",
      "VA": "921",
      "VC": "104217",
      "VE": "27223228",
      "VG": "21730",
      "VI": "108708",
      "VN": "89571130",
      "VU": "221552",
      "WF": "16025",
      "WS": "192001",
      "XK": "1800000",
      "YE": "23495361",
      "YT": "159042",
      "ZA": "49000000",
      "ZM": "13460305",
      "ZW": "13061000"
    }

    var activeColor: am4core.Color = am4core.color("#0a0acc");
    var activeCountryColor: am4core.Color = am4core.color("#367B25");
    var backgroundColor: am4core.Color = am4core.color("#1e2128");
    var confirmedColor: am4core.Color = am4core.color("#faea23");
    var countryColor: am4core.Color = am4core.color("#74B266");
    var countryHoverColor: am4core.Color = am4core.color("#367B25");
    var countryStrokeColor: am4core.Color = am4core.color("#000000");
    var deathsColor: am4core.Color = am4core.color("#d21a1a");
    var groundColor: am4core.Color = am4core.color("rgb(119, 85, 10)");
    var oceanColor: am4core.Color = am4core.color("rgb(0, 195, 255)  ");
    var recoveredColor: am4core.Color = am4core.color("#45d21a");
    var titleColor: am4core.Color = am4core.color("#333333");

    // for an easier access by key
    var colors = { active: activeColor, confirmed: confirmedColor, recovered: recoveredColor, deaths: deathsColor };

    var buttonStrokeColor = am4core.color("#777777");

    var currentIndex;
    var currentCountry = "Global";
    // last date of the data
    var lastDate = new Date(this.summary.Date);
    var currentDate = lastDate;
    var sliderAnimation;
    var currentPolygon;

    var countryDataTimeout;

    var currentType;

    var currentTypeName;
    var countryIndexMap = {};
    //#endregion
    //#region Load Data
    // as we will be modifying raw data, make a copy
    var mapData = this.timeLine;









    // remove items with 0 values for better performance
    for (var i = mapData.length - 1; i >= 0; i--) {
      if (mapData[i].confirmed == 0) {
        mapData.splice(i, 1);
      }
    }

    var max = { confirmed: 0, recovered: 0, deaths: 0, active: 0 };
    var maxPC = { confirmed: 0, recovered: 0, deaths: 0, active: 0 };



    am4core.useTheme(am4themes_animated);

    // main container
    // https://www.amcharts.com/docs/v4/concepts/svg-engine/containers/
    var container = am4core.create("chartmap", am4core.Container);
    container.width = am4core.percent(100);
    container.height = am4core.percent(100);

    container.tooltip = new am4core.Tooltip();
    container.tooltip.fontSize = "0.8em";
    container.tooltip.background.fill = countryColor;
    container.tooltip.background.stroke = activeColor;
    container.tooltip.getFillFromObject = false;
    container.tooltip.getStrokeFromObject = false;
    // MAP CHART
    // https://www.amcharts.com/docs/v4/chart-types/map/

    var chart = container.createChild(am4maps.MapChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
    chart.height = am4core.percent(80);
    chart.zoomControl = new am4maps.ZoomControl();
    chart.zoomControl.align = "right";
    chart.zoomControl.marginRight = 15;
    chart.zoomControl.valign = "top";
    chart.homeGeoPoint = { longitude: 0, latitude: -2 };
    chart.background.opacity = 0.5
    chart.zoomEasing = am4core.ease.sinOut;
    chart.geodata = am4geodata_ultraWorld;
    chart.geodataNames = am4geodata_lang_ES;
    // Set projection
    // https://www.amcharts.com/docs/v4/chart-types/map/#Setting_projection
    // instead of Miller, you can use Mercator or many other projections available: https://www.amcharts.com/demos/map-using-d3-projections/
    chart.projection = new am4maps.projections.Miller();
    chart.panBehavior = "move";

    // when map is globe, beackground is made visible
    /* chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1;
    chart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color("rgb(80,80,80)"); */
    // you can have pacific - centered map if you set this to -154.8
    chart.deltaLongitude = -8;

    var title = chart.chartContainer.createChild(am4core.Label);
    title.paddingTop = 0;
    title.fontSize = "1.5em";
    title.text = "COVID-19 Estadística mundial";
    title.horizontalCenter = "left";
    title.marginLeft = 20;
    title.fill = am4core.color("rgb(40,40,40)");
    title.y = 0;
    title.align = "center";
    title.zIndex = 100;
    // top title

    var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    // this helps to place bubbles in the visual middle of the area
    var polygonTemplate = polygonSeries.mapPolygons.template;
    //polygonTemplate.fill = countryColor;
    polygonTemplate.fillOpacity = 1
    polygonTemplate.stroke = countryStrokeColor;
    polygonTemplate.strokeOpacity = 0.15
    polygonTemplate.setStateOnChildren = true;
    polygonTemplate.tooltipPosition = "fixed";
    polygonTemplate.nonScalingStroke = true;

    polygonTemplate.events.on("hit", handleCountryHit);
    polygonTemplate.events.on("over", handleCountryOver);
    polygonTemplate.events.on("out", handleCountryOut);
    polygonSeries.calculateVisualCenter = true;
    polygonSeries.dataFields.id = "id";
    polygonSeries.dataFields.value = "value";
    // Base colors for custom "heatRules" gradient

    polygonSeries.heatRules.push({
      max: am4core.color("rgb(218, 185, 0)"),
      min: am4core.color("rgb(255, 255, 255)"),
      property: "fill",
      target: polygonSeries.mapPolygons.template,
    });


    polygonSeries.strokeWidth = 0.5;
    polygonSeries.useGeodata = true;




    // Update heat legend value labels
    polygonSeries.events.on("datavalidated", (ev) => {
      let heatLegend = ev.target.map.getKey("heatLegend");

      let min = heatLegend.series.dataItem.values.value.low;
      let minRange = heatLegend.valueAxis.axisRanges.getIndex(0);
      minRange.value = min;
      minRange.label.text = "" + heatLegend.numberFormatter.format(min);

      let max = heatLegend.series.dataItem.values.value.high;
      let maxRange = heatLegend.valueAxis.axisRanges.getIndex(1);
      maxRange.value = max;
      maxRange.label.text = "" + heatLegend.numberFormatter.format(max);
    });
    var heatColors = [
      am4core.color("rgb(248, 227, 211)"),
      am4core.color("rgb(237, 137, 166)"),
      am4core.color("rgb(0,0,0)")
    ];

    // Let hover state colors be relative to the "heatRule" color
    /* var hoverState = polygonSeries.mapPolygons.template.states.create("hover");
    hoverState.adapter.add("fill", (fill) => {
      return fill.lighten(-0.1);
    }); */

    // Emulate heatRule but with 2 color ranges instead of 1
    polygonSeries.mapPolygons.template.adapter.add("fill", (fill, mapPolygon) => {
      var workingValue = mapPolygon.dataItem.values["value"].workingValue;
      var minValue = polygonSeries.dataItem.values["value"].low;
      var maxValue = polygonSeries.dataItem.values["value"].high;
      var percent = (workingValue - minValue) / (maxValue - minValue);
      // This may run before workingValue is even a thing. Let's only do our thing
      // if workingValue and ergo percent are a thing.
      if (am4core.type.isNumber(percent)) {
        if (percent > 0.5) {
          return new am4core.Color(
            am4core.colors.interpolate(
              heatColors[1].rgb,
              heatColors[2].rgb,
              (percent - 0.5) * 2
            )
          );
        } else {
          return new am4core.Color(
            am4core.colors.interpolate(
              heatColors[0].rgb,
              heatColors[1].rgb,
              percent * 2
            )
          );
        }
      }
      return fill;
    });
    var heatLegend = chart.createChild(am4maps.HeatLegend);
    heatLegend.id = "heatLegend";
    heatLegend.series = polygonSeries;
    heatLegend.width = am4core.percent(100);
    heatLegend.align = "center";
    heatLegend.valign = "bottom";
    heatLegend.marginRight = am4core.percent(4);
    heatLegend.background.fill = am4core.color("#000");
    heatLegend.background.fillOpacity = 0.5;
    heatLegend.padding(5, 5, 5, 5);

    // Blank out internal heat legend value axis labels
    // Set up custom heat map legend labels using axis ranges
    let minRange = heatLegend.valueAxis.axisRanges.create();
    minRange.value = heatLegend.minValue;
    minRange.label.inside = true;
    minRange.label.horizontalCenter = "left";
    minRange.label.dy = 5;
    minRange.label.dx = -3;
    minRange.label.text = "Less";
    let maxRange = heatLegend.valueAxis.axisRanges.create();
    maxRange.label.horizontalCenter = "right";
    maxRange.value = heatLegend.maxValue;
    maxRange.label.inside = true;
    maxRange.label.dy = 5;
    maxRange.label.dx = 3;
    maxRange.label.text = "More";
    // Blank out internal heat legend value axis labels
    heatLegend.valueAxis.renderer.labels.template.adapter.add("text", (labelText) => {
      return '';
    });

    // Allow the heatLegend to function in general
    heatLegend.minColor = heatColors[0];
    heatLegend.maxColor = heatColors[2];

    // Override heatLegend gradient
    var gradient = new am4core.LinearGradient();
    heatColors.forEach((color) => {
      gradient.addColor(color);
    });
    heatLegend.markers.template.adapter.add("fill", () => {
      return gradient;
    });

    heatLegend.markers.template.events.on("sizechanged", (event) => {
      event.target.fill = event.target.fill;
    })


    // switch between map and globe
    var mapGlobeSwitch = chart.createChild(am4core.SwitchButton);
    mapGlobeSwitch.align = "left"
    mapGlobeSwitch.y = 40;
    mapGlobeSwitch.leftLabel.text = "Mapa";
    mapGlobeSwitch.leftLabel.fill = am4core.color("#000000");
    mapGlobeSwitch.rightLabel.fill = am4core.color("#000000");
    mapGlobeSwitch.rightLabel.text = "Esfera";
    mapGlobeSwitch.verticalCenter = "top";
    mapGlobeSwitch.events.on("toggled", () => {
      if (mapGlobeSwitch.isActive) {
        chart.projection = new am4maps.projections.Orthographic;
        //chart.backgroundSeries.show();
        chart.panBehavior = "rotateLongLat";
        polygonSeries.exclude = [];
      } else {
        chart.projection = new am4maps.projections.Miller;
        //chart.backgroundSeries.hide();
        chart.panBehavior = "move";
        polygonSeries.exclude = ["AQ"];
      }
    })

    /* polygonSeries.mapPolygons.template.events.on("over", event => {
      handleHover(event.target);
    });
*/
    polygonSeries.mapPolygons.template.events.on("hit", event => {
      handleHover(event.target);
    });
    polygonSeries.data = JSON.parse(JSON.stringify(this.renameFields(this.summary.Countries)));

    function handleHover(mapPolygon) {
      if (!isNaN(mapPolygon.dataItem.value)) {
        heatLegend.valueAxis.showTooltipAt(mapPolygon.dataItem.value);
      } else {
        heatLegend.valueAxis.hideTooltip();
      }
    }
    /*  // polygon states
     var polygonHoverState = polygonSeries.states.create("hover");
     polygonHoverState.transitionDuration = 1400;
     polygonHoverState.properties.fill = countryHoverColor;

     var polygonActiveState = polygonSeries.states.create("active")
     polygonActiveState.properties.fill = activeCountryColor; */
    // Set up heat legend



    // hasta aqui todo va bien
















    // Bubble series
    var bubbleSeries = chart.series.push(new am4maps.MapImageSeries());
    bubbleSeries.data = JSON.parse(JSON.stringify(this.renameFields(this.summary.Countries)));

    bubbleSeries.dataFields.value = "value";
    bubbleSeries.dataFields.id = "id";

    // adjust tooltip
    bubbleSeries.tooltip.animationDuration = 0;
    bubbleSeries.tooltip.showInViewport = false;
    bubbleSeries.tooltip.background.fillOpacity = 0.2;
    bubbleSeries.tooltip.getStrokeFromObject = true;
    bubbleSeries.tooltip.getFillFromObject = false;
    bubbleSeries.tooltip.background.fill = am4core.color("#000000");

    var imageTemplate = bubbleSeries.mapImages.template;
    // if you want bubbles to become bigger when zoomed, set this to false
    imageTemplate.nonScaling = true;
    imageTemplate.strokeOpacity = 0;
    imageTemplate.fillOpacity = 0.55;
    imageTemplate.tooltipText = "{name}: [bold]{value}[/]";
    imageTemplate.applyOnClones = true;

    imageTemplate.events.on("over", handleImageOver);
    imageTemplate.events.on("out", handleImageOut);
    imageTemplate.events.on("hit", handleImageHit);

    // this is needed for the tooltip to point to the top of the circle instead of the middle
    imageTemplate.adapter.add("tooltipY", (tooltipY, target) => {
      return target.children.getIndex(0)['radius'];
    })

    // When hovered, circles become non-opaque
    var imageHoverState = imageTemplate.states.create("hover");
    imageHoverState.properties.fillOpacity = 1;

    // add circle inside the image
    var circle = imageTemplate.createChild(am4core.Circle);
    // this makes the circle to pulsate a bit when showing it
    circle.hiddenState.properties.scale = 0.0001;
    circle.hiddenState.transitionDuration = 2000;
    circle.defaultState.transitionDuration = 2000;
    circle.defaultState.transitionEasing = am4core.ease.elasticOut;
    // later we set fill color on template (when changing what type of data the map should show) and all the clones get the color because of this
    circle.applyOnClones = true;

    // heat rule makes the bubbles to be of a different width. Adjust min/max for smaller/bigger radius of a bubble
    bubbleSeries.heatRules.push({
      target: circle,
      property: "radius",
      min: 3,
      max: 30,
      dataField: "value"
    })

    // when data items validated, hide 0 value bubbles (because min size is set)
    bubbleSeries.events.on("dataitemsvalidated", () => {
      bubbleSeries.dataItems.each((dataItem) => {
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
    imageTemplate.adapter.add("latitude", (latitude, target) => {
      var polygon = polygonSeries.getPolygonById(target.dataItem.id);
      if (polygon) {
        target.disabled = false;
        return polygon.visualLatitude;
      }
      else {
        target.disabled = true;
      }
      return latitude;
    })

    imageTemplate.adapter.add("longitude", (longitude, target) => {
      var polygon = polygonSeries.getPolygonById(target.dataItem.id);
      if (polygon) {
        target.disabled = false;
        return polygon.visualLongitude;
      }
      else {
        target.disabled = true;
      }
      return longitude;
    })


    // switch between map and globe
    var absolutePerCapitaSwitch = chart.createChild(am4core.SwitchButton);
    absolutePerCapitaSwitch.align = "left"
    absolutePerCapitaSwitch.y = 15;
    absolutePerCapitaSwitch.leftLabel.text = "Absoluto";
    absolutePerCapitaSwitch.leftLabel.fill = am4core.color("#000000");
    absolutePerCapitaSwitch.rightLabel.fill = am4core.color("#000000");
    absolutePerCapitaSwitch.rightLabel.text = "Per Capita";
    absolutePerCapitaSwitch.rightLabel.interactionsEnabled = true;
    absolutePerCapitaSwitch.rightLabel.tooltipText = "Al calcular el valor máximo, no se incluyen los países con una población inferior a 100.000."
    absolutePerCapitaSwitch.verticalCenter = "top";


    absolutePerCapitaSwitch.events.on("toggled", () => {
      if (absolutePerCapitaSwitch.isActive) {
        bubbleSeries.hide(0);
        perCapita = true;
        bubbleSeries.interpolationDuration = 0;
        polygonSeries.heatRules.getIndex(0).max = colors[currentType];
        polygonSeries.heatRules.getIndex(0).maxValue = maxPC[currentType];
        polygonSeries.mapPolygons.template.applyOnClones = true;

        /*  sizeSlider.hide()
         filterSlider.hide();
         sizeLabel.hide();
         filterLabel.hide(); */

        updateCountryTooltip();

      } else {
        perCapita = false;
        polygonSeries.interpolationDuration = 0;
        bubbleSeries.interpolationDuration = 1000;
        bubbleSeries.show();
        polygonSeries.heatRules.getIndex(0).max = countryColor;
        polygonSeries.mapPolygons.template.tooltipText = undefined;
        /* sizeSlider.show()
        filterSlider.show();
        sizeLabel.show();
        filterLabel.show(); */
      }
      polygonSeries.mapPolygons.each((mapPolygon) => {
        mapPolygon.fill = mapPolygon.fill;
        mapPolygon.defaultState.properties.fill = undefined;
      })
    })





    // buttons & chart container
    var buttonsAndChartContainer = container.createChild(am4core.Container);
    buttonsAndChartContainer.layout = "vertical";
    buttonsAndChartContainer.height = am4core.percent(45); // make this bigger if you want more space for the chart
    buttonsAndChartContainer.width = am4core.percent(100);
    buttonsAndChartContainer.valign = "bottom";


    // country name and buttons container
    var nameAndButtonsContainer = buttonsAndChartContainer.createChild(am4core.Container)
    nameAndButtonsContainer.width = am4core.percent(100);
    nameAndButtonsContainer.padding(0, 10, 5, 20);
    nameAndButtonsContainer.layout = "horizontal";

    // name of a country and date label
    var countryName = nameAndButtonsContainer.createChild(am4core.Label);
    countryName.fontSize = "1.1em";
    countryName.fill = am4core.color("#aaaaaa");
    countryName.valign = "middle";

    // buttons container (active/confirmed/recovered/deaths)
    var buttonsContainer = nameAndButtonsContainer.createChild(am4core.Container);
    buttonsContainer.layout = "grid";
    buttonsContainer.width = am4core.percent(100);
    buttonsContainer.x = 10;
    buttonsContainer.contentAlign = "right";

    function handleCountryHit(event) {
      selectCountry(event.target);
    }

    function handleCountryOver(event) {
      rollOverCountry(event.target);
    }

    function handleCountryOut(event) {
      rollOutCountry(event.target);
    }
    // what happens when a country is rolled-over
    function rollOverCountry(mapPolygon) {

      resetHover();
      if (mapPolygon) {
        mapPolygon.isHover = true;

        // make bubble hovered too
        var image = bubbleSeries.getImageById(mapPolygon.dataItem.id);
        if (image) {
          image.dataItem.dataContext['name'] = mapPolygon.dataItem.dataContext.name;
          image.isHover = true;
        }
      }
    }
    function handleImageOver(event) {
      rollOverCountry(polygonSeries.getPolygonById(event.target.dataItem.id));
    }

    function handleImageOut(event) {
      rollOutCountry(polygonSeries.getPolygonById(event.target.dataItem.id));
    }

    function handleImageHit(event) {
      selectCountry(polygonSeries.getPolygonById(event.target.dataItem.id));
    }



    function resetHover() {
      polygonSeries.mapPolygons.each((polygon) => {
        polygon.isHover = false;
      })

      bubbleSeries.mapImages.each((image) => {
        image.isHover = false;
      })
    }

    // what happens when a country is rolled-out
    function rollOutCountry(mapPolygon) {
      var image = bubbleSeries.getImageById(mapPolygon.dataItem.id)

      resetHover();
      if (image) {
        image.isHover = false;
      }
    }

    // rotate and zoom
    function rotateAndZoom(mapPolygon) {
      polygonSeries.hideTooltip();
      var animation = chart.animate([{ property: "deltaLongitude", to: -mapPolygon.visualLongitude }, { property: "deltaLatitude", to: -mapPolygon.visualLatitude }], 1000)
      animation.events.on("animationended", () => {
        chart.zoomToMapObject(mapPolygon, getZoomLevel(mapPolygon));
      })
    }

    // calculate zoom level (default is too close)
    function getZoomLevel(mapPolygon) {
      var w = mapPolygon.polygon.bbox.width;
      var h = mapPolygon.polygon.bbox.width;
      // change 2 to smaller walue for a more close zoom
      return Math.min(chart.seriesWidth / (w * 2), chart.seriesHeight / (h * 2))
    }
    function selectCountry(mapPolygon) {
      resetHover();
      polygonSeries.hideTooltip();

      // if the same country is clicked show world
      if (currentPolygon == mapPolygon) {
        currentPolygon.isActive = false;
        currentPolygon = undefined;
        showWorld();
        return;
      }
      // save current polygon
      currentPolygon = mapPolygon;
      var countryIndex = countryIndexMap[mapPolygon.dataItem.id];
      currentCountry = mapPolygon.dataItem.dataContext.name;

      // make others inactive
      polygonSeries.mapPolygons.each((polygon) => {
        polygon.isActive = false;
      })

      // clear timeout if there is one
      if (countryDataTimeout) {
        clearTimeout(countryDataTimeout);
      }
      // we delay change of data for better performance (so that data is not changed whil zooming)
      /*  countryDataTimeout = setTimeout(function () {
         setCountryData(countryIndex);
       }, 1000); // you can adjust number, 1000 is one second */

      //updateTotals(currentIndex);
      updateCountryName();

      mapPolygon.isActive = true;
      // meaning it's globe
      if (mapGlobeSwitch.isActive) {
        // animate deltas (results the map to be rotated to the selected country)
        if (chart.zoomLevel != 1) {
          chart.goHome();
          rotateAndZoom(mapPolygon);
        }
        else {
          rotateAndZoom(mapPolygon);
        }
      }
      // if it's not a globe, simply zoom to the country
      else {
        chart.zoomToMapObject(mapPolygon, getZoomLevel(mapPolygon));
      }
    }
    /*  function setCountryData(countryIndex) {
       // instead of setting whole data array, we modify current raw data so that a nice animation would happen
       for (var i = 0; i < lineChart.data.length; i++) {
         var di = this.timeLine[i].list;

         var countryData = di[countryIndex];
         var dataContext = lineChart.data[i];
         if (countryData) {
           dataContext.recovered = countryData.recovered;
           dataContext.confirmed = countryData.confirmed;
           dataContext.deaths = countryData.deaths;
           dataContext.active = countryData.confirmed - countryData.recovered - countryData.deaths;
           valueAxis.min = undefined;
           valueAxis.max = undefined;
         }
         else {
           dataContext.recovered = 0;
           dataContext.confirmed = 0;
           dataContext.deaths = 0;
           dataContext.active = 0;
           valueAxis.min = 0;
           valueAxis.max = 10;
         }
       }

       lineChart.invalidateRawData();
       //updateTotals(currentIndex);
       setTimeout(updateSeriesTooltip, 1000);
     }

     function updateSeriesTooltip() {

       var position = dateAxis.dateToPosition(currentDate);
       position = dateAxis.toGlobalPosition(position);
       var x = dateAxis.positionToCoordinate(position);

       lineChart.cursor.triggerMove({ x: x, y: 0 }, "soft", true);
       lineChart.series.each(function (series) {
         if (!series.isHidden) {
           series.tooltip.disabled = false;
           //series.showTooltipAtDataItem(series.tooltipDataItem);
         }
       })
     } */



    // show world data
    function showWorld() {
      currentCountry = "Global";
      currentPolygon = undefined;
      resetHover();

      if (countryDataTimeout) {
        clearTimeout(countryDataTimeout);
      }

      // make all inactive
      polygonSeries.mapPolygons.each(function (polygon) {
        polygon.isActive = false;
      })

      updateCountryName();

      // update line chart data (again, modifying instead of setting new data for a nice animation)
      /*  for (var i = 0; i < lineChart.data.length; i++) {
         var di = this.timeLine[i];
         var dataContext = lineChart.data[i];

         dataContext.recovered = di.recovered;
         dataContext.confirmed = di.confirmed;
         dataContext.deaths = di.deaths;
         dataContext.active = di.confirmed - di.recovered - di.deaths;
         valueAxis.min = undefined;
         valueAxis.max = undefined;
       }

       lineChart.invalidateRawData(); */

      //updateTotals(currentIndex);
      chart.goHome();
    }





    /*





        // END OF MAP

        // top title
        var title = chart.titles.create();
        title.fontSize = "1.5em";
        title.text = "COVID-19 World Spread Data";
        title.align = "left";
        title.horizontalCenter = "left";
        title.marginLeft = 20;
        title.paddingBottom = 10;
        title.fill = am4core.color("#ffffff");
        title.y = 20;






        // Chart & slider container
        var chartAndSliderContainer = buttonsAndChartContainer.createChild(am4core.Container);
        chartAndSliderContainer.layout = "vertical";
        chartAndSliderContainer.height = am4core.percent(100);
        chartAndSliderContainer.width = am4core.percent(100);
        chartAndSliderContainer.background = new am4core.RoundedRectangle();
        chartAndSliderContainer.background.fill = am4core.color("#000000");
        //chartAndSliderContainer.background.cornerRadius(30, 30, 0, 0)
        chartAndSliderContainer.background.fillOpacity = 0.25;
        chartAndSliderContainer.paddingTop = 12;
        chartAndSliderContainer.paddingBottom = 0;

        // Slider container
        var sliderContainer = chartAndSliderContainer.createChild(am4core.Container);
        sliderContainer.width = am4core.percent(100);
        sliderContainer.padding(0, 15, 15, 10);
        sliderContainer.layout = "horizontal";

        var slider = sliderContainer.createChild(am4core.Slider);
        slider.width = am4core.percent(100);
        slider.valign = "middle";
        slider.background.opacity = 0.4;
        slider.opacity = 0.7;
        slider.background.fill = am4core.color("#ffffff");
        slider.marginLeft = 20;
        slider.marginRight = 35;
        slider.height = 15;
        slider.start = 1;


        // what to do when slider is dragged
        slider.events.on("rangechanged", (event) => {
          var index = Math.round((this.timeLine.length - 1) * slider.start);
          updateMapData(this.timeLine);
          updateTotals(index);
        })
        // stop animation if dragged
        slider.startGrip.events.on("drag", () => {
          stop();
          if (sliderAnimation) {
            sliderAnimation.setProgress(slider.start);
          }
        });

        // play button
        var playButton = sliderContainer.createChild(am4core.PlayButton);
        playButton.valign = "middle";
        // play button behavior
        playButton.events.on("toggled", function (event) {
          if (event.target.isActive) {
            play();
          } else {
            stop();
          }
        })
        // make slider grip look like play button
        slider.startGrip.background.fill = playButton.background.fill;
        slider.startGrip.background.strokeOpacity = 0;
        slider.startGrip.icon.stroke = am4core.color("#ffffff");
        slider.startGrip.background.states.copyFrom(playButton.background.states)


        // bubble size slider
        var sizeSlider = container.createChild(am4core.Slider);
        sizeSlider.orientation = "vertical";
        sizeSlider.height = am4core.percent(12);
        sizeSlider.marginLeft = 25;
        sizeSlider.align = "left";
        sizeSlider.valign = "top";
        sizeSlider.verticalCenter = "middle";
        sizeSlider.opacity = 0.7;
        sizeSlider.background.fill = am4core.color("#ffffff");
        sizeSlider.adapter.add("y", function (y, target) {
          return container.pixelHeight * (1 - buttonsAndChartContainer.percentHeight / 100) * 0.25;
        })

        sizeSlider.startGrip.background.fill = activeColor;
        sizeSlider.startGrip.background.fillOpacity = 0.8;
        sizeSlider.startGrip.background.strokeOpacity = 0;
        sizeSlider.startGrip.icon.stroke = am4core.color("#ffffff");
        sizeSlider.startGrip.background.states.getKey("hover").properties.fill = activeColor;
        sizeSlider.startGrip.background.states.getKey("down").properties.fill = activeColor;
        sizeSlider.horizontalCenter = "middle";


        sizeSlider.events.on("rangechanged", function () {
          sizeSlider.startGrip.scale = 0.75 + sizeSlider.start;
          bubbleSeries.heatRules.getIndex(0).max = 30 + sizeSlider.start * 100;
          circle.clones.each(function (clone) {
            clone.radius = clone.radius;
          })
        })


        var sizeLabel = container.createChild(am4core.Label);
        sizeLabel.text = "max bubble size *";
        sizeLabel.fill = am4core.color("#ffffff");
        sizeLabel.rotation = 90;
        sizeLabel.fontSize = "10px";
        sizeLabel.fillOpacity = 0.5;
        sizeLabel.horizontalCenter = "middle";
        sizeLabel.align = "left"
        sizeLabel.paddingBottom = 40;
        sizeLabel.tooltip.setBounds({ x: 0, y: 0, width: 200000, height: 200000 })
        sizeLabel.tooltip.label.wrap = true;
        sizeLabel.tooltip.label.maxWidth = 300;
        sizeLabel.tooltipText = "Some countries have so many cases that bubbles for countries with smaller values often look the same even if there is a significant difference between them. This slider can be used to increase maximum size of a bubble so that when you zoom in to a region with relatively small values you could compare them anyway."
        sizeLabel.fill = am4core.color("#ffffff");

        sizeLabel.adapter.add("y", (y, target) => {
          return container.pixelHeight * (1 - buttonsAndChartContainer.percentHeight / 100) * 0.25;
        })

        // filter slider

        // bubble size slider
        var filterSlider = container.createChild(am4core.Slider);
        filterSlider.orientation = "vertical";
        filterSlider.height = am4core.percent(28);
        filterSlider.marginLeft = 25;
        filterSlider.align = "left";
        filterSlider.valign = "top";
        filterSlider.verticalCenter = "middle";
        filterSlider.opacity = 0.7;
        filterSlider.background.fill = am4core.color("#ffffff");
        filterSlider.adapter.add("y", function (y, target) {
          return container.pixelHeight * (1 - buttonsAndChartContainer.percentHeight / 100) * 0.7;
        })

        filterSlider.startGrip.background.fill = activeColor;
        filterSlider.startGrip.background.fillOpacity = 0.8;
        filterSlider.startGrip.background.strokeOpacity = 0;
        filterSlider.startGrip.icon.stroke = am4core.color("#ffffff");
        filterSlider.startGrip.background.states.getKey("hover").properties.fill = activeColor;
        filterSlider.startGrip.background.states.getKey("down").properties.fill = activeColor;
        filterSlider.horizontalCenter = "middle";
        filterSlider.start = 1;


        filterSlider.events.on("rangechanged", () => {
          var maxValue = max[currentType] * filterSlider.start + 1;
          if (!isNaN(maxValue) && bubbleSeries.inited) {
            bubbleSeries.heatRules.getIndex(0).maxValue = maxValue;
            circle.clones.each((clone) => {
              if (clone.dataItem['value'] > maxValue) {
                clone.dataItem.hide();
              }
              else {
                clone.dataItem.show();
              }
              clone.radius = clone.radius;
            })
          }
        })


        var filterLabel = container.createChild(am4core.Label);
        filterLabel.text = "filter max values *";
        filterLabel.rotation = 90;
        filterLabel.fontSize = "10px";
        filterLabel.fill = am4core.color("#ffffff");
        filterLabel.fontSize = "0.8em";
        filterLabel.fillOpacity = 0.5;
        filterLabel.horizontalCenter = "middle";
        filterLabel.align = "left"
        filterLabel.paddingBottom = 40;
        filterLabel.tooltip.label.wrap = true;
        filterLabel.tooltip.label.maxWidth = 300;
        filterLabel.tooltipText = "This filter allows to remove countries with many cases from the map so that it would be possible to compare countries with smaller number of cases."
        filterLabel.fill = am4core.color("#ffffff");

        filterLabel.adapter.add("y", (y, target) => {
          return container.pixelHeight * (1 - buttonsAndChartContainer.percentHeight / 100) * 0.7;
        })



        // play behavior
        function play() {
          if (!sliderAnimation) {
            sliderAnimation = slider.animate({ property: "start", to: 1, from: 0 }, 50000, am4core.ease.linear).pause();
            sliderAnimation.events.on("animationended", () => {
              playButton.isActive = false;
            })
          }

          if (slider.start >= 1) {
            slider.start = 0;
            sliderAnimation.start();
          }
          sliderAnimation.resume();
          playButton.isActive = true;
        }

                // stop behavior
                function stop() {
                  if (sliderAnimation) {
                    sliderAnimation.pause();
                  }
                  playButton.isActive = false;
                }

    // BOTTOM CHART
    // https://www.amcharts.com/docs/v4/chart-types/xy-chart/
    var lineChart = chartAndSliderContainer.createChild(am4charts.XYChart);
    lineChart.fontSize = "0.8em";
    lineChart.paddingRight = 30;
    lineChart.paddingLeft = 30;
    lineChart.maskBullets = false;
    lineChart.zoomOutButton.disabled = true;
    lineChart.paddingBottom = 5;
    lineChart.paddingTop = 3;

    // make a copy of data as we will be modifying it
    lineChart.data = JSON.parse(JSON.stringify(this.timeLine));

    // date axis
    // https://www.amcharts.com/docs/v4/concepts/axes/date-axis/
    var dateAxis = lineChart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;
    dateAxis.renderer.grid.template.stroke = am4core.color("#000000");
    dateAxis.renderer.grid.template.strokeOpacity = 0.25;
    dateAxis.max = lastDate.getTime() + am4core.time.getDuration("day", 5);
    dateAxis.tooltip.label.fontSize = "0.8em";
    dateAxis.tooltip.background.fill = activeColor;
    dateAxis.tooltip.background.stroke = activeColor;
    dateAxis.renderer.labels.template.fill = am4core.color("#ffffff");

    dateAxis.renderer.labels.template.adapter.add("fillOpacity", (fillOpacity, target) => {
      return dateAxis.valueToPosition(target.dataItem['value']) + 0.1;
    })

    // value axis
    // https://www.amcharts.com/docs/v4/concepts/axes/value-axis/
    var valueAxis = lineChart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.opposite = true;
    valueAxis.interpolationDuration = 3000;
    valueAxis.renderer.grid.template.stroke = am4core.color("#000000");
    valueAxis.renderer.grid.template.strokeOpacity = 0.25;
    valueAxis.renderer.minGridDistance = 30;
    valueAxis.renderer.maxLabelPosition = 0.98;
    //valueAxis.renderer.baseGrid.disabled = true;
    valueAxis.tooltip.disabled = true;
    valueAxis.extraMax = 0.05;
    valueAxis.maxPrecision = 0;
    valueAxis.renderer.inside = true;
    valueAxis.renderer.labels.template.verticalCenter = "bottom";
    valueAxis.renderer.labels.template.fill = am4core.color("#ffffff");
    valueAxis.renderer.labels.template.padding(2, 2, 2, 2);
    valueAxis.adapter.add("max", (max, target) => {
      if (max < 5) {
        max = 5
      }
      return max;
    })

    valueAxis.adapter.add("min", (min, target) => {
      if (!seriesTypeSwitch.isActive) {
        if (min < 0) {
          min = 0;
        }
      }
      return min;
    })

    // cursor
    // https://www.amcharts.com/docs/v4/concepts/chart-cursor/
    lineChart.cursor = new am4charts.XYCursor();
    lineChart.cursor.maxTooltipDistance = 0;
    lineChart.cursor.behavior = "none"; // set zoomX for a zooming possibility
    lineChart.cursor.lineY.disabled = true;
    lineChart.cursor.lineX.stroke = activeColor;
    lineChart.cursor.xAxis = dateAxis;
    // this prevents cursor to move to the clicked location while map is dragged
    am4core.getInteraction().body.events.off("down", lineChart.cursor.handleCursorDown, lineChart.cursor)
    am4core.getInteraction().body.events.off("up", lineChart.cursor.handleCursorUp, lineChart.cursor)

    // legend
    // https://www.amcharts.com/docs/v4/concepts/legend/
    lineChart.legend = new am4charts.Legend();
    lineChart.legend.parent = lineChart.plotContainer;
    lineChart.legend.labels.template.fill = am4core.color("#ffffff");
    lineChart.legend.markers.template.height = 8;
    lineChart.legend.contentAlign = "left";
    //lineChart.legend.fontSize = "10px";
    lineChart.legend.itemContainers.template.valign = "middle";
    var legendDown = false;
    lineChart.legend.itemContainers.template.events.on("down", function () {
      legendDown = true;
    })
    lineChart.legend.itemContainers.template.events.on("up", function () {
      setTimeout(function () {
        legendDown = false;
      }, 100)
    })


    var seriesTypeSwitch = lineChart.legend.createChild(am4core.SwitchButton);
    seriesTypeSwitch.leftLabel.text = "totals";
    seriesTypeSwitch.rightLabel.text = "day change"
    seriesTypeSwitch.leftLabel.fill = am4core.color("#ffffff");
    seriesTypeSwitch.rightLabel.fill = am4core.color("#ffffff");

    seriesTypeSwitch.events.on("down", function () {
      legendDown = true;
    })
    seriesTypeSwitch.events.on("up", function () {
      setTimeout(function () {
        legendDown = false;
      }, 100)
    })

    seriesTypeSwitch.events.on("toggled", function () {
      if (seriesTypeSwitch.isActive) {
        if (!columnSeries) {
          createColumnSeries();
        }

        for (var key in columnSeries) {
          columnSeries[key].hide(0);
        }

        for (var key in series) {
          series[key].hiddenInLegend = true;
          series[key].hide();
        }

        columnSeries[currentType].show();
      }
      else {
        for (var key in columnSeries) {
          columnSeries[key].hiddenInLegend = true;
          columnSeries[key].hide();
        }

        for (var key in series) {
          series[key].hiddenInLegend = false;
          series[key].hide();
        }

        series[currentType].show();

      }
    })

    function updateColumnsFill() {
      columnSeries.active.columns.each(function (column) {
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


    // create series
    var activeSeries = addSeries("active", activeColor);
    // active series is visible initially
    activeSeries.tooltip.disabled = true;
    activeSeries.hidden = false;

    var confirmedSeries = addSeries("confirmed", confirmedColor);
    var recoveredSeries = addSeries("recovered", recoveredColor);
    var deathsSeries = addSeries("deaths", deathsColor);

    var series = { active: activeSeries, confirmed: confirmedSeries, recovered: recoveredSeries, deaths: deathsSeries };
    // add series
    function addSeries(name, color) {
      var series = lineChart.series.push(new am4charts.LineSeries())
      series.dataFields.valueY = name;
      series.dataFields.dateX = "date";
      series.name = capitalizeFirstLetter(name);
      series.strokeOpacity = 0.6;
      series.stroke = color;
      series.fill = color;
      series.maskBullets = false;
      series.minBulletDistance = 10;
      series.hidden = true;
      series.hideTooltipWhileZooming = true;


      // series bullet
      var bullet = series.bullets.push(new am4charts.CircleBullet());

      // only needed to pass it to circle
      var bulletHoverState = bullet.states.create("hover");
      bullet.setStateOnChildren = true;

      bullet.circle.fillOpacity = 1;
      bullet.circle.fill = backgroundColor;
      bullet.circle.radius = 2;

      var circleHoverState = bullet.circle.states.create("hover");
      circleHoverState.properties.fillOpacity = 1;
      circleHoverState.properties.fill = color;
      circleHoverState.properties.scale = 1.4;

      // tooltip setup
      series.tooltip.pointerOrientation = "down";
      series.tooltip.getStrokeFromObject = true;
      series.tooltip.getFillFromObject = false;
      series.tooltip.background.fillOpacity = 0.2;
      series.tooltip.background.fill = am4core.color("#000000");
      series.tooltip.dy = -4;
      series.tooltip.fontSize = "0.8em";
      series.tooltipText = "Total {name}: {valueY}";

      return series;
    }


    var series = { active: activeSeries, confirmed: confirmedSeries, recovered: recoveredSeries, deaths: deathsSeries };

    var columnSeries;

    function createColumnSeries() {
      columnSeries = {}
      columnSeries.active = addColumnSeries("active", activeColor);
      columnSeries.active.events.on("validated", function () {
        updateColumnsFill();
      })

      columnSeries.confirmed = addColumnSeries("confirmed", confirmedColor);
      columnSeries.recovered = addColumnSeries("recovered", recoveredColor);
      columnSeries.deaths = addColumnSeries("deaths", deathsColor);
    }

    // add series
    function addColumnSeries(name, color) {
      var series = lineChart.series.push(new am4charts.ColumnSeries())
      series.dataFields.valueY = name;
      series.dataFields.valueYShow = "previousChange";
      series.dataFields.dateX = "date";
      series.name = capitalizeFirstLetter(name);
      series.hidden = true;
      series.stroke = color;
      series.fill = color;
      series.columns.template.fillOpacity = 0.6;
      series.columns.template.strokeOpacity = 0;
      series.hideTooltipWhileZooming = true;
      series.clustered = false;
      series.hiddenInLegend = true;
      series.columns.template.width = am4core.percent(50);

      // tooltip setup
      series.tooltip.pointerOrientation = "down";
      series.tooltip.getStrokeFromObject = true;
      series.tooltip.getFillFromObject = false;
      series.tooltip.background.fillOpacity = 0.2;
      series.tooltip.background.fill = am4core.color("#000000");
      series.tooltip.fontSize = "0.8em";
      series.tooltipText = "{name}: {valueY.previousChange.formatNumber('+#,###|#,###|0')}";

      return series;
    }


    lineChart.plotContainer.events.on("up", function () {
      if (!legendDown) {
        slider.start = lineChart.cursor.xPosition * ((dateAxis.max - dateAxis.min) / (lastDate.getTime() - dateAxis.min));
      }
    })


    // data warning label
    var label = lineChart.plotContainer.createChild(am4core.Label);
    label.text = "Current day stats may be incomplete until countries submit their data.";
    label.fill = am4core.color("#ffffff");
    label.fontSize = "0.8em";
    label.paddingBottom = 4;
    label.opacity = 0.5;
    label.align = "right";
    label.horizontalCenter = "right";
    label.verticalCenter = "bottom";
*/
    // buttons & chart container
    var buttonsAndChartContainer = container.createChild(am4core.Container);
    buttonsAndChartContainer.layout = "vertical";
    buttonsAndChartContainer.height = am4core.percent(45); // make this bigger if you want more space for the chart
    buttonsAndChartContainer.width = am4core.percent(100);
    buttonsAndChartContainer.valign = "bottom";
    // country name and buttons container
    var nameAndButtonsContainer = buttonsAndChartContainer.createChild(am4core.Container)
    nameAndButtonsContainer.width = am4core.percent(100);
    nameAndButtonsContainer.padding(0, 10, 5, 20);
    nameAndButtonsContainer.layout = "horizontal";
    // name of a country and date label
    var countryName = nameAndButtonsContainer.createChild(am4core.Label);
    countryName.fontSize = "1.1em";
    countryName.fill = am4core.color("#3841a5");
    countryName.valign = "middle";
    // BUTTONS
    // create buttons
    var activeButton = addButton('active', activeColor);
    var confirmedButton = addButton('confirmed', confirmedColor);
    var recoveredButton = addButton('recovered', recoveredColor);
    var deathsButton = addButton('deaths', deathsColor);

    var buttons = { active: activeButton, confirmed: confirmedButton, recovered: recoveredButton, deaths: deathsButton };

    // add button
    function addButton(name, color) {
      var button = buttonsContainer.createChild(am4core.Button)
      button.label.valign = "middle"
      button.label.fill = am4core.color("#cccccc");
      button.label.fontSize = "11px";
      button.background.cornerRadius(30, 30, 30, 30);
      button.background.strokeOpacity = 0.3
      button.background.fillOpacity = 0;
      button.background.stroke = buttonStrokeColor;
      button.background.padding(2, 3, 2, 3);
      button.states.create("active");
      button.setStateOnChildren = true;

      var activeHoverState = button.background.states.create("hoverActive");
      activeHoverState.properties.fillOpacity = 0;

      var circle = new am4core.Circle();
      circle.radius = 8;
      circle.fillOpacity = 0.3;
      circle.fill = buttonStrokeColor;
      circle.strokeOpacity = 0;
      circle.valign = "middle";
      circle.marginRight = 5;
      button.icon = circle;

      // save name to dummy data for later use
      button.dummyData = name;

      var circleActiveState = circle.states.create("active");
      circleActiveState.properties.fill = color;
      circleActiveState.properties.fillOpacity = 0.5;

      button.events.on("hit", handleButtonClick);

      return button;
    }

    // handle button clikc
    function handleButtonClick(event) {
      // we saved name to dummy data
      changeDataType(event.target.dummyData);
    }

    // change data type (active/confirmed/recovered/deaths)
    function changeDataType(name) {
      currentType = name;
      currentTypeName = name;
      if (name != "active") {
        currentTypeName += " cases";
      }

      bubbleSeries.mapImages.template.tooltipText = "[bold]{name}: {value}[/] [font-size:10px]\n" + currentTypeName;

      // make button active
      var activeButton = buttons[name];
      activeButton.isActive = true;
      // make other buttons inactive
      for (var key in buttons) {
        if (buttons[key] != activeButton) {
          buttons[key].isActive = false;
        }
      }
      // tell series new field name
      polygonSeries.dataFields.value = name;
      bubbleSeries.dataFields.value = name + "PC";

      polygonSeries.dataItems.each((dataItem) => {
        dataItem.setValue("value", dataItem.dataContext[currentType]);
      })

      bubbleSeries.dataItems.each((dataItem) => {
        dataItem.setValue("value", dataItem.dataContext[currentType + "PC"]);
        dataItem.mapImage.defaultState.properties.fill = undefined;
      })


      // change color of bubbles
      // setting colors on mapImage for tooltip colors
      /* polygonSeries.mapPolygons.template.fill = colors[name];
      polygonSeries.mapPolygons.template.stroke = colors[name]; */
      // first child is circle
      /* polygonSeries.mapPolygons.template.children.getIndex(0).fill = colors[name]; */

      polygonSeries.heatRules.push({
        max: colors[name],
        min: am4core.color("rgb(255, 255, 255)"),
        property: "fill",
        target: polygonSeries.mapPolygons.template,
      });
      /* dateAxis.tooltip.background.fill = colors[name];
      dateAxis.tooltip.background.stroke = colors[name];
      lineChart.cursor.lineX.stroke = colors[name];

      // show series
      if (seriesTypeSwitch.isActive) {
        var currentSeries = columnSeries[name];
        currentSeries.show();
        // hide other series
        for (var key in columnSeries) {
          if (columnSeries[key] != currentSeries) {
            columnSeries[key].hide();
          }
        }
      }
      else {
        var currentSeries = series[name];
        currentSeries.show();
        // hide other series
        for (var key in series) {
          if (series[key] != currentSeries) {
            series[key].hide();
          }
        }
      }
*/
      // update heat rule's maxValue
      polygonSeries.heatRules.getIndex(0).maxValue = max[currentType];
      bubbleSeries.heatRules.getIndex(0).maxValue = maxPC[currentType];
      if (perCapita) {
        polygonSeries.heatRules.getIndex(0).max = colors[name];
        updateCountryTooltip();
      }
    }

    /*
              // update total values in buttons
              function updateTotals(index?: number) {
                if (index) {
                  let date = new Date(this.timeLine[index].date || null);
                  currentDate = date;

                  updateCountryName();

                  var position = dateAxis.dateToPosition(date);
                  position = dateAxis.toGlobalPosition(position);
                  var x = dateAxis.positionToCoordinate(position);

                  if (lineChart.cursor) {
                    lineChart.cursor.triggerMove({ x: x, y: 0 }, "soft", true);
                  }
                  for (var key in buttons) {
                    var count = Number(lineChart.data[index][key])
                    if (!isNaN(count)) {
                      buttons[key].label.text = capitalizeFirstLetter(key) + ": " + numberFormatter.format(count, '#,###');
                    }
                  }
                  currentIndex = index;
                }
              }
   */



    // update map data
    function updateMapData(data) {
      //modifying instead of setting new data for a nice animation
      bubbleSeries.dataItems.each((dataItem) => {
        dataItem.dataContext['confirmed'] = 0;
        dataItem.dataContext['deaths'] = 0;
        dataItem.dataContext['recovered'] = 0;
        dataItem.dataContext['active'] = 0;
      })

      maxPC = { active: 0, confirmed: 0, deaths: 0, recovered: 0 };

      for (var i = 0; i < data.length; i++) {
        var di = data[i];
        var image = bubbleSeries.getImageById(di.id);
        var polygon = polygonSeries.getPolygonById(di.id);

        if (image) {
          var population = Number(populations[image.dataItem.dataContext['id']]);

          image.dataItem.dataContext['confirmed'] = di.confirmed;
          image.dataItem.dataContext['deaths'] = di.deaths;
          image.dataItem.dataContext['recovered'] = di.recovered;
          image.dataItem.dataContext['active'] = di.confirmed - di.recovered - di.deaths;
        }

        if (polygon) {
          polygon.dataItem.dataContext['confirmedPC'] = di.confirmed / population * 1000000;
          polygon.dataItem.dataContext['deathsPC'] = di.deaths / population * 1000000;
          polygon.dataItem.dataContext['recoveredPC'] = di.recovered / population * 1000000;
          polygon.dataItem.dataContext['active'] = di.confirmed - di.recovered - di.deaths;
          polygon.dataItem.dataContext['activePC'] = polygon.dataItem.dataContext['active'] / population * 1000000;

          if (population > 100000) {
            if (polygon.dataItem.dataContext['confirmedPC'] > maxPC.confirmed) {
              maxPC.confirmed = polygon.dataItem.dataContext['confirmedPC'];
            }
            if (polygon.dataItem.dataContext['deathsPC'] > maxPC.deaths) {
              maxPC.deaths = polygon.dataItem.dataContext['deathsPC   '];
            }
            if (polygon.dataItem.dataContext['recoveredPC'] > maxPC.recovered) {
              maxPC.recovered = polygon.dataItem.dataContext['recoveredPC'];
            }
            if (polygon.dataItem.dataContext['activePC'] > maxPC.active) {
              maxPC.active = polygon.dataItem.dataContext['activePC'];
            }
          }
        }

        bubbleSeries.heatRules.getIndex(0).maxValue = max[currentType];
        polygonSeries.heatRules.getIndex(0).maxValue = maxPC[currentType];

        bubbleSeries.invalidateRawData();
        polygonSeries.invalidateRawData();
      }
    }

    // capitalize first letter
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }




    /*  container.events.on("layoutvalidated", function () {
       dateAxis.tooltip.hide();
       lineChart.cursor.hide();
       updateTotals(currentIndex);
     }); */

    // set initial data and names
    updateCountryName();
    changeDataType("active");


    //setTimeout(updateSeriesTooltip, 3000);






    function idToName(id) {
      return am4geodata_data_countries2[id] ? am4geodata_data_countries2[id].country : id == "XX" ? "Others" : id;
    }



    // updates country name and date
    function updateCountryName() {
      countryName.text = currentCountry + ", " + chart.dateFormatter.format(currentDate, "MMM dd, yyyy");
    }


    function updateCountryTooltip() {
      polygonSeries.mapPolygons.template.tooltipText = "[bold]{name}: {value.formatNumber('#.')}[/]\n[font-size:10px]" + currentTypeName + " per million"
    }




  }
  ngOnDestroy() {
    //this.chart.dispose();
  }

}

