import CreateTaskForm from '@/components/CreateTaskForm';
import FilterAndSort from '@/components/FilterAndSort';
import NumberedPagination from '@/components/NumberedPagination';
import Task from '@/components/Task';
import { fetchAllTasks } from '@/lib/api/task';
import { SortAndOrder, Sorting } from '@/types/Sorting';
import { Status, TaskType } from '@/types/Task';
import { mapSortTypeToSortAndOrder } from '@/utils/sortMapper';
import { ChangeEvent, useEffect, useState } from 'react';

export default function Home() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sorting, setSorting] = useState<SortAndOrder>({
    sort: 'title',
    order: 'asc',
  });
  const [statusFilter, setStatusFilter] = useState<Status | 'ALL'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getAllTasks();
  }, [currentPage, sorting, statusFilter, searchTerm]);

  const getAllTasks = async () => {
    const { tasks, pages } = await fetchAllTasks(
      currentPage,
      sorting,
      statusFilter,
      searchTerm,
    );

    setTasks(tasks);
    setTotalPages(pages);
  };

  const onSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSorting(mapSortTypeToSortAndOrder[e.target.value as Sorting]);
  };

  const onFilterChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setStatusFilter(e.target.value as Status);

  const onSearch = async (e: ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(e.target.value);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] bg-white text-black items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 w-full">
      <main className="flex flex-col gap-[32px] w-full row-start-2 items-center justify-items-centerr sm:items-start  max-w-7xl">
        <h1 className="text-3xl font-bold w-full text-center">Task Manager</h1>
        <CreateTaskForm getAllTasks={getAllTasks} />
        <hr className="mb-5 border-gray-300 w-full" />
        <FilterAndSort
          onSortChange={onSortChange}
          searchTerm={searchTerm}
          onSearch={onSearch}
          onFilterChange={onFilterChange}
        />
        {tasks && tasks.length > 0
          ? tasks.map((task) => (
              <Task key={task.id} getAllTasks={getAllTasks} {...task} />
            ))
          : 'No tasks found'}
        <NumberedPagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </main>
    </div>
  );
}
