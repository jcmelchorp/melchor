import { Component } from '@angular/core';

@Component({
  selector: 'app-infographics',
  templateUrl: './infographics.component.html',
  styleUrls: ['./infographics.component.scss'],
})
export class InfographicsComponent {
  itemsPerSlide = 3;
  singleSlideOffset = true;
  noWrap = true;

  slides = [
    { image: 'assets/infographics/info01.png' },
    { image: 'assets/infographics/info04.jpg' },
    { image: 'assets/infographics/info06.jpg' },
    { image: 'assets/infographics/info09.jpeg' },
    { image: 'assets/infographics/info05.jpg' },
    { image: 'assets/infographics/info08.jpg' },
    { image: 'assets/infographics/info10.jpg' },
    { image: 'assets/infographics/info02.png' },

    { image: 'assets/infographics/info07.jpg' },

    { image: 'assets/infographics/info03.jpg' },
    { image: 'assets/infographics/info06.png' },
    { image: 'assets/infographics/info07.png' },

    { image: 'assets/infographics/info01.jpg' },
    { image: 'assets/infographics/info02.jpg' },
  ];
}
