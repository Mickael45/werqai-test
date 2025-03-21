import CreateTaskForm from '@/components/CreateTaskForm';
import NumberedPagination from '@/components/NumberedPagination';
import Task from '@/components/Task';
import { ASCENDING, COMPLETED, IN_PROGRESS, PENDING } from '@/constants';
import { fetchAllTasks } from '@/lib/api/task';
import { Sorting } from '@/types/Sorting';
import { Status, TaskType } from '@/types/Task';
import { mapStatusToLabel } from '@/utils/statusMappers';
import { ChangeEvent, useEffect, useState } from 'react';

export default function Home() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [ascendingOrder, setAscendingOrder] = useState<Sorting>(ASCENDING);
  const [statusFilter, setStatusFilter] = useState<Status | 'ALL'>('ALL');

  useEffect(() => {
    getAllTasks();
  }, [currentPage, ascendingOrder, statusFilter]);

  const getAllTasks = async () => {
    const { tasks, pages } = await fetchAllTasks(
      currentPage,
      ascendingOrder,
      statusFilter,
    );

    setTasks(tasks);
    setTotalPages(pages);
  };

  const onSortChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setAscendingOrder(e.target.value as Sorting);

  const onFilterChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setStatusFilter(e.target.value as Status);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 w-full">
      <main className="flex flex-col gap-[32px] w-full row-start-2 items-center justify-items-centerr sm:items-start  max-w-7xl">
        <h1 className="text-3xl font-bold w-full text-center">Task Manager</h1>
        <CreateTaskForm getAllTasks={getAllTasks} />
        <hr className="mb-5 border-gray-300 w-full" />
        <div className="w-full flex gap-4">
          <select
            onChange={onSortChange}
            className="w-1/4 p-2 rounded-md border border-gray-300"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
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
        </div>
        {tasks.map((task) => (
          <Task key={task.id} getAllTasks={getAllTasks} {...task} />
        ))}
        <NumberedPagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </main>
    </div>
  );
}
