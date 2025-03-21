import {
  TITLE_A_Z,
  TITLE_Z_A,
  LATEST,
  OLDEST,
  LAST_UPDATED,
  PENDING,
  IN_PROGRESS,
  COMPLETED,
} from '@/constants';
import { mapStatusToLabel } from '@/utils/statusMappers';
import { ChangeEvent } from 'react';

type Props = {
  onSortChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  searchTerm: string;
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  onFilterChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const FilterAndSort = ({
  onSortChange,
  searchTerm,
  onSearch,
  onFilterChange,
}: Props) => {
  return (
    <div className="w-full flex justify-between">
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
      <select
        onChange={onFilterChange}
        className="w-1/4 p-2 rounded-md border border-gray-300"
      >
        <option value="ALL">All</option>
        <option value={PENDING}>{mapStatusToLabel[PENDING]}</option>
        <option value={IN_PROGRESS}>{mapStatusToLabel[IN_PROGRESS]}</option>
        <option value={COMPLETED}>{mapStatusToLabel[COMPLETED]}</option>
      </select>

      <input
        type="text"
        placeholder="Search"
        onChange={onSearch}
        value={searchTerm}
        className="w-1/4 p-2 rounded-md border border-gray-300"
      />
    </div>
  );
};

export default FilterAndSort;
