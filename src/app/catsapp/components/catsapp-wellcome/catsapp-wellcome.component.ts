import { Component } from '@angular/core';

import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-catsapp-wellcome',
  templateUrl: './catsapp-wellcome.component.html',
  styleUrls: ['./catsapp-wellcome.component.scss'],
})
export class CatsappWellcomeComponent {
  link = faExternalLinkAlt;

}
