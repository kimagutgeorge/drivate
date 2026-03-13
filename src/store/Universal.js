import { defineStore } from "pinia";

export const universal = defineStore("universal", {});

export function getImageUrl(url) {
  if (!url) return '';
  return url.startsWith('https') ? url : `${import.meta.env.VITE_STRAPI_BASE_URL}${url}`;
}