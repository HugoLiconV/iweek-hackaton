import { API_URL } from "../constants";

export function fetchBusiness() {
  return fetch(`${API_URL}/business`).then(r => r.json());
}
