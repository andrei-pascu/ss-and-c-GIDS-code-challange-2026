import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Bookmark } from '../models/bookmark.model';

export class BookmarkDataService implements InMemoryDbService {

  createDb() {
    const ONE_DAY = 24 * 60 * 60 * 1000;
    const ONE_WEEK = 7 * ONE_DAY;

    const bookmarks: Bookmark[] = [
      {
        id: crypto.randomUUID(),
        name: 'Angular',
        url: 'https://angular.dev',
        createdAt: new Date().toISOString()
      },
      {
        id: crypto.randomUUID(),
        name: 'NgRx',
        url: 'https://ngrx.io',
        createdAt: new Date(Date.now() - ONE_DAY).toISOString(), // yesterday
      },
      {
        id: crypto.randomUUID(),
        name: 'NotReact',
        url: 'https://react.dev/',
        createdAt: new Date(Date.now() - (ONE_DAY * 2)).toISOString(), // yesterday
      },
      {
        id: crypto.randomUUID(),
        name: 'NotVue.JS',
        url: 'https://vuejs.org/',
        createdAt: new Date(Date.now() - ONE_WEEK).toISOString(),
      }
    ];

    return { bookmarks };
  }

  genId(bookmarks: Bookmark[]): string {
    return crypto.randomUUID();
  }
}
