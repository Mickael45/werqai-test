import { PENDING, IN_PROGRESS, COMPLETED } from '@/constants';
import { mapStatusToLabel } from '@/utils/statusMappers';
import { ChangeEvent } from 'react';

type Props = {
  onFilterChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const FilterSelect = ({ onFilterChange }: Props) => (
  <select
    onChange={onFilterChange}
    className="w-1/4 p-2 rounded-md border border-gray-300"
  >
    <option value="ALL">All</option>
    <option value={PENDING}>{mapStatusToLabel[PENDING]}</option>
    <option value={IN_PROGRESS}>{mapStatusToLabel[IN_PROGRESS]}</option>
    <option value={COMPLETED}>{mapStatusToLabel[COMPLETED]}</option>
  </select>
);

export default FilterSelect;
