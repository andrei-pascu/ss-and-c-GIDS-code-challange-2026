import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bookmark, CreateBookmarkDto } from '../models/bookmark.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookmarkApiService {
  private readonly baseUrl = '/api/bookmarks';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>(this.baseUrl);
  }

  delete(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  create(bookmark: CreateBookmarkDto) {
    return this.http.post<Bookmark>(this.baseUrl, bookmark);
  }

 update(bookmark: Bookmark) {
  console.log('PUT URL:', `${this.baseUrl}/${bookmark.id}`);
  console.log('PUT BODY:', bookmark);

  return this.http.put<Bookmark>(
    `${this.baseUrl}/${bookmark.id}`,
    bookmark
  );
}
}
