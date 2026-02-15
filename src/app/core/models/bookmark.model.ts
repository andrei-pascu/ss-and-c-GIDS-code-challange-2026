export interface Bookmark {
  id: string;
  name: string;
  url: string;
  createdAt: string;
}

// export type CreateBookmarkDto = Omit<Bookmark, 'id'>;

export interface CreateBookmarkDto {
  name: string;
  url: string;
}