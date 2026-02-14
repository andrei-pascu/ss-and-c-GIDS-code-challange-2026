import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Bookmark } from '../../core/models/bookmark.model';

export interface BookmarksState extends EntityState<Bookmark> {
  loading: boolean;
  error: string | null;
};

export const adapter = createEntityAdapter<Bookmark>({
  selectId: (bookmark: Bookmark) => bookmark.id,
});

export const initialBookmarksState: BookmarksState =
  adapter.getInitialState({
    loading: false,
    error: null,
  });