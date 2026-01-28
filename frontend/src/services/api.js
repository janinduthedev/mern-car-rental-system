import axios from "axios";

const api = axios.create({
  // Render එකේ variable එකක් තියෙනවා නම් ඒක ගනී, නැත්නම් localhost එක ගනී.
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
});

export default api;
