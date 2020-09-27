import { API_URL } from "../constants";

export function fetchCurrentUser() {
  return fetch(`${API_URL}/me`).then(r => r.json());
}
