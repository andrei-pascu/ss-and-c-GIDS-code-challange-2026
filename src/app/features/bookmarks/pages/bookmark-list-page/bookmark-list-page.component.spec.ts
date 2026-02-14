import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkListPageComponent } from './bookmark-list-page.component';

describe('BookmarkListPageComponent', () => {
  let component: BookmarkListPageComponent;
  let fixture: ComponentFixture<BookmarkListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarkListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookmarkListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
