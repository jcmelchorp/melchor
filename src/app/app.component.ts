import { Component } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { SeoService } from './shared/services';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'App Name';
  constructor(
    private seoService: SeoService,
    public translate: TranslateService,
  ) {
    translate.addLangs(['es', 'en']);
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use(translate.getBrowserLang());
    seoService.titleInit();
    seoService.generateTags({
      title: this.title,
      description: 'Personal site',
      image: ''
    });
  }

}
