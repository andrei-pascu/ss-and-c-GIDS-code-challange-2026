import { BookmarkListPageComponent } from './features/bookmarks/pages/bookmark-list-page/bookmark-list-page.component';
import { BookmarkCreatePageComponent } from './features/bookmarks/pages/bookmark-create-page/bookmark-create-page.component';
import { BookmarkEditPageComponent } from './features/bookmarks/pages/bookmark-edit-page/bookmark-edit-page.component'
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'bookmarks',
    pathMatch: 'full',
  },
  { path: 'bookmarks', component: BookmarkListPageComponent },
  { path: 'bookmarks/new', component: BookmarkCreatePageComponent },
  { path: 'bookmarks/:id/edit', component: BookmarkEditPageComponent }
];
