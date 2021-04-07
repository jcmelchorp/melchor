import { Component, Input, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import { faBars, faGlobe, faLightbulb } from '@fortawesome/free-solid-svg-icons';

import { TranslateService } from '@ngx-translate/core';

import { Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { SubscriptionService } from 'src/app/shared/services';

import { LayoutService } from '../../services/layout.service';
import { ThemeService } from '../../services/theme.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() isHandset: boolean;
  isDarkTheme: Observable<boolean>;
  
  faGlobe = faGlobe;
  faBars = faBars;
  constructor(
    public translate: TranslateService,
    private layoutService: LayoutService,
    public themeService: ThemeService,
    private subService: SubscriptionService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'en',
      sanitizer.bypassSecurityTrustResourceUrl('assets/flags/en.svg')
    );
    iconRegistry.addSvgIcon(
      'es',
      sanitizer.bypassSecurityTrustResourceUrl('assets/flags/es.svg')
    );
  }
  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
  }
  switchLang(lang: string) {
    this.translate.use(lang);
  }
  toggleDarkTheme() {
    this.themeService.toggleDarkTheme();
  }
  toggleSidenavLeft($event: any) {
    this.layoutService.toggleSidenavLeft.emit($event);
  }
  ngOnDestroy() {
    this.subService.unsubscribeComponent$;
  }
}
