import axios from "axios";

const BASE = import.meta.env.VITE_API_BASE;

const API = axios.create({
  baseURL: `${BASE}/api`,
  timeout: 8000
});

// create
export const createLink = (payload) => API.post("/links", payload).then(r => r.data);

// list
export const getAllLinks = () => API.get("/links").then(r => r.data);

// stats
export const getLinkStats = (code) => API.get(`/links/${code}`).then(r => r.data);

// delete
export const deleteLink = (code) => API.delete(`/links/${code}`).then(r => r.data);

export default API;
