import { createAction, props } from '@ngrx/store';
import { Bookmark, CreateBookmarkDto } from '../../core/models/bookmark.model';

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

export const deleteBookmarkSuccess = createAction(
  '[Bookmarks] Delete Success',
  props<{ id: string }>()
);

export const deleteBookmarkFailure = createAction(
  '[Bookmarks] Delete Failure',
  props<{ error: string }>()
);

export const createBookmark = createAction(
  '[Bookmarks] Create',
  props<{ bookmark: CreateBookmarkDto }>()
);

export const createBookmarkSuccess = createAction(
  '[Bookmarks] Create Success',
  props<{ bookmark: Bookmark }>()
);

export const createBookmarkFailure = createAction(
  '[Bookmarks] Create Failure',
  props<{ error: string }>()
);

export const updateBookmark = createAction(
  '[Bookmarks] Update',
  props<{ bookmark: Bookmark }>()
);

export const updateBookmarkSuccess = createAction(
  '[Bookmarks] Update Success',
  props<{ bookmark: Bookmark }>()
);

export const updateBookmarkFailure = createAction(
  '[Bookmarks] Update Failure',
  props<{ error: string }>()
);