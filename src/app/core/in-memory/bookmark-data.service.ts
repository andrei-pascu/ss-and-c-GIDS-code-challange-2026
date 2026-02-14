import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Bookmark } from '../models/bookmark.model';

export class BookmarkDataService implements InMemoryDbService {
  createDb() {
    const bookmarks: Bookmark[] = [
      {
        id: '1',
        name: 'Angular',
        url: 'https://angular.dev',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'NgRx',
        url: 'https://ngrx.io',
        createdAt: new Date(Date.now() - 86400000).toISOString(), // yesterday
      },
    ];

    return { bookmarks };
  }
}