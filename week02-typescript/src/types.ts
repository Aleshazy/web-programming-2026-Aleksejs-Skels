export type ProjectStatus = "active" | "done";
export type Category = "Frontend" | "API" | "JavaScript" | "Other";
export type ProjectFilter = ProjectStatus | "all";

export interface Project {
  id: string;
  title: string;
  description: string;
  category: Category;
  status: ProjectStatus;
  dueDate: string;
  progress: number;
}

export interface Deadline {
  id: string;
  title: string;
  course: string;
  date: string;
  time: string;
}
