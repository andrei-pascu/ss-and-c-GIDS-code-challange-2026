import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MemoizedSelector } from '@ngrx/store';
import { skip, firstValueFrom } from "rxjs"

import { BookmarkListPageComponent } from './bookmark-list-page.component';
import { AppState } from '../../../../state/app.state';
import { selectAllBookmarks } from '../../../../state/bookmarks/bookmarks.selectors';
import { Bookmark } from '../../../../core/models/bookmark.model';
import { provideRouter } from '@angular/router';
import * as BookmarksActions from "../../../../state/bookmarks/bookmarks.actions"

describe('BookmarkListPageComponent', () => {
  let component: BookmarkListPageComponent;
  let fixture: ComponentFixture<BookmarkListPageComponent>;
  let store: MockStore;
  let mockSelector: MemoizedSelector<AppState, Bookmark[]>;

  const mockBookmarks: Bookmark[] = [
    {
      id: '1',
      name: 'Angular',
      url: 'https://angular.dev',
      createdAt: new Date().toISOString()
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarkListPageComponent],
      providers: [
        provideMockStore(),
        provideRouter([])
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    mockSelector = store.overrideSelector(selectAllBookmarks, mockBookmarks);

    fixture = TestBed.createComponent(BookmarkListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadBookmarks on init', () => {
    const dispatchSpy = spyOn(store, 'dispatch');

    component.ngOnInit();

    expect(dispatchSpy).toHaveBeenCalledWith(
      BookmarksActions.loadBookmarks()
    );
  });

  it('should dispatch deleteBookmark when onDelete is called', () => {
    const dispatchSpy = spyOn(store, 'dispatch');

    component.onDelete('123');

    expect(dispatchSpy).toHaveBeenCalledWith(
      BookmarksActions.deleteBookmark({ id: '123' })
    );
  });

  it('should filter bookmarks based on search term', async () => {
    const bookmarks: Bookmark[] = [
      {
        id: '1',
        name: 'Angular',
        url: 'https://angular.dev',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'React',
        url: 'https://react.dev',
        createdAt: new Date().toISOString()
      }
    ];

    store.overrideSelector(selectAllBookmarks, bookmarks);
    store.refreshState();

    component.ngOnInit();

    const resultPromise = firstValueFrom(
      component.groupedBookmarks$.pipe(skip(1))
    );

    component.searchControl.setValue('angular');

    const groups = await resultPromise;

    const allBookmarks = [
      ...groups.today,
      ...groups.yesterday,
      ...groups.older
    ];

    expect(allBookmarks.length).toBe(1);
    expect(allBookmarks[0].name).toBe('Angular');
  });
});
