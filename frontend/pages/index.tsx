import CreateTaskForm from "@/components/CreateTaskForm";
import Task from "@/components/Task";
import { fetchAllTasks } from "@/lib/api/task";
import { TaskType } from "@/types/Task";
import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetchAllTasks();

      setTasks(response);
    })();
  }, []);

  const onCreate = (newTask: TaskType) => setTasks([...tasks, newTask]);

  const onUpdate = (updatedTask: TaskType) =>
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-xl">Task Manager</h1>
        <CreateTaskForm onCreate={onCreate} />
        <hr className="mb-5 border-gray-300 w-full" />
        <div>
          {tasks.map((task) => (
            <Task key={task.id} onUpdate={onUpdate} {...task} />
          ))}
        </div>
      </main>
    </div>
  );
}
