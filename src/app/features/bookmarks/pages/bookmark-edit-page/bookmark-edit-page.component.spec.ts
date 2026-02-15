import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MemoizedSelector } from '@ngrx/store';
import { of } from 'rxjs'

import { BookmarkEditPageComponent } from './bookmark-edit-page.component';
import { selectBookmarkById } from '../../../../state/bookmarks/bookmarks.selectors';
import { Bookmark } from '../../../../core/models/bookmark.model';
import { AppState } from '../../../../state/app.state';
import * as BookmarksActions from '../../../../state/bookmarks/bookmarks.actions';
import { Router } from '@angular/router';

describe('BookmarkEditPageComponent', () => {
  let component: BookmarkEditPageComponent;
  let fixture: ComponentFixture<BookmarkEditPageComponent>;
  let store: MockStore;
  let mockSelector: MemoizedSelector<AppState, Bookmark | undefined>;

  const mockBookmark: Bookmark = {
    id: '1',
    name: 'Angular',
    url: 'https://angular.dev',
    createdAt: '2024-01-01T00:00:00.000Z'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarkEditPageComponent],
      providers: [
        provideMockStore(),
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1'
              }
            }
          }
        }
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    spyOn(store, 'select').and.returnValue(of(mockBookmark));

    fixture = TestBed.createComponent(BookmarkEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should patch form with bookmark values on init', () => {
    expect(component.form.value.name).toBe('Angular');
    expect(component.form.value.url).toBe('https://angular.dev');
  });

  it('should dispatch update and navigate on valid submit', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigate');

    component.form.setValue({
      name: 'Updated',
      url: 'https://updated.dev'
    });

    component.onSubmit();

    expect(dispatchSpy).toHaveBeenCalledWith(
      BookmarksActions.updateBookmark({
        bookmark: {
          id: '1',
          name: 'Updated',
          url: 'https://updated.dev',
          createdAt: '2024-01-01T00:00:00.000Z'
        }
      })
    );

    expect(navigateSpy).toHaveBeenCalledWith(['/bookmarks']);
  });

  it('should not submit if form is invalid', () => {
    const dispatchSpy = spyOn(store, 'dispatch');

    component.form.setValue({
      name: '',
      url: ''
    });

    component.onSubmit();

    expect(dispatchSpy).not.toHaveBeenCalled();
  });
});
