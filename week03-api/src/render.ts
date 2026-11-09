import type { Project, Deadline, LoadState } from './types';

export function renderProjects(state: LoadState<Project[]>, containerId: string): void {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';

  if (state.status === 'loading') {
    const p = document.createElement('p');
    p.className = 'loading-text text-muted';
    p.setAttribute('role', 'status');
    p.textContent = 'Loading projects…';
    container.appendChild(p);
    return;
  }

  if (state.status === 'error') {
    const div = document.createElement('div');
    div.setAttribute('role', 'alert');
    const p = document.createElement('p');
    p.className = 'error-text text-brand-red';
    p.textContent = state.message;
    div.appendChild(p);
    
    const btn = document.createElement('button');
    btn.className = 'retry-button mt-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold';
    btn.textContent = 'Try again';
    btn.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('retry-projects'));
    });
    div.appendChild(btn);
    container.appendChild(div);
    return;
  }

  // success
  if (state.data.length === 0) {
    const p = document.createElement('p');
    p.className = 'loading-text text-muted';
    p.textContent = 'No projects yet.';
    container.appendChild(p);
    return;
  }

  state.data.forEach(project => {
    container.appendChild(createProjectCard(project));
  });
}

function createProjectCard(project: Project): HTMLElement {
  const card = document.createElement('article');
  card.className = 'project-card';

  const header = document.createElement('div');
  header.className = 'project-card-header';

  const title = document.createElement('h3');
  title.textContent = project.title; // Safe: textContent prevents XSS

  const badge = document.createElement('span');
  badge.className = project.status === 'done' ? 'badge badge-status-done' : 'badge badge-status-active';
  badge.textContent = project.status;

  header.appendChild(title);
  header.appendChild(badge);

  const desc = document.createElement('p');
  desc.textContent = project.description;

  const footer = document.createElement('div');
  footer.className = 'project-card-footer';

  const cat = document.createElement('span');
  cat.className = 'badge badge-category';
  cat.textContent = project.category;

  const date = document.createElement('span');
  date.textContent = project.dueDate;

  footer.appendChild(cat);
  footer.appendChild(date);

  card.appendChild(header);
  card.appendChild(desc);
  card.appendChild(footer);

  const progressBar = document.createElement('div');
  progressBar.className = 'progress-bar';
  const progressFill = document.createElement('div');
  progressFill.className = 'progress-bar-fill';
  progressFill.style.width = `${project.progress}%`;
  progressBar.appendChild(progressFill);
  card.appendChild(progressBar);

  return card;
}

export function renderDeadlines(state: LoadState<Deadline[]>, containerId: string): void {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';

  if (state.status === 'loading') {
    const p = document.createElement('p');
    p.className = 'loading-text text-muted';
    p.setAttribute('role', 'status');
    p.textContent = 'Loading deadlines…';
    container.appendChild(p);
    return;
  }

  if (state.status === 'error') {
    const div = document.createElement('div');
    div.setAttribute('role', 'alert');
    const p = document.createElement('p');
    p.className = 'error-text text-brand-red';
    p.textContent = state.message;
    div.appendChild(p);
    
    const btn = document.createElement('button');
    btn.className = 'retry-button mt-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold';
    btn.textContent = 'Try again';
    btn.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('retry-deadlines'));
    });
    div.appendChild(btn);
    container.appendChild(div);
    return;
  }

  // success
  if (state.data.length === 0) {
    const p = document.createElement('p');
    p.className = 'loading-text text-muted';
    p.textContent = 'No upcoming deadlines.';
    container.appendChild(p);
    return;
  }

  const sorted = [...state.data].sort((a, b) => a.date.localeCompare(b.date));
  sorted.forEach(deadline => {
    container.appendChild(createDeadlineItem(deadline));
  });
}

function createDeadlineItem(deadline: Deadline): HTMLElement {
  const item = document.createElement('div');
  item.className = 'deadline-item';

  const left = document.createElement('div');
  left.className = 'deadline-item-left';

  const title = document.createElement('h4');
  title.textContent = deadline.title;

  const course = document.createElement('span');
  course.textContent = deadline.course;

  left.appendChild(title);
  left.appendChild(course);

  const right = document.createElement('div');
  right.className = 'deadline-item-right';

  const date = document.createElement('strong');
  date.textContent = deadline.date;

  const time = document.createElement('span');
  time.textContent = deadline.time;

  right.appendChild(date);
  right.appendChild(time);

  item.appendChild(left);
  item.appendChild(right);

  return item;
}