import {
  TITLE_A_Z,
  TITLE_Z_A,
  LATEST,
  OLDEST,
  LAST_UPDATED,
} from '@/constants';
import { ChangeEvent } from 'react';

type Props = {
  onSortChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const SortSelect = ({ onSortChange }: Props) => (
  <select
    onChange={onSortChange}
    className="w-1/4 p-2 rounded-md border border-gray-300"
  >
    <option value={TITLE_A_Z}>Title A-Z</option>
    <option value={TITLE_Z_A}>Title Z-A</option>
    <option value={LATEST}>Latest</option>
    <option value={OLDEST}>Oldest</option>
    <option value={LAST_UPDATED}>Last Updated</option>
  </select>
);

export default SortSelect;
