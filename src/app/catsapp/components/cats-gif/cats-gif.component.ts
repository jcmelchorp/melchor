import { Component, OnInit } from '@angular/core';

import { faFacebook, faTwitter, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

import { GliphyService } from './../../services/gliphy.service';

import { DataGif } from './dataGif';

@Component({
  selector: 'app-cats-gif',
  templateUrl: './cats-gif.component.html',
  styleUrls: ['./cats-gif.component.scss']
})
export class CatsGifComponent implements OnInit {
  recip: DataGif;
  facebook = faFacebook; twitter = faTwitter; instagram = faInstagram; whatsapp = faWhatsapp;
  constructor(private giphyService: GliphyService) { }
  givemeGif() {
    this.giphyService.getGif().subscribe((data: any) => {
      this.recip = data.data;
      console.log(this.recip);
    });
  }
  async ngOnInit() {
    this.givemeGif();
  }

}
