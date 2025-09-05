const API_BASE = import.meta.env.VITE_API_URL;
export const WS_BASE = API_BASE.replace(/^http/, "ws");
