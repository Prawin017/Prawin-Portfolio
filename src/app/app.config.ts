import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay, withHttpTransferCacheOptions } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(
      withEventReplay(),
      withHttpTransferCacheOptions({
        filter: (req) => {
          // Do not cache the hero endpoint so live counts are always retrieved on hydration
          return !req.url.includes('/api/hero');
        }
      })
    ),
    provideHttpClient()
  ]
};
