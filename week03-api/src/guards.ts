import type { Project, Deadline } from './types';

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function isProject(value: unknown): value is Project {
  if (!isRecord(value)) return false;
  return (
    typeof value.id === 'string' &&
    typeof value.title === 'string' &&
    typeof value.description === 'string' &&
    typeof value.category === 'string' &&
    (value.status === 'active' || value.status === 'done') &&
    typeof value.dueDate === 'string' &&
    typeof value.progress === 'number'
  );
}

export function isDeadline(value: unknown): value is Deadline {
  if (!isRecord(value)) return false;
  return (
    typeof value.id === 'string' &&
    typeof value.title === 'string' &&
    typeof value.course === 'string' &&
    typeof value.date === 'string' &&
    typeof value.time === 'string'
  );
}
