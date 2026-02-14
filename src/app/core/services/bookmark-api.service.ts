import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bookmark } from '../models/bookmark.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookmarkApiService {
  private readonly baseUrl = 'api/bookmarks';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>(this.baseUrl);
  }
}
