import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppState } from '../../../../state/app.state';
import { selectBookmarkById } from '../../../../state/bookmarks/bookmarks.selectors';
import * as BookmarksActions from '../../../../state/bookmarks/bookmarks.actions';
import { Bookmark } from '../../../../core/models/bookmark.model';

@Component({
  selector: 'app-bookmark-edit-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule
  ],
  templateUrl: './bookmark-edit-page.component.html',
  styleUrl: './bookmark-edit-page.component.scss'
})
export class BookmarkEditPageComponent implements OnInit {
  form!: FormGroup;

  private bookmarkId!: string;
  private originalCreatedAt!: string;   // ✅ preserve immutable field

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      url: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.bookmarkId = this.route.snapshot.paramMap.get('id')!;
    this.store
      .select(selectBookmarkById(this.bookmarkId))
      .pipe(filter((b): b is Bookmark => !!b))
      .subscribe(bookmark => {
        this.originalCreatedAt = bookmark.createdAt;  // ✅ store original

        this.form.patchValue({
          name: bookmark.name,
          url: bookmark.url
        });
      });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const updated: Bookmark = {
      id: this.bookmarkId,
      name: this.form.value.name!,
      url: this.form.value.url!,
      createdAt: this.originalCreatedAt   // ✅ do not mutate metadata
    };
    this.store.dispatch(
      BookmarksActions.updateBookmark({ bookmark: updated })
    );
    this.router.navigate(['/bookmarks']);
  }
}
