import { API_URL } from "../constants";

export function fetchBusiness() {
  return fetch(`${API_URL}/businesses`).then(r => r.json());
}

export function fetchBusinessById(id) {
  return fetch(`${API_URL}/businesses/${id}`).then(r => r.json());
}
