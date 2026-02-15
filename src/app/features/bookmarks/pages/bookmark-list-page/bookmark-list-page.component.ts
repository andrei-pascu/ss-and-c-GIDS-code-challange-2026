import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { RouterModule } from '@angular/router';
import { map, startWith } from 'rxjs/operators';

import { ReactiveFormsModule, FormControl } from '@angular/forms';

import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { AppState } from '../../../../state/app.state';
import { selectAllBookmarks } from '../../../../state/bookmarks/bookmarks.selectors';
import * as BookmarksActions from '../../../../state/bookmarks/bookmarks.actions';
import { groupBookmarksByDate, BookmarkGroups } from '../../utils/bookmark-date.util';

@Component({
  selector: 'app-bookmark-list-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './bookmark-list-page.component.html',
  styleUrl: './bookmark-list-page.component.scss'
})
export class BookmarkListPageComponent implements OnInit {
  searchControl = new FormControl('');
  groupedBookmarks$!: Observable<BookmarkGroups>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(BookmarksActions.loadBookmarks());
    this.groupedBookmarks$ = combineLatest([
      this.store.select(selectAllBookmarks),
      this.searchControl.valueChanges.pipe(startWith(''))
    ]).pipe(
      map(([bookmarks, search]) => {
        const term = (search ?? '').toLowerCase().trim();
        const filtered = !term
          ? bookmarks
          : bookmarks.filter(b =>
              b.name.toLowerCase().includes(term) ||
              b.url.toLowerCase().includes(term)
            );
        return groupBookmarksByDate(filtered);
      })
    );
  }

  onDelete(id: string): void {
    this.store.dispatch(BookmarksActions.deleteBookmark({ id }));
  }
}