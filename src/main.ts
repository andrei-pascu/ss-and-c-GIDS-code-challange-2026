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
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { importProvidersFrom } from '@angular/core';

import { BookmarkDataService } from './app/core/in-memory/bookmark-data.service';
// import { BookmarksEffects } from './app/state/bookmarks/bookmarks.effects';
import { BookmarksEffects } from './app/state/bookmarks/bookmarks.effects';

bootstrapApplication(AppComponent, {
  providers: [

    provideRouter(routes),

    provideStore(),
    provideState(bookmarksFeature),
    provideEffects(BookmarksEffects),

    // ✅ 1. Register HttpClient FIRST
    provideHttpClient(withInterceptorsFromDi()),

    // ✅ 2. Then attach in-memory module
    importProvidersFrom(
      HttpClientInMemoryWebApiModule.forRoot(
        BookmarkDataService,
        { delay: 300 }
      )
    ),

    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),

  ],
});

