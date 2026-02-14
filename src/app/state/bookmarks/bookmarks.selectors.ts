import { createSelector } from '@ngrx/store';
import { adapter } from './bookmarks.state';
import { bookmarksFeature } from './bookmarks.reducer';
import { groupBookmarksByDate } from '../../features/bookmarks/utils/bookmark-date.util';


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

export const selectGroupedBookmarks = createSelector(
  selectAllBookmarks,
  (bookmarks) => groupBookmarksByDate(bookmarks)
);

export const selectBookmarkById = (id: string) =>
  createSelector(
    selectAllBookmarks,
    (bookmarks) => bookmarks.find(b => b.id === id)
  );