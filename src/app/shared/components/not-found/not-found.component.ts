import { Component, OnInit } from '@angular/core';
import { faVirus } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  virus = faVirus;
  constructor(public translate: TranslateService) {}
  switchLang(lang: string) {
    this.translate.use(lang);
  }
  ngOnInit(): void {}
}
