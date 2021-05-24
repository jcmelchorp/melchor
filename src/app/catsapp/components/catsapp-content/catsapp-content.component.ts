import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-catsapp-content',
  templateUrl: './catsapp-content.component.html',
  styleUrls: ['./catsapp-content.component.scss']
})
export class CatsappContentComponent {
  @Input() isHandset: boolean;


}
