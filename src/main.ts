import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { isDevMode } from '@angular/core';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

import { provideState } from '@ngrx/store';
import { bookmarksFeature } from './app/state/bookmarks/bookmarks.reducer';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),

    // Root Store
    provideStore(),
    
    // Feature State
    provideState(bookmarksFeature),

    // Root Effects
    provideEffects(),

    // DevTools
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
  ],
}).catch((err) => console.error(err));
