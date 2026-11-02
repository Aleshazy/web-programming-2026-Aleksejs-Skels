import type { Project, Deadline } from './types';

export const initialProjects: Project[] = [
  { id: '1', title: 'Responsive Portfolio', description: 'Create a polished portfolio with reusable components.', category: 'Frontend', status: 'active', dueDate: '2026-09-21', progress: 72 },
  { id: '2', title: 'Weather Dashboard', description: 'Fetch remote data, handle loading states.', category: 'API', status: 'active', dueDate: '2026-09-28', progress: 45 },
  { id: '3', title: 'Task Manager', description: 'Build a small CRUD interface with filtering.', category: 'JavaScript', status: 'done', dueDate: '2026-09-07', progress: 100 }
];

export const initialDeadlines: Deadline[] = [
  { id: 'd1', title: 'Tailwind migration', course: 'Web Programming', date: '2026-09-18', time: '23:59' },
  { id: 'd2', title: 'Portfolio checkpoint', course: 'Web Programming', date: '2026-09-21', time: '18:00' },
  { id: 'd3', title: 'Weather Dashboard', course: 'Web Programming', date: '2026-09-28', time: '23:59' }
];

