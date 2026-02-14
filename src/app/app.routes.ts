import { Routes } from '@angular/router';
import { BookmarkListPageComponent } from './features/bookmarks/pages/bookmark-list-page/bookmark-list-page.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'bookmarks' },
  { path: 'bookmarks', component: BookmarkListPageComponent },
  { path: '**', redirectTo: 'bookmarks' },
];