import { createSelector } from '@ngrx/store';
import { adapter } from './bookmarks.state';
import { bookmarksFeature } from './bookmarks.reducer';

const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} = adapter.getSelectors();

export const selectAllBookmarks = createSelector(
  bookmarksFeature.selectBookmarksState,
  selectAll
);

export const selectBookmarksLoading =
  bookmarksFeature.selectLoading;

export const selectBookmarksError =
  bookmarksFeature.selectError;