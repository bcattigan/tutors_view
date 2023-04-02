import { writable, type Writable } from 'svelte/store';
import type { Lo, WeekType } from '../types/lo-types';
import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Course } from '../models/course';

const weekType: WeekType = {
	title: '',
	type: '',
	date: '',
	dateObj: null
};

export const week = writable(weekType);
export const courseUrl = writable('');
export const currentCourse: Writable<Course> = writable();
export const currentLo: Writable<Lo> = writable();
export const portfolio = writable(false);
export const layout = writable('');
export const currentPage = writable('');
export const storeTheme = localStorageStore('storeTheme', 'tutors');
export const home: Writable<boolean> = writable(false);
export const filePath = localStorageStore('filePath', '');
