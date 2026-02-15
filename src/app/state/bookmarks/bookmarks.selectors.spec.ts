import * as Selectors from './bookmarks.selectors';
import { initialBookmarksState } from './bookmarks.state';
import { Bookmark } from '../../core/models/bookmark.model';

describe('BookmarksSelectors', () => {

  const bookmark: Bookmark = {
    id: '1',
    name: 'Angular',
    url: 'url',
    createdAt: '2026-02-15T10:00:00Z'
  };

  const rootState = {
    bookmarks: {
      ...initialBookmarksState,
      ids: ['1'],
      entities: {
        '1': bookmark
      }
    }
  };
  
  it('should select all bookmarks', () => {
    const result = Selectors.selectAllBookmarks(rootState as any);

    expect(result.length).toBe(1);
    expect(result[0]).toEqual(bookmark);
  });

  it('should select bookmark by id', () => {
    const selector = Selectors.selectBookmarkById('1');
    const result = selector(rootState as any);

    expect(result).toEqual(bookmark);
  });

  it('should return undefined for missing id', () => {
    const selector = Selectors.selectBookmarkById('999');
    const result = selector(rootState as any);

    expect(result).toBeUndefined();
  });

  it('should group bookmarks', () => {
    const result = Selectors.selectGroupedBookmarks(rootState as any);

    const total =
      result.today.length +
      result.yesterday.length +
      result.older.length;

    expect(total).toBe(1);
  });

  it('should memoize results', () => {
    const result1 = Selectors.selectAllBookmarks(rootState as any);
    const result2 = Selectors.selectAllBookmarks(rootState as any);

    expect(result1).toBe(result2);
  });
})