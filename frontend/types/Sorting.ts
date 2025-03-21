import {
  TITLE_A_Z,
  TITLE_Z_A,
  OLDEST,
  LATEST,
  LAST_UPDATED,
} from '@/constants';

export type Sorting =
  | typeof TITLE_A_Z
  | typeof TITLE_Z_A
  | typeof OLDEST
  | typeof LATEST
  | typeof LAST_UPDATED;

export type SortAndOrder = {
  sort: string;
  order: string;
};
