import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkEditPageComponent } from './bookmark-edit-page.component';

describe('BookmarkEditPageComponent', () => {
  let component: BookmarkEditPageComponent;
  let fixture: ComponentFixture<BookmarkEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarkEditPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookmarkEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
