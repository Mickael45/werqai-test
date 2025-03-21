import {
  TITLE_A_Z,
  TITLE_Z_A,
  OLDEST,
  LATEST,
  LAST_UPDATED,
} from '@/constants';
import { SortAndOrder, Sorting } from '@/types/Sorting';

export const mapSortTypeToSortAndOrder: Record<Sorting, SortAndOrder> = {
  [TITLE_A_Z]: { sort: 'title', order: 'asc' },
  [TITLE_Z_A]: { sort: 'title', order: 'desc' },
  [OLDEST]: { sort: 'createdAt', order: 'asc' },
  [LATEST]: { sort: 'createdAt', order: 'desc' },
  [LAST_UPDATED]: { sort: 'updatedAt', order: 'desc' },
};
