import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BookmarkApiService } from '../../core/services/bookmark-api.service';
import * as BookmarksActions from './bookmarks.actions';
import { catchError, map, switchMap, of, tap } from 'rxjs';

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

  deleteBookmark$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookmarksActions.deleteBookmark),
      switchMap(({ id }) =>
      this.api.delete(id).pipe(
          map(() =>
            BookmarksActions.deleteBookmarkSuccess({ id })
          ),
          catchError((error) =>
          of(
              BookmarksActions.deleteBookmarkFailure({
              error: error?.message ?? 'Delete failed'
              })
          )
          )
        )
      )
    )
  );

  createBookmark$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookmarksActions.createBookmark),
      switchMap(({ bookmark }) =>
        this.api.create(bookmark).pipe(
          map((created) =>
            BookmarksActions.createBookmarkSuccess({ bookmark: created })
          ),
          catchError((error) =>
            of(
              BookmarksActions.createBookmarkFailure({
                error: error?.message ?? 'Create failed'
              })
            )
          )
        )
      )
    )
  );

  updateBookmark$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookmarksActions.updateBookmark),
      switchMap(({ bookmark }) =>
        this.api.update(bookmark).pipe(
          switchMap(() =>
            this.api.getAll().pipe(
              map(bookmarks =>
                BookmarksActions.loadBookmarksSuccess({ bookmarks })
              )
            )
          ),
          catchError(error =>
            of(BookmarksActions.updateBookmarkFailure({
              error: error?.message ?? 'Update failed'
            }))
          )
        )
      )
    )
  );
}