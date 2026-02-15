import { groupBookmarksByDate } from './bookmark-date.util';
import { Bookmark } from '../../../core/models/bookmark.model';

describe('groupBookmarksByDate', () => {

  const baseNow = new Date('2026-02-15T10:00:00Z');

  function createBookmark(createdAt: string): Bookmark {
    return {
      id: '1',
      name: 'Test',
      url: 'test',
      createdAt
    };
  }
 
  it('should return empty groups for empty input', () => {
    const result = groupBookmarksByDate([], baseNow);

    expect(result.today.length).toBe(0);
    expect(result.yesterday.length).toBe(0);
    expect(result.older.length).toBe(0);
  });

  it('should group today bookmarks', () => {
    const todayBookmark = createBookmark('2026-02-15T05:00:00Z');

    const result = groupBookmarksByDate([todayBookmark], baseNow);

    expect(result.today.length).toBe(1);
    expect(result.yesterday.length).toBe(0);
    expect(result.older.length).toBe(0);
  });

  it('should group yesterday bookmarks', () => {
    const yesterdayBookmark = createBookmark('2026-02-14T05:00:00Z');

    const result = groupBookmarksByDate([yesterdayBookmark], baseNow);

    expect(result.yesterday.length).toBe(1);
  });

  it('should group older bookmarks', () => {
    const olderBookmark = createBookmark('2026-02-10T05:00:00Z');

    const result = groupBookmarksByDate([olderBookmark], baseNow);

    expect(result.older.length).toBe(1);
  });

  it('should correctly group mixed bookmarks', () => {
    const bookmarks = [
      createBookmark('2026-02-15T01:00:00Z'), // today
      createBookmark('2026-02-14T01:00:00Z'), // yesterday
      createBookmark('2026-02-10T01:00:00Z')  // older
    ];

    const result = groupBookmarksByDate(bookmarks, baseNow);

    expect(result.today.length).toBe(1);
    expect(result.yesterday.length).toBe(1);
    expect(result.older.length).toBe(1);
  });
});
