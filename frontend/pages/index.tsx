import CreateTaskForm from '@/components/CreateTaskForm';
import NumberedPagination from '@/components/NumberedPagination';
import Task from '@/components/Task';
import { fetchAllTasks } from '@/lib/api/task';
import { TaskType } from '@/types/Task';
import { useEffect, useState } from 'react';

export default function Home() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    refetchAllTasks();
  }, [currentPage]);

  const refetchAllTasks = async () => {
    const { tasks, pages } = await fetchAllTasks(currentPage);

    setTasks(tasks);
    setTotalPages(pages);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 w-full">
      <main className="flex flex-col gap-[32px] w-full row-start-2 items-center justify-items-centerr sm:items-start  max-w-7xl">
        <h1 className="text-3xl font-bold w-full text-center">Task Manager</h1>
        <CreateTaskForm refetchAllTasks={refetchAllTasks} />
        <hr className="mb-5 border-gray-300 w-full" />
        {tasks.map((task) => (
          <Task key={task.id} refetchAllTasks={refetchAllTasks} {...task} />
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
