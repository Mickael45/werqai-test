import { TaskType } from '@/types/Task';

export const createTask = async (title: string, description: string) => {
  const response = await fetch('http://localhost:3000/task', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, description }),
  });
  const newTask = await response.json();

  return newTask;
};

export const updateTask = async (task: TaskType) => {
  const response = await fetch(`http://localhost:3000/task/${task.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  const updatedTask = await response.json();

  return updatedTask;
};

export const fetchAllTasks = async (
  currentPage: number,
): Promise<{
  tasks: TaskType[];
  pages: number;
}> => {
  const response = await fetch(
    `http://localhost:3000/task?page=${currentPage}&limit=2&sortBy=id&order=asc`,
  );
  const { tasks, pages } = await response.json();

  return { tasks, pages };
};

export const deleteTask = async (id: string): Promise<string> => {
  const response = await fetch(`http://localhost:3000/task/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const { id: deletedTaskId } = await response.json();

  return deletedTaskId;
};
