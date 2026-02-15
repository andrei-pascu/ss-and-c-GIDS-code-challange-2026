import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppState } from '../../../../state/app.state';
import * as BookmarksActions from '../../../../state/bookmarks/bookmarks.actions';

@Component({
  selector: 'app-bookmark-create-page',
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
  templateUrl: './bookmark-create-page.component.html',
  styleUrl: './bookmark-create-page.component.scss'
})
export class BookmarkCreatePageComponent {
  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      url: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    const bookmark = {
      id: crypto.randomUUID(),
      name: this.form.value.name!,
      url: this.form.value.url!,
      createdAt: new Date().toISOString()
    };
    this.store.dispatch(BookmarksActions.createBookmark({ bookmark }));
    this.router.navigate(['/bookmarks']);
  }
}
