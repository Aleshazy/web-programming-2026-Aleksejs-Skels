import type { Project, Deadline, Category } from './types';

const categoryColors: Record<Category, string> = {
  Frontend: 'badge-purple',
  API: 'badge-blue',
  JavaScript: 'badge-green',
  Other: 'badge-gray'
};

const categoryFill: Record<Category, string> = {
  Frontend: 'purple',
  API: 'blue',
  JavaScript: 'green',
  Other: 'gray'
};

function createProjectCard(project: Project): HTMLElement {
  const article = document.createElement('article');
  article.className = 'project-card';
  article.dataset.status = project.status;

  const topDiv = document.createElement('div');
  topDiv.className = 'project-top';
  
  const badge = document.createElement('span');
  badge.className = 'badge ' + categoryColors[project.category];
  badge.textContent = project.category;
  
  const status = document.createElement('span');
  status.className = 'project-status status-' + project.status;
  status.textContent = project.status === 'active' ? 'Active' : 'Done';
  
  topDiv.append(badge, status);

  const h3 = document.createElement('h3');
  h3.textContent = project.title;

  const p = document.createElement('p');
  p.textContent = project.description;

  const meta = document.createElement('div');
  meta.className = 'project-meta';
  const spanDate = document.createElement('span');
  spanDate.textContent = 'Due ' + project.dueDate;
  const spanProgress = document.createElement('span');
  spanProgress.textContent = project.progress + '% complete';
  meta.append(spanDate, spanProgress);

  const progressTrack = document.createElement('div');
  progressTrack.className = 'progress-track small';
  const progressFill = document.createElement('div');
  progressFill.className = 'progress-fill ' + categoryFill[project.category];
  progressFill.style.width = project.progress + '%';
  progressTrack.appendChild(progressFill);

  const link = document.createElement('a');
  link.className = 'text-link';
  link.href = '#';
  link.textContent = project.status === 'done' ? 'View submission в†’' : 'Open project в†’';

  article.append(topDiv, h3, p, meta, progressTrack, link);
  return article;
}

export function renderProjects(projects: Project[], containerId: string): void {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = ''; 
  projects.forEach(project => container.appendChild(createProjectCard(project)));
}

export function renderDeadlines(deadlines: Deadline[], containerId: string): void {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  
  deadlines.forEach(dl => {
    const article = document.createElement('article');
    article.className = 'deadline-item';
    
    const dateBox = document.createElement('div');
    dateBox.className = 'date-box';
    const day = document.createElement('strong');
    day.textContent = dl.date.split('-')[2];
    const month = document.createElement('span');
    month.textContent = dl.date.split('-')[1]; 
    dateBox.append(day, month);

    const copy = document.createElement('div');
    copy.className = 'deadline-copy';
    const title = document.createElement('strong');
    title.textContent = dl.title;
    const course = document.createElement('span');
    course.textContent = dl.course + ' В· ' + dl.time;
    copy.append(title, course);

    article.append(dateBox, copy);
    container.appendChild(article);
  });
}

export function updateActiveProjectsCount(projects: Project[]): void {
  const count = projects.filter(p => p.status === 'active').length;
  const statCards = document.querySelectorAll('.stat-card');
  if (statCards.length > 0) {
    const strong = statCards[0].querySelector('strong');
    if (strong) strong.textContent = String(count);
  }
}