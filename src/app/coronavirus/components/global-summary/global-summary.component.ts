import { AfterViewInit, Component, Input, SimpleChanges, NgZone, OnDestroy } from '@angular/core';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_worldHigh from '@amcharts/amcharts4-geodata/worldHigh';
import am4geodata_ultraWorld from '@amcharts/amcharts4-geodata/worldUltra';
import am4geodata_data_countries2 from '@amcharts/amcharts4-geodata/data/countries2';
import am4geodata_lang_ES from '@amcharts/amcharts4-geodata/lang/ES';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

import { max } from 'rxjs/internal/operators/max';

import { CountryData, Summary } from '../../models/covid.model';

@Component({
  selector: 'app-global-summary',
  templateUrl: './global-summary.component.html',
  styleUrls: ['./global-summary.component.scss']
})
export class GlobalSummaryComponent implements AfterViewInit, OnDestroy {
  @Input() countries: CountryData[];
  chart: am4maps.MapChart;
  polygonSeries: am4maps.MapPolygonSeries;

  countryColor = am4core.color("#74B266");
  activeColor = am4core.color("#ff8726");
  confirmedColor = am4core.color("#d21a1a");
  recoveredColor = am4core.color("#45d21a");
  deathsColor = am4core.color("#1c5fe5");
  countryStrokeColor = am4core.color("#000000");
  countryHoverColor = am4core.color("#367B25");
  activeCountryColor = am4core.color("#367B25");
  backgroundColor = am4core.color("#1e2128");
  titleColor = am4core.color("#333333")
  container: am4core.Container;
  bubbleSeries: any;
  filterSlider: am4core.Slider;
  sizeLabel: am4core.Label;
  sizeSlider: am4core.Slider;
  sliderContainer: any;
  chartAndSliderContainer: any;
  buttonsAndChartContainer: any;
  nameAndButtonsContainer: any;
  buttonsContainer: any;
  countryName: any;
  mapGlobeSwitch: am4core.SwitchButton;
  slider: any;
  filterLabel: am4core.Label;
  currentType: any;
  currentTypeName: any;
  populations: any;
  colors: { active: am4core.Color; confirmed: am4core.Color; recovered: am4core.Color; deaths: am4core.Color; };
  absolutePerCapitaSwitch: am4core.SwitchButton;
  maxPC: { active: number; confirmed: number; deaths: number; recovered: number; };
  heatLegend: any;
  polygonTemplate: am4maps.MapPolygon;
  constructor(private ngZone: NgZone) {
    this.colors = { active: this.activeColor, confirmed: this.confirmedColor, recovered: this.recoveredColor, deaths: this.deathsColor };
    this.populations = {
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
  }
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
    am4core.useTheme(am4themes_animated);
    var chart = am4core.create("chartmap", am4maps.MapChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.geodata = am4geodata_worldHigh;
    chart.projection = new am4maps.projections.Miller();

    var title = chart.chartContainer.createChild(am4core.Label);
    title.text = "Life expectancy in the World";
    title.fontSize = 20;
    title.paddingTop = 30;
    title.align = "center";
    title.zIndex = 100;

    var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.dataFields.id = "id";
    polygonSeries.dataFields.value = "totalRecovered";

    polygonSeries.interpolationDuration = 0;
    var polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}: {value.value.formatNumber('#.0')}";
    polygonSeries.heatRules.push({
      property: "fill",
      target: polygonSeries.mapPolygons.template,
      min: am4core.color("#ffffff"),
      max: am4core.color("#AAAA00"),

    });
    polygonSeries.useGeodata = true;

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
      if (!isNaN(mapPolygon.dataItem.value)) {
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
    //console.log(polygonSeries.data = JSON.parse(JSON.stringify(this.countries))
    polygonSeries.data = JSON.parse(JSON.stringify(this.renameFields(this.countries)));

    /*  polygonSeries.data = [
       { id: "AF", value: 60.524 },
       { id: "AL", value: 77.185 },
       { id: "DZ", value: 70.874 },
       { id: "AO", value: 51.498 },
       { id: "AR", value: 76.128 },
       { id: "AM", value: 74.469 },
       { id: "AU", value: 82.364 },
       { id: "AT", value: 80.965 },
       { id: "AZ", value: 70.686 },
       { id: "BH", value: 76.474 },
       { id: "BD", value: 70.258 },
       { id: "BY", value: 69.829 },
       { id: "BE", value: 80.373 },
       { id: "BJ", value: 59.165 },
       { id: "BT", value: 67.888 },
       { id: "BO", value: 66.969 },
       { id: "BA", value: 76.211 },
       { id: "BW", value: 47.152 },
       { id: "BR", value: 73.667 },
       { id: "BN", value: 78.35 },
       { id: "BG", value: 73.448 },
       { id: "BF", value: 55.932 },
       { id: "BI", value: 53.637 },
       { id: "KH", value: 71.577 },
       { id: "CM", value: 54.61 },
       { id: "CA", value: 81.323 },
       { id: "CV", value: 74.771 },
       { id: "CF", value: 49.517 },
       { id: "TD", value: 50.724 },
       { id: "CL", value: 79.691 },
       { id: "CN", value: 75.178 },
       { id: "CO", value: 73.835 },
       { id: "KM", value: 60.661 },
       { id: "CD", value: 49.643 },
       { id: "CG", value: 58.32 },
       { id: "CR", value: 79.712 },
       { id: "CI", value: 50.367 },
       { id: "HR", value: 76.881 },
       { id: "CU", value: 79.088 },
       { id: "CY", value: 79.674 },
       { id: "CZ", value: 77.552 },
       { id: "DK", value: 79.251 },
       { id: "GL", value: 79.251 },
       { id: "DJ", value: 61.319 },
       { id: "DO", value: 73.181 },
       { id: "EC", value: 76.195 },
       { id: "EG", value: 70.933 },
       { id: "SV", value: 72.361 },
       { id: "GQ", value: 52.562 },
       { id: "ER", value: 62.329 },
       { id: "EE", value: 74.335 },
       { id: "ET", value: 62.983 },
       { id: "FJ", value: 69.626 },
       { id: "FI", value: 80.362 },
       { id: "FR", value: 81.663 },
       { id: "GA", value: 63.115 },
       { id: "GF", value: 79.9 },
       { id: "GM", value: 58.59 },
       { id: "GE", value: 74.162 },
       { id: "DE", value: 80.578 },
       { id: "GH", value: 60.979 },
       { id: "GR", value: 80.593 },
       { id: "GT", value: 71.77 },
       { id: "GN", value: 55.865 },
       { id: "GW", value: 54.054 },
       { id: "GY", value: 66.134 },
       { id: "HT", value: 62.746 },
       { id: "HN", value: 73.503 },
       { id: "HK", value: 83.199 },
       { id: "HU", value: 74.491 },
       { id: "IS", value: 81.96 },
       { id: "IN", value: 66.168 },
       { id: "ID", value: 70.624 },
       { id: "IR", value: 73.736 },
       { id: "IQ", value: 69.181 },
       { id: "IE", value: 80.531 },
       { id: "IL", value: 81.641 },
       { id: "IT", value: 82.235 },
       { id: "JM", value: 73.338 },
       { id: "JP", value: 83.418 },
       { id: "JO", value: 73.7 },
       { id: "KZ", value: 66.394 },
       { id: "KE", value: 61.115 },
       { id: "KP", value: 69.701 },
       { id: "KR", value: 81.294 },
       { id: "KW", value: 74.186 },
       { id: "KG", value: 67.37 },
       { id: "LA", value: 67.865 },
       { id: "LV", value: 72.045 },
       { id: "LB", value: 79.716 },
       { id: "LS", value: 48.947 },
       { id: "LR", value: 60.23 },
       { id: "LY", value: 75.13 },
       { id: "LT", value: 71.942 },
       { id: "LU", value: 80.371 },
       { id: "MK", value: 75.041 },
       { id: "MG", value: 64.28 },
       { id: "MW", value: 54.798 },
       { id: "MY", value: 74.836 },
       { id: "ML", value: 54.622 },
       { id: "MR", value: 61.39 },
       { id: "MU", value: 73.453 },
       { id: "MX", value: 77.281 },
       { id: "MD", value: 68.779 },
       { id: "MN", value: 67.286 },
       { id: "ME", value: 74.715 },
       { id: "MA", value: 70.714 },
       { id: "EH", value: 70.714 },
       { id: "MZ", value: 49.91 },
       { id: "MM", value: 65.009 },
       { id: "NA", value: 64.014 },
       { id: "NP", value: 67.989 },
       { id: "NL", value: 80.906 },
       { id: "NZ", value: 80.982 },
       { id: "NI", value: 74.515 },
       { id: "NE", value: 57.934 },
       { id: "NG", value: 52.116 },
       { id: "NO", value: 81.367 },
       { id: "SJ", value: 81.367 },
       { id: "OM", value: 76.287 },
       { id: "PK", value: 66.42 },
       { id: "PA", value: 77.342 },
       { id: "PG", value: 62.288 },
       { id: "PY", value: 72.181 },
       { id: "PE", value: 74.525 },
       { id: "PH", value: 68.538 },
       { id: "PL", value: 76.239 },
       { id: "PT", value: 79.732 },
       { id: "QA", value: 78.231 },
       { id: "RO", value: 73.718 },
       { id: "RU", value: 67.874 },
       { id: "RW", value: 63.563 },
       { id: "SA", value: 75.264 },
       { id: "SN", value: 63.3 },
       { id: "RS", value: 73.934 },
       { id: "SL", value: 45.338 },
       { id: "SG", value: 82.155 },
       { id: "SK", value: 75.272 },
       { id: "SI", value: 79.444 },
       { id: "SB", value: 67.465 },
       { id: "SO", value: 54 },
       { id: "ZA", value: 56.271 },
       { id: "SS", value: 54.666 },
       { id: "ES", value: 81.958 },
       { id: "LK", value: 74.116 },
       { id: "SD", value: 61.875 },
       { id: "SR", value: 70.794 },
       { id: "SZ", value: 48.91 },
       { id: "SE", value: 81.69 },
       { id: "CH", value: 82.471 },
       { id: "SY", value: 71 },
       { id: "TW", value: 79.45 },
       { id: "TJ", value: 67.118 },
       { id: "TZ", value: 60.885 },
       { id: "TH", value: 74.225 },
       { id: "TL", value: 67.033 },
       { id: "TG", value: 56.198 },
       { id: "TT", value: 69.761 },
       { id: "TN", value: 75.632 },
       { id: "TR", value: 74.938 },
       { id: "TM", value: 65.299 },
       { id: "UG", value: 58.668 },
       { id: "UA", value: 68.414 },
       { id: "AE", value: 76.671 },
       { id: "GB", value: 80.396 },
       { id: "US", value: 78.797 },
       { id: "UY", value: 77.084 },
       { id: "UZ", value: 68.117 },
       { id: "VE", value: 74.477 },
       { id: "PS", value: 73.018 },
       { id: "VN", value: 75.793 },
       { id: "YE", value: 62.923 },
       { id: "ZM", value: 57.037 },
       { id: "ZW", value: 58.142 }
     ]; */
    console.log(polygonSeries.data)
  }
  idToName(id) {
    return am4geodata_data_countries2[id] ? am4geodata_data_countries2[id].country : id == "XX" ? "Others" : id;
  }
  // update map data
  updateMapData(data) {
    //modifying instead of setting new data for a nice animation
    this.bubbleSeries.dataItems.each((dataItem) => {
      dataItem.dataContext.confirmed = 0;
      dataItem.dataContext.deaths = 0;
      dataItem.dataContext.recovered = 0;
      dataItem.dataContext.active = 0;

    })

    this.maxPC = { active: 0, confirmed: 0, deaths: 0, recovered: 0 };

    for (var i = 0; i < data.length; i++) {
      var di = data[i];
      var image = this.bubbleSeries.getImageById(di.id);
      var polygon = this.polygonSeries.getPolygonById(di.id);

      if (image) {
        var population = Number(this.populations[image.dataItem.dataContext.id]);

        image.dataItem.dataContext.confirmed = di.confirmed;
        image.dataItem.dataContext.deaths = di.deaths;
        image.dataItem.dataContext.recovered = di.recovered;
        image.dataItem.dataContext.active = di.confirmed - di.recovered - di.deaths;
      }

      if (polygon) {
        polygon.dataItem.dataContext['confirmedPC'] = di.confirmed / population * 1000000;
        polygon.dataItem.dataContext['deathsPC'] = di.deaths / population * 1000000;
        polygon.dataItem.dataContext['recoveredPC'] = di.recovered / population * 1000000;
        polygon.dataItem.dataContext['active'] = di.confirmed - di.recovered - di.deaths;
        polygon.dataItem.dataContext['activePC'] = polygon.dataItem.dataContext['active'] / population * 1000000;

        if (population > 100000) {
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

      this.bubbleSeries.heatRules.getIndex(0).maxValue = max[this.currentType];
      this.polygonSeries.heatRules.getIndex(0).maxValue = this.maxPC[this.currentType];

      this.bubbleSeries.invalidateRawData();
      this.polygonSeries.invalidateRawData();
    }
  }
  updateCountryTooltip() {
    this.polygonSeries.mapPolygons.template.tooltipText = "[bold]{name}: {value.formatNumber('#.')}[/]\n[font-size:10px]" + this.currentTypeName + " per million"
  }
  // function that returns current slide
  // if index is not set, get last slide
  getSlideData() {
    var data = this.countries;

    /*  // augment with names
     for (var i = 0; i < data.length; i++) {
       data[i].Country = this.idToName(data[i].ID);
     }
  */
    return data;
  }
  handleHover(mapPolygon) {
    if (!isNaN(mapPolygon.dataItem.value)) {
      this.heatLegend.valueAxis.showTooltipAt(mapPolygon.dataItem.value);
    } else {
      this.heatLegend.valueAxis.hideTooltip();
    }
  }
  createMarkers(chart: am4maps.MapChart) {
    console.log('calling createMarkers');
    const mapImageSeries = chart.series.push(new am4maps.MapImageSeries());
    this.countries.forEach(country => {
      let imageSeriesTemplate = mapImageSeries.mapImages.template;
      let circle = imageSeriesTemplate.createChild(am4core.Circle);
      circle.radius = 10;
      circle.fill = am4core.color('#ff0000');
      circle.stroke = am4core.color('#FFFFFF');
      circle.strokeWidth = 2;
      circle.nonScaling = true;
      circle.tooltipText = 'hi';
      imageSeriesTemplate.propertyFields.latitude = 'latitude';
      imageSeriesTemplate.propertyFields.longitude = 'longitude';
      //mapImageSeries.data =
    })
    return chart;
  }
  ngOnDestroy() {
    this.chart.dispose();
  }
}
