import type { Project, Deadline, CurrentWeather } from './types';
import { isProject, isDeadline, isRecord } from './guards';

async function getJson(url: string): Promise<unknown> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  const data: unknown = await response.json();
  return data;
}

export async function fetchProjects(): Promise<Project[]> {
  const data: unknown = await getJson('/api/projects.json');
  if (!Array.isArray(data) || !data.every(isProject)) {
    throw new Error('Projects came back in an unexpected format.');
  }
  return data;
}

export async function fetchDeadlines(): Promise<Deadline[]> {
  const data: unknown = await getJson('/api/deadlines.json');
  if (!Array.isArray(data) || !data.every(isDeadline)) {
    throw new Error('Deadlines came back in an unexpected format.');
  }
  return data;
}

export async function fetchWeather(): Promise<CurrentWeather> {
  const url = 'https://api.open-meteo.com/v1/forecast?latitude=56.95&longitude=24.11&current=temperature_2m,wind_speed_10m,weather_code&timezone=Europe%2FRiga';
  const data: unknown = await getJson(url);
  
  if (!isRecord(data) || !isRecord(data.current)) {
    throw new Error('Weather came back in an unexpected format.');
  }
  
  const current = data.current;
  if (
    typeof current.time !== 'string' ||
    typeof current.temperature_2m !== 'number' ||
    typeof current.wind_speed_10m !== 'number' ||
    typeof current.weather_code !== 'number'
  ) {
    throw new Error('Weather fields are missing or have wrong types.');
  }
  
  return {
    time: current.time,
    temperature: current.temperature_2m,
    windSpeed: current.wind_speed_10m,
    weatherCode: current.weather_code,
  };
}
