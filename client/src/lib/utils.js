// utils.js - Utility functions for class name merging and other helpers
import { clsx } from 'clsx';
import { twMerge } from 'tw-merge';

// cn - Merges class names with Tailwind CSS compatibility
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}