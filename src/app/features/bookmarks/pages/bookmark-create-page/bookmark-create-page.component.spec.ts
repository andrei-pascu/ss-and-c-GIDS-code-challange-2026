import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';
import { Router } from '@angular/router';

import { BookmarkCreatePageComponent } from './bookmark-create-page.component';
import * as BookmarksActions from '../../../../state/bookmarks/bookmarks.actions';

describe('BookmarkCreatePageComponent', () => {
  let component: BookmarkCreatePageComponent;
  let fixture: ComponentFixture<BookmarkCreatePageComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarkCreatePageComponent],
      providers: [
        provideMockStore(),
        provideRouter([])
      ]
    }).compileComponents();
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(BookmarkCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not dispatch if form is invalid', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.form.setValue({
      name: '',
      url: ''
    });
    component.onSubmit();
    expect(dispatchSpy).not.toHaveBeenCalled();
  });

  it('should dispatch createBookmark and navigate on valid submit', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigate');

    component.form.setValue({
      name: 'Angular',
      url: 'https://angular.dev'
    });
    component.onSubmit();
    expect(dispatchSpy).toHaveBeenCalled();
    const dispatchedAction: any =
    dispatchSpy.calls.mostRecent().args[0];
    
    expect(dispatchedAction.type).toBe(BookmarksActions.createBookmark.type);
    expect(dispatchedAction.bookmark.name).toBe('Angular');
    expect(dispatchedAction.bookmark.url).toBe('https://angular.dev');
    expect(dispatchedAction.bookmark.id).toBeTruthy();
    expect(dispatchedAction.bookmark.createdAt).toBeTruthy();
    expect(navigateSpy).toHaveBeenCalledWith(['/bookmarks']);
  });
});