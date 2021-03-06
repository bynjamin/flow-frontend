export type TaskStatusType =
  | 'NOT_STARTED'
  | 'IN_PROGRESS'
  | 'WAITING'
  | 'FINISHED';

export const TASK_STATUSES = {
  NOT_STARTED: 'Not Started',
  IN_PROGRESS: 'In progress',
  WAITING: 'Waiting',
  FINISHED: 'Finished',
};
