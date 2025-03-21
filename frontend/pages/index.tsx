import CreateTaskForm from '@/components/CreateTaskForm';
import NumberedPagination from '@/components/NumberedPagination';
import Task from '@/components/Task';
import { ASCENDING } from '@/constants';
import { fetchAllTasks } from '@/lib/api/task';
import { Sorting } from '@/types/Sorting';
import { TaskType } from '@/types/Task';
import { ChangeEvent, useEffect, useState } from 'react';

export default function Home() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [ascendingOrder, setAscendingOrder] = useState<Sorting>(ASCENDING);

  useEffect(() => {
    getAllTasks();
  }, [currentPage, ascendingOrder]);

  const getAllTasks = async () => {
    const { tasks, pages } = await fetchAllTasks(currentPage, ascendingOrder);

    setTasks(tasks);
    setTotalPages(pages);
  };

  const onSortChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setAscendingOrder(e.target.value as Sorting);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 w-full">
      <main className="flex flex-col gap-[32px] w-full row-start-2 items-center justify-items-centerr sm:items-start  max-w-7xl">
        <h1 className="text-3xl font-bold w-full text-center">Task Manager</h1>
        <CreateTaskForm getAllTasks={getAllTasks} />
        <hr className="mb-5 border-gray-300 w-full" />
        <select
          onChange={onSortChange}
          className="w-1/4 p-2 rounded-md border border-gray-300"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
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
