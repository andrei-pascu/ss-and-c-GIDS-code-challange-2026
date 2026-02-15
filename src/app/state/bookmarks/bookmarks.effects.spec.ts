import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { BookmarksEffects } from './bookmarks.effects';
import * as BookmarksActions from './bookmarks.actions';
import { BookmarkApiService } from '../../core/services/bookmark-api.service';
import { Bookmark } from '../../core/models/bookmark.model';

describe('BookmarksEffects', () => {
  let actions$: Observable<any>;
  let effects: BookmarksEffects;
  let api: jasmine.SpyObj<BookmarkApiService>;

  beforeEach(() => {
    const apiSpy = jasmine.createSpyObj('BookmarkApiService', [
      'getAll',
      'delete',
      'create',
      'update'
    ]);

    TestBed.configureTestingModule({
      providers: [
        BookmarksEffects,
        provideMockActions(() => actions$),
        { provide: BookmarkApiService, useValue: apiSpy }
      ]
    });

    effects = TestBed.inject(BookmarksEffects);
    api = TestBed.inject(
      BookmarkApiService
    ) as jasmine.SpyObj<BookmarkApiService>;
  });

  it('should load bookmarks successfully', (done) => {
    const bookmarks: Bookmark[] = [];

    api.getAll.and.returnValue(of(bookmarks));
    actions$ = of(BookmarksActions.loadBookmarks());
    effects.loadBookmarks$.subscribe(action => {
      expect(action).toEqual(
        BookmarksActions.loadBookmarksSuccess({ bookmarks })
      );
      done();
    });
  });

  it('should dispatch failure on load error', (done) => {
    api.getAll.and.returnValue(
      throwError(() => new Error('Boom'))
    );
    actions$ = of(BookmarksActions.loadBookmarks());
    effects.loadBookmarks$.subscribe(action => {
      expect(action.type)
        .toBe(BookmarksActions.loadBookmarksFailure.type);
      done();
    });
  });

  it('should delete bookmark successfully', (done) => {
    api.delete.and.returnValue(of(void 0));

    actions$ = of(BookmarksActions.deleteBookmark({ id: '1' }));

    effects.deleteBookmark$.subscribe(action => {
      expect(action).toEqual(
        BookmarksActions.deleteBookmarkSuccess({ id: '1' })
      );
      done();
    });
  });

  it('should create bookmark successfully', (done) => {
    const bookmark = {
      id: '1',
      name: 'Angular',
      url: 'url',
      createdAt: 'now'
    };

    api.create.and.returnValue(of(bookmark));

    actions$ = of(
      BookmarksActions.createBookmark({
        bookmark: { name: 'Angular', url: 'url' }
      })
    );

    effects.createBookmark$.subscribe(action => {
      expect(action).toEqual(
        BookmarksActions.createBookmarkSuccess({
          bookmark
        })
      );
      done();
    });
  });

  it('should update and reload bookmarks', (done) => {
    const bookmark = {
      id: '1',
      name: 'Angular',
      url: 'url',
      createdAt: 'now'
    };

    const all: Bookmark[] = [bookmark];

    api.update.and.returnValue(of(bookmark));
    api.getAll.and.returnValue(of(all));

    actions$ = of(
      BookmarksActions.updateBookmark({ bookmark })
    );

    effects.updateBookmark$.subscribe(action => {
      expect(action).toEqual(
        BookmarksActions.loadBookmarksSuccess({
          bookmarks: all
        })
      );
      done();
    });
  });
})
