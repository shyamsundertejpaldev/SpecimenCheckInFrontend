import axios from "axios";

const API_BASE = "https://localhost:44312/api";

export const getManifests = () => axios.get(API_BASE);

export const getSpecimens = (manifestId) =>
  axios.get(`${API_BASE}/Manifests?ManifestId=${manifestId}`);

export const performAction = (payload) =>
  axios.post(`${API_BASE}/Manifests`, payload);
