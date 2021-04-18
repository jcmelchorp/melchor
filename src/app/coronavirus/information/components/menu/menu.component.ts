import { Component, OnInit } from '@angular/core';
import { CardItemContent } from '../../models/card-item-content';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  constructor() {}
  cardItems: CardItemContent[] = [
    {
      title: 'Riesgo laboral',
      description:
        'Tabla con porcentajes de riesgo laboral para contraer COVID-19',
      route_link: '/information/covid-risk',
      imageUrl: 'assets/background/covid-banner-01-1280x256.jpg',
    },
    {
      title: 'Nueva normalidad',
      description: '¿Cuándo? o, ¿A caso regresará la vida a una normalidad?',
      route_link: '/information/return-to-normal',
      imageUrl: 'assets/background/covid-banner-02-1280x256.jpg',
    },
    {
      title: 'Infografías',
      description:
        'Descarga anuncios e imagenes tipo poster para informar a tu comunidad',
      route_link: '/information/covid-risk',
      imageUrl: 'assets/background/covid-banner-03-1280x256.jpg',
    },
  ];
  ngOnInit(): void {}
}
