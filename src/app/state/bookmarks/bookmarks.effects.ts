import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BookmarkApiService } from '../../core/services/bookmark-api.service';
import * as BookmarksActions from './bookmarks.actions';
import { catchError, map, switchMap, of } from 'rxjs';

@Injectable()
export class BookmarksEffects {

  private actions$ = inject(Actions);
  private api = inject(BookmarkApiService);

  loadBookmarks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookmarksActions.loadBookmarks),
      switchMap(() =>
        this.api.getAll().pipe(
          map((bookmarks) =>
            BookmarksActions.loadBookmarksSuccess({ bookmarks })
          ),
          catchError((error) =>
            of(
              BookmarksActions.loadBookmarksFailure({
                error: error?.message ?? 'Failed to load bookmarks',
              })
            )
          )
        )
      )
    )
  );
}
