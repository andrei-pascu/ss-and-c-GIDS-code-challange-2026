import { createAction, props } from '@ngrx/store';
import { Bookmark } from '../../core/models/bookmark.model';

export const loadBookmarks = createAction('[Bookmarks] Load');

export const addBookmark = createAction(
  '[Bookmarks] Add Bookmark',
  props<{ bookmark: Bookmark }>()
);

export const deleteBookmark = createAction(
  '[Bookmarks] Delete Bookmark',
  props<{ id: string }>()
);
