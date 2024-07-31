import { writable } from 'svelte/store';

export const theme = writable(localStorage.getItem('theme') || 'light');

theme.subscribe(value => {
  if (value === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  localStorage.setItem('theme', value);
});