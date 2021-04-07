import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';

import { TranslateService } from '@ngx-translate/core';

import { Observable } from 'rxjs';

import { LayoutService, ThemeService } from '../../services';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  defaultElevation = 4;
  raisedElevation = 6;
  faSun = faSun;
  faMoon = faMoon;
  langs: string[];
  langForm: FormGroup;
  isDarkTheme: Observable<boolean>;
  constructor(
    public translate: TranslateService,
    private layoutService: LayoutService,
    public themeService: ThemeService,
    private fb: FormBuilder,
  ) {
    this.langs = translate.getLangs();
    this.langForm = this.fb.group({
      selectedLang: new FormControl(translate.currentLang)
    });
  }
  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
  }
  switchLang(lang: string) {

    this.translate.use(lang);

  }
  toggleDarkTheme(isDark: boolean) {
    this.themeService.setDarkTheme(isDark);
  }

}
