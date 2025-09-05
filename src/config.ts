const API_BASE = import.meta.env.VITE_API_URL;

// GraphQL endpoint
export const GRAPHQL_URL = `${API_BASE}/graphql`;

// WebSocket base (для чата/уведомлений)
export const WS_BASE = API_BASE.replace(/^http/, "ws");
