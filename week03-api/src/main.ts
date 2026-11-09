import './style.css';
import type { Project, Deadline, CurrentWeather, LoadState, ProjectFilter } from './types';
import { fetchProjects, fetchDeadlines, fetchWeather } from './api';
import { renderProjects, renderDeadlines } from './render';

const STORAGE_KEY = 'campusflow.week03.localProjects';

let projectsState: LoadState<Project[]> = { status: 'loading' };
let deadlinesState: LoadState<Deadline[]> = { status: 'loading' };
let weatherState: LoadState<CurrentWeather> = { status: 'loading' };
let localProjects: Project[] = [];
let currentFilter: ProjectFilter = 'all';

function loadLocalProjects(): Project[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed: unknown = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.every((p: unknown) => {
        if (typeof p !== 'object' || p === null) return false;
        const obj = p as Record<string, unknown>;
        return typeof obj.id === 'string' && typeof obj.title === 'string' && typeof obj.progress === 'number';
      })) {
        return parsed as Project[];
      }
    }
  } catch (e) {
    console.warn('Failed to read localStorage, using empty array', e);
  }
  return [];
}

function updateUI(): void {
  let displayProjects: LoadState<Project[]> = projectsState;
  if (projectsState.status === 'success') {
    const combined = [...projectsState.data, ...localProjects];
    const filtered = currentFilter === 'all' 
      ? combined 
      : combined.filter(p => p.status === currentFilter);
    displayProjects = { status: 'success', data: filtered };
  }

  renderProjects(displayProjects, 'projectGrid');
  renderDeadlines(deadlinesState, 'deadlineList');
  updateWeatherCard();
  updateActiveProjectsCount();
}

function updateWeatherCard(): void {
  const card = document.getElementById('weatherCard');
  if (!card) return;
  
  if (weatherState.status === 'loading') {
    card.textContent = 'Loading weather…';
  } else if (weatherState.status === 'error') {
    card.textContent = 'Weather unavailable';
  } else {
    card.textContent = `${Math.round(weatherState.data.temperature)}°C · ${weatherState.data.windSpeed} km/h`;
  }
}

function updateActiveProjectsCount(): void {
  const strong = document.querySelector('.stat-card strong');
  if (!strong) return;
  
  if (projectsState.status === 'loading') {
    strong.textContent = '…';
  } else if (projectsState.status === 'error') {
    strong.textContent = '–';
  } else {
    const combined = [...projectsState.data, ...localProjects];
    const count = combined.filter(p => p.status === 'active').length;
    strong.textContent = String(count);
  }
}

async function loadProjects(): Promise<void> {
  projectsState = { status: 'loading' };
  updateUI();
  try {
    const data = await fetchProjects();
    projectsState = { status: 'success', data };
  } catch (e) {
    projectsState = { status: 'error', message: e instanceof Error ? e.message : 'Unknown error' };
  }
  updateUI();
}

async function loadDeadlines(): Promise<void> {
  deadlinesState = { status: 'loading' };
  updateUI();
  try {
    const data = await fetchDeadlines();
    deadlinesState = { status: 'success', data };
  } catch (e) {
    deadlinesState = { status: 'error', message: e instanceof Error ? e.message : 'Unknown error' };
  }
  updateUI();
}

async function loadWeather(): Promise<void> {
  weatherState = { status: 'loading' };
  updateUI();
  try {
    const data = await fetchWeather();
    weatherState = { status: 'success', data };
  } catch (e) {
    weatherState = { status: 'error', message: e instanceof Error ? e.message : 'Unknown error' };
  }
  updateUI();
}

// --- Event Listeners ---

// Retry events
window.addEventListener('retry-projects', () => {
  loadProjects();
});
window.addEventListener('retry-deadlines', () => {
  loadDeadlines();
});

// Filter buttons
document.querySelectorAll<HTMLButtonElement>('.filter-button').forEach(btn => {
  btn.addEventListener('click', () => {
    currentFilter = btn.dataset.filter as ProjectFilter;
    document.querySelectorAll('.filter-button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    updateUI();
  });
});

// Mobile menu
const menuButton = document.getElementById('menuButton');
const mainNav = document.getElementById('mainNav');
if (menuButton && mainNav) {
  menuButton.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
}

// Form
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
      showError(titleInput, 'Minimum 3 characters');
      isValid = false;
    }
    if (descInput.value.trim().length < 10) {
      showError(descInput, 'Minimum 10 characters');
      isValid = false;
    }
    if (!catInput.value) {
      showError(catInput, 'Please select a category');
      isValid = false;
    }
    if (!dateInput.value) {
      showError(dateInput, 'Please specify a date');
      isValid = false;
    }
    const progress = parseInt(progInput.value, 10);
    if (isNaN(progress) || progress < 0 || progress > 100) {
      showError(progInput, 'Must be between 0 and 100');
      isValid = false;
    }

    if (isValid) {
      const newProject: Project = {
        id: crypto.randomUUID(),
        title: titleInput.value.trim(),
        description: descInput.value.trim(),
        category: catInput.value as Project['category'],
        status: progress === 100 ? 'done' : 'active',
        dueDate: dateInput.value,
        progress: progress
      };

      localProjects = [...localProjects, newProject]; // Safe immutable update
      localStorage.setItem(STORAGE_KEY, JSON.stringify(localProjects));
      
      form.reset();
      updateUI();
    }
  });
}

function showError(input: HTMLElement, message: string): void {
  const error = document.createElement('span');
  error.className = 'error-msg text-brand-red text-xs mt-1 block';
  error.textContent = message;
  input.parentElement?.appendChild(error);
}

// Initialize
localProjects = loadLocalProjects();
loadProjects();
loadDeadlines();
loadWeather();