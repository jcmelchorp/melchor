import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { LayoutService } from '../services/layout.service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isDarkTheme: Observable<boolean>;
  isHandset$: Observable<boolean>;
  loading = false;
  constructor(
    private themeService: ThemeService,
    private layoutService: LayoutService,
    private overlay: OverlayContainer,
    private router: Router
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event)
    });
  }
  ngOnInit(): void {
    this.isDarkTheme = this.themeService.isDarkTheme;
    this.isDarkTheme.subscribe(isDark => {
      if (isDark) {
        this.overlay.getContainerElement().classList.add('dark-theme');
      } else {
        this.overlay.getContainerElement().classList.remove('dark-theme');
      }
    });
    this.isHandset$ = this.layoutService.isHandset$;
  }

  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    switch (true) {
      case event instanceof NavigationStart: {
        this.loading = true;
        break;
      }
      case event instanceof NavigationEnd:
      case event instanceof NavigationCancel:
      case event instanceof NavigationError: {
        this.loading = false;
        break;
      }
      default: {
        break;
      }
    }
  }
}
