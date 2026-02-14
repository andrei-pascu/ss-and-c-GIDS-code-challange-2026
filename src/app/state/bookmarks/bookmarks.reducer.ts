import { createFeature, createReducer, on } from '@ngrx/store';
import { adapter, initialBookmarksState } from './bookmarks.state';
import * as BookmarksActions from './bookmarks.actions';

export const bookmarksFeature = createFeature({
  name: 'bookmarks',
  reducer: createReducer(
    initialBookmarksState,

    // LOAD START
    on(BookmarksActions.loadBookmarks, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),

    // LOAD SUCCESS
    on(BookmarksActions.loadBookmarksSuccess, (state, { bookmarks }) =>
      adapter.setAll(bookmarks, {
        ...state,
        loading: false,
        error: null,
      })
    ),

    // LOAD FAILURE
    on(BookmarksActions.loadBookmarksFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),

    // ADD (still local for now)
    on(BookmarksActions.addBookmark, (state, { bookmark }) =>
      adapter.addOne(bookmark, state)
    ),

    // DELETE
   on(BookmarksActions.deleteBookmarkSuccess, (state, { id }) =>
    adapter.removeOne(id, state)
    ),

    on(BookmarksActions.createBookmarkSuccess, (state, { bookmark }) =>
      adapter.addOne(bookmark, state)
    ),

    on(BookmarksActions.updateBookmarkSuccess, (state, { bookmark }) =>
      adapter.updateOne(
        { id: bookmark.id, changes: bookmark },
        state
      )
    ),
  ),
});
