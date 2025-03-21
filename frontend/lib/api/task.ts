import { SortAndOrder } from '@/types/Sorting';
import { Status, TaskHistoryType, TaskType } from '@/types/Task';

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
  { sort, order }: SortAndOrder,
  statusFilter: 'ALL' | Status,
): Promise<{
  tasks: TaskType[];
  pages: number;
}> => {
  const response = await fetch(
    `http://localhost:3000/task?page=${currentPage}&limit=2&sortBy=${sort}&order=${order}&statusFilter=${statusFilter}`,
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

export const fetchTaskHistoryByTaskId = async (
  taskId: string,
): Promise<TaskHistoryType[]> => {
  const response = await fetch(
    `http://localhost:3000/task-history?taskId=${taskId}`,
  );
  const { taskHistoryItems } = await response.json();

  return taskHistoryItems as TaskHistoryType[];
};
