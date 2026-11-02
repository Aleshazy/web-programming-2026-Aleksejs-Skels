import './style.css';
import type { Project, ProjectFilter } from './types';
import { initialProjects, initialDeadlines } from './data';
import { renderProjects, renderDeadlines, updateActiveProjectsCount } from './render';

function loadProjects(): Project[] {
  try {
    const stored = localStorage.getItem('campusflow_projects');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.every((p: any) => p.id && p.title && typeof p.progress === 'number')) {
        return parsed as Project[];
      }
    }
  } catch (e) {
    console.warn('РћС€РёР±РєР° С‡С‚РµРЅРёСЏ localStorage, РёСЃРїРѕР»СЊР·СѓРµРј РЅР°С‡Р°Р»СЊРЅС‹Рµ РґР°РЅРЅС‹Рµ', e);
  }
  return initialProjects;
}

let projects = loadProjects();
const deadlines = initialDeadlines;
let currentFilter: ProjectFilter = 'all';

function updateUI(): void {
  const filtered = currentFilter === 'all' 
    ? projects 
    : projects.filter(p => p.status === currentFilter);
  
  renderProjects(filtered, 'projectGrid');
  renderDeadlines(deadlines, 'deadlineList');
}

const filterButtons = document.querySelectorAll<HTMLButtonElement>('.filter-button');
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    currentFilter = btn.dataset.filter as ProjectFilter;
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    updateUI();
updateActiveProjectsCount(projects);
  });
});

const menuButton = document.getElementById('menuButton');
const mainNav = document.getElementById('mainNav');
if (menuButton && mainNav) {
  menuButton.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
}

const form = document.getElementById('addProjectForm') as HTMLFormElement | null;
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const titleInput = document.getElementById('projTitle') as HTMLInputElement;
    const descInput = document.getElementById('projDesc') as HTMLInputElement;
    const catInput = document.getElementById('projCat') as HTMLSelectElement;
    const dateInput = document.getElementById('projDate') as HTMLInputElement;
    const progInput = document.getElementById('projProg') as HTMLInputElement;

    document.querySelectorAll('.error-msg').forEach(el => el.remove());

    let isValid = true;

    if (titleInput.value.trim().length < 3) {
      showError(titleInput, 'РњРёРЅРёРјСѓРј 3 СЃРёРјРІРѕР»Р°');
      isValid = false;
    }
    if (descInput.value.trim().length < 10) {
      showError(descInput, 'РњРёРЅРёРјСѓРј 10 СЃРёРјРІРѕР»РѕРІ');
      isValid = false;
    }
    if (!catInput.value) {
      showError(catInput, 'Р’С‹Р±РµСЂРёС‚Рµ РєР°С‚РµРіРѕСЂРёСЋ');
      isValid = false;
    }
    if (!dateInput.value) {
      showError(dateInput, 'РЈРєР°Р¶РёС‚Рµ РґР°С‚Сѓ');
      isValid = false;
    }
    const progress = parseInt(progInput.value, 10);
    if (isNaN(progress) || progress < 0 || progress > 100) {
      showError(progInput, 'РћС‚ 0 РґРѕ 100');
      isValid = false;
    }

    if (isValid) {
      const newProject: Project = {
        id: crypto.randomUUID(),
        title: titleInput.value.trim(),
        description: descInput.value.trim(),
        category: catInput.value as any,
        status: progress === 100 ? 'done' : 'active',
        dueDate: dateInput.value,
        progress: progress
      };

      projects.push(newProject);
      localStorage.setItem('campusflow_projects', JSON.stringify(projects));
      
      form.reset();
      updateUI();
updateActiveProjectsCount(projects);
    }
  });
}

function showError(input: HTMLElement, message: string): void {
  const error = document.createElement('span');
  error.className = 'error-msg text-brand-red text-xs mt-1 block';
  error.textContent = message;
  input.parentElement?.appendChild(error);
}

updateUI();
updateActiveProjectsCount(projects);



