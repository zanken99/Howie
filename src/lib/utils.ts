import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')     // Replace spaces with -
        .replace(/[^a-z0-9а-яё\-_]+/g, '') // Remove non-alphanumeric chars (including Cyrillic)
        .replace(/\-\-+/g, '-');  // Replace multiple - with single -
}
