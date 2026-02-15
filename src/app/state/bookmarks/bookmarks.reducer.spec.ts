import { bookmarksFeature } from './bookmarks.reducer';
import * as BookmarksActions from './bookmarks.actions';
import { initialBookmarksState } from './bookmarks.state';
import { Bookmark } from '../../core/models/bookmark.model';

describe('BookmarksReducer', () => {
  const reducer = bookmarksFeature.reducer;

  const bookmark: Bookmark = {
    id: '1',
    name: 'Angular',
    url: 'url',
    createdAt: '2024'
  };

  it('should return initial state', () => {
    const state = reducer(undefined, { type: 'unknown' } as any);
    expect(state).toEqual(initialBookmarksState);
  });

  it('should set loading true on loadBookmarks', () => {
    const state = reducer(
      initialBookmarksState,
      BookmarksActions.loadBookmarks()
    );
    expect(state.loading).toBeTrue();
    expect(state.error).toBeNull();
  });

  it('should set bookmarks on load success', () => {
    const state = reducer(
      initialBookmarksState,
      BookmarksActions.loadBookmarksSuccess({
        bookmarks: [bookmark]
      })
    );
    expect(state.loading).toBeFalse();
    expect(state.ids.length).toBe(1);
    expect(state.entities['1']).toEqual(bookmark);
  });

  it('should set error on load failure', () => {
    const state = reducer(
      initialBookmarksState,
      BookmarksActions.loadBookmarksFailure({
        error: 'Failed'
      })
    );
    expect(state.loading).toBeFalse();
    expect(state.error).toBe('Failed');
  });

  it('should add bookmark on create success', () => {
    const state = reducer(
      initialBookmarksState,
      BookmarksActions.createBookmarkSuccess({ bookmark })
    );
    expect(state.ids.length).toBe(1);
    expect(state.entities['1']).toEqual(bookmark);
  });

  it('should remove bookmark on delete success', () => {
    const loaded = reducer(
      initialBookmarksState,
      BookmarksActions.loadBookmarksSuccess({
        bookmarks: [bookmark]
      })
    );

    const state = reducer(
      loaded,
      BookmarksActions.deleteBookmarkSuccess({ id: '1' })
    );
    expect(state.ids.length).toBe(0);
    expect(state.entities['1']).toBeUndefined();
  });

  it('should update bookmark on update success', () => {
    const loaded = reducer(
      initialBookmarksState,
      BookmarksActions.loadBookmarksSuccess({
        bookmarks: [bookmark]
      })
    );
    const updated = {
      ...bookmark,
      name: 'Updated'
    };
    const state = reducer(
      loaded,
      BookmarksActions.updateBookmarkSuccess({
        bookmark: updated
      })
    );
    expect(state.entities['1']?.name).toBe('Updated');
  });
})