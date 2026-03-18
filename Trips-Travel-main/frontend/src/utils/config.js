// Vite uses import.meta.env for environment variables
const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3050/api";
export default BASE_URL;
