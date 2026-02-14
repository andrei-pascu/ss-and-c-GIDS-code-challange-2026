import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';

import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { AppState } from '../../../../state/app.state';
import { selectGroupedBookmarks } from '../../../../state/bookmarks/bookmarks.selectors';
import * as BookmarksActions from '../../../../state/bookmarks/bookmarks.actions';
import { BookmarkGroups } from '../../utils/bookmark-date.util';

@Component({
  selector: 'app-bookmark-list-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './bookmark-list-page.component.html',
  styleUrl: './bookmark-list-page.component.scss'
})
export class BookmarkListPageComponent implements OnInit {

  groupedBookmarks$!: Observable<BookmarkGroups>;

  constructor(private store: Store<AppState>) {
    this.groupedBookmarks$ = this.store.select(selectGroupedBookmarks);
  }

  ngOnInit(): void {
    this.store.dispatch(BookmarksActions.loadBookmarks());
  }

  onDelete(id: string): void {
    this.store.dispatch(BookmarksActions.deleteBookmark({ id }));
  }
}
