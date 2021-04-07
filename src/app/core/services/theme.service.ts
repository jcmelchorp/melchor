import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable()
export class ThemeService {
  private isDark: boolean;
  private _darkTheme = new Subject<boolean>();
  isDarkTheme = this._darkTheme.asObservable();

  setDarkTheme(isDarkTheme: boolean): void {
    this._darkTheme.next(isDarkTheme);
  }
  toggleDarkTheme(): void {
    this.isDarkTheme.subscribe(isDark => this.isDark = isDark)
    this._darkTheme.next(!this.isDark);
  }
}
