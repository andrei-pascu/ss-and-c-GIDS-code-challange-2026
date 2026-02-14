import { createAction, props } from '@ngrx/store';
import { Bookmark } from '../../core/models/bookmark.model';

/* LOAD */
export const loadBookmarks = createAction('[Bookmarks] Load');

export const loadBookmarksSuccess = createAction(
  '[Bookmarks] Load Success',
  props<{ bookmarks: Bookmark[] }>()
);

export const loadBookmarksFailure = createAction(
  '[Bookmarks] Load Failure',
  props<{ error: string }>()
);

export const addBookmark = createAction(
  '[Bookmarks] Add',
  props<{ bookmark: Bookmark }>()
);

export const deleteBookmark = createAction(
  '[Bookmarks] Delete',
  props<{ id: string }>()
);