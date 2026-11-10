import axios from 'axios';
import type { Character, Film, Planet, SwapiListResponse } from '../types';

const BASE_URL = 'https://swapi.dev/api';

const api = axios.create({
  baseURL: BASE_URL,
});

export const getCharacters = (page = 1): Promise<SwapiListResponse<Character>> =>
  api.get<SwapiListResponse<Character>>(`/people/?page=${page}`).then((r) => r.data);

export const getCharacterById = (id: string): Promise<Character> =>
  api.get<Character>(`/people/${id}/`).then((r) => r.data);

export const searchCharacters = (query: string): Promise<SwapiListResponse<Character>> =>
  api.get<SwapiListResponse<Character>>(`/people/?search=${encodeURIComponent(query)}`).then((r) => r.data);

export const getPlanet = (url: string): Promise<Planet> =>
  axios.get<Planet>(url).then((r) => r.data);

export const getFilm = (url: string): Promise<Film> =>
  axios.get<Film>(url).then((r) => r.data);

/** Extract the numeric ID from a SWAPI resource URL, e.g. https://swapi.dev/api/people/1/ → "1" */
export const extractId = (url: string): string => {
  const parts = url.replace(/\/$/, '').split('/');
  return parts[parts.length - 1];
};
