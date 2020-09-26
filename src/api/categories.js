import { API_URL } from "../constants";

export function fetchCategories() {
  return fetch(`${API_URL}/categories`).then(r => r.json());
}
