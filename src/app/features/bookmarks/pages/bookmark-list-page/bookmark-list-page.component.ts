import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Bookmark } from '../../../../core/models/bookmark.model';
import { selectAllBookmarks } from '../../../../state/bookmarks/bookmarks.selectors';
import * as BookmarksActions from '../../../../state/bookmarks/bookmarks.actions';
import { AppState } from '../../../../state/app.state';

@Component({
  selector: 'app-bookmark-list-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookmark-list-page.component.html',
  styleUrl: './bookmark-list-page.component.scss',
})
export class BookmarkListPageComponent implements OnInit {
  bookmarks$: Observable<Bookmark[]>;

  constructor(private store: Store<AppState>) {
    this.bookmarks$ = this.store.select(selectAllBookmarks);
  }

  ngOnInit(): void {
    this.store.dispatch(BookmarksActions.loadBookmarks());
  }
}
