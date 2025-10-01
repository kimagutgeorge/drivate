export const api = "http://127.0.0.1:5000";
// export const api = "https://5810a3a76d48.ngrok-free.app";
export const base_url = "localhost:5173";

export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}
