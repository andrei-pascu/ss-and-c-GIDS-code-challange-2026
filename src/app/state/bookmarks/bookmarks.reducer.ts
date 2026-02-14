import { createFeature, createReducer, on } from '@ngrx/store';
import { adapter, initialBookmarksState } from './bookmarks.state';
import * as BookmarksActions from './bookmarks.actions';

export const bookmarksFeature = createFeature({
  name: 'bookmarks',
  reducer: createReducer(
    initialBookmarksState,

    on(BookmarksActions.addBookmark, (state, { bookmark }) =>
      adapter.addOne(bookmark, state)
    ),

    on(BookmarksActions.deleteBookmark, (state, { id }) =>
      adapter.removeOne(id, state)
    )
  ),
});
