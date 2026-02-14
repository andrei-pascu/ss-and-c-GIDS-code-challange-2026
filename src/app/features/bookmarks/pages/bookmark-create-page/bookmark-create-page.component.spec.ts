import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkCreatePageComponent } from './bookmark-create-page.component';

describe('BookmarkCreatePageComponent', () => {
  let component: BookmarkCreatePageComponent;
  let fixture: ComponentFixture<BookmarkCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarkCreatePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookmarkCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
