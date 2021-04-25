import { Component } from '@angular/core';

import { CarouselSlide } from './../../../shared/models/carousel-slide.model';
@Component({
  selector: 'app-wellcome',
  templateUrl: './wellcome.component.html',
  styleUrls: ['./wellcome.component.scss']
})
export class WellcomeComponent {
  defaultElevation = 4;
  raisedElevation = 6;
  cardItems: CarouselSlide[] = [
    {
      title: 'Riesgo laboral',
      description:
        'Tabla con porcentajes de riesgo laboral para contraer COVID-19',
      route_link: '/information/covid-risk',
      imageUrl: 'assets/background/covid-banner-01-2560x512.png',
    },
    {
      title: 'Nueva normalidad',
      description: '¿Cuándo? o, ¿A caso regresará la vida a una normalidad?',
      route_link: '/information/return-to-normal',
      imageUrl: 'assets/background/covid-banner-02-2560x512.png',
    },
    {
      title: 'Infografías',
      description:
        'Descarga anuncios e imagenes tipo poster para informar a tu comunidad',
      route_link: '/information/covid-risk',
      imageUrl: 'assets/background/covid-banner-03-1280x256.jpg',
    },
  ];

}
