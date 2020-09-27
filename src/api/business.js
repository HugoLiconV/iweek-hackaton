import { API_URL } from "../constants";

export function fetchBusiness() {
  return fetch(`${API_URL}/businesses`).then(r => r.json());
}

export function fetchBusinessById(key, id) {
  return fetch(`${API_URL}/businesses/${id}`).then(r => r.json());
}

export function postBusiness(data) {
  return fetch(`${API_URL}/businesses`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(r => r.json());
}
