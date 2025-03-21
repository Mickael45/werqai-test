import { PENDING, IN_PROGRESS, COMPLETED } from '@/constants';

export type Status = typeof PENDING | typeof IN_PROGRESS | typeof COMPLETED;

export type TaskType = {
  id: string;
  title: string;
  description: string;
  status: Status;
};

export type TaskHistoryType = {
  id: string;
  taskId: string;
  previousStatus: Status;
  newStatus: Status;
  reason: string;
  changedAt: string;
};
