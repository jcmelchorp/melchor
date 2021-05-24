import { Component, OnInit } from '@angular/core';

import { faFacebook, faTwitter, faWhatsapp, faGithub } from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: 'app-catsapp-footer',
  templateUrl: './catsapp-footer.component.html',
  styleUrls: ['./catsapp-footer.component.scss']
})
export class CatsappFooterComponent implements OnInit {
  facebook = faFacebook; twitter = faTwitter; whatsapp = faWhatsapp; github = faGithub;

  constructor() { }

  ngOnInit(): void {
  }

}
