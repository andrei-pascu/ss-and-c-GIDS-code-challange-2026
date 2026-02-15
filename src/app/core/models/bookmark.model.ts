export interface Bookmark {
  id: string;
  name: string;
  url: string;
  createdAt: string;
}

export interface CreateBookmarkDto {
  name: string;
  url: string;
}