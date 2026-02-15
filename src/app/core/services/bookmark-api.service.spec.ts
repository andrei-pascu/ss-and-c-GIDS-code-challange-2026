import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BookmarkApiService } from './bookmark-api.service';
import { Bookmark } from '../models/bookmark.model';

describe('BookmarkApiService', () => {
  let service: BookmarkApiService;
  let httpMock: HttpTestingController;

  const baseUrl = '/api/bookmarks';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookmarkApiService]
    });

    service = TestBed.inject(BookmarkApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // ensures no outstanding requests
  });

  it('should GET all bookmarks', () => {
    const mockData: Bookmark[] = [];

    service.getAll().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('GET');

    req.flush(mockData);
  });

  it('should DELETE a bookmark', () => {
    const id = '123';

    service.delete(id).subscribe();

    const req = httpMock.expectOne(`${baseUrl}/${id}`);
    expect(req.request.method).toBe('DELETE');

    req.flush(null);
  });

  it('should POST a bookmark', () => {
    const dto = {
      name: 'Angular',
      url: 'https://angular.dev'
    };

    service.create(dto).subscribe();

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dto);

    req.flush({ ...dto, id: '1', createdAt: 'now' });
  });

  it('should PUT update a bookmark', () => {
    const bookmark: Bookmark = {
      id: '1',
      name: 'Angular',
      url: 'https://angular.dev',
      createdAt: '2024-01-01'
    };

    service.update(bookmark).subscribe();

    const req = httpMock.expectOne(`${baseUrl}/${bookmark.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(bookmark);

    req.flush(bookmark);
  });
});
