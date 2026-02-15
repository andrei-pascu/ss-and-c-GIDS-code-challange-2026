import { Bookmark } from '../../../core/models/bookmark.model';

export interface BookmarkGroups {
  today: Bookmark[];
  yesterday: Bookmark[];
  older: Bookmark[];
}

export function groupBookmarksByDate(
  bookmarks: Bookmark[],
  now: Date = new Date()
): BookmarkGroups {

  const today: Bookmark[] = [];
  const yesterday: Bookmark[] = [];
  const older: Bookmark[] = [];

  const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterdayDate = new Date(todayDate);
  yesterdayDate.setDate(todayDate.getDate() - 1);

  for (const bookmark of bookmarks) {
    const created = new Date(bookmark.createdAt);
    const createdDate = new Date(
      created.getFullYear(),
      created.getMonth(),
      created.getDate()
    );

    if (createdDate.getTime() === todayDate.getTime()) {
      today.push(bookmark);
    } else if (createdDate.getTime() === yesterdayDate.getTime()) {
      yesterday.push(bookmark);
    } else {
      older.push(bookmark);
    }
  }

  return { today, yesterday, older };
}
