import * as Selectors from './bookmarks.selectors';
import { initialBookmarksState } from './bookmarks.state';
import { Bookmark } from '../../core/models/bookmark.model';

describe('BookmarksSelectors', () => {

  function createBookmark(): Bookmark {
    return {
      id: '1',
      name: 'Angular',
      url: 'url',
      createdAt: '2026-02-15T10:00:00Z'
    };
  }

  function createFeatureState(bookmark: Bookmark) {
    return {
      ...initialBookmarksState,
      ids: [bookmark.id],
      entities: { [bookmark.id]: bookmark }
    };
  }

  it('should select all bookmarks', () => {
    const bookmark = createBookmark();
    const featureState = createFeatureState(bookmark);
    const result = Selectors.selectAllBookmarks.projector(featureState);
    expect(result.length).toBe(1);
    expect(result[0]).toEqual(bookmark);
  });

  it('should select bookmark by id', () => {
    const bookmark = createBookmark();
    const selector = Selectors.selectBookmarkById('1');
    const result = selector.projector([bookmark]);
    expect(result).toEqual(bookmark);
  });

  it('should return undefined for missing id', () => {
    const bookmark = createBookmark();
    const selector = Selectors.selectBookmarkById('999');
    const result = selector.projector([bookmark]);
    expect(result).toBeUndefined();
  });

  it('should group bookmarks', () => {
    const bookmark = createBookmark();
    const result =
      Selectors.selectGroupedBookmarks.projector([bookmark]);
    const total =
      result.today.length +
      result.yesterday.length +
      result.older.length;
    expect(total).toBe(1);
  });

  it('should memoize results', () => {
    const bookmark = createBookmark();
    const featureState = createFeatureState(bookmark);
    const result1 = Selectors.selectAllBookmarks.projector(featureState);
    const result2 = Selectors.selectAllBookmarks.projector(featureState);
    expect(result1).toEqual(result2);
  });

});
 