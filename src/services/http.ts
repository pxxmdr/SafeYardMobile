import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../config/env";


export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = await AsyncStorage.getItem("@safeyard:token");

  
  const BASE = API_URL.replace(/\/$/, "");
  const url = path.startsWith("http")
    ? path
    : `${BASE}/api${path.startsWith("/") ? path : `/${path}`}`;

  const headers: HeadersInit = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(url, { ...options, headers });

  if (!res.ok) {
    let detail = "";
    try {
      detail = await res.text();
    } catch {}
    const msg = detail || `HTTP ${res.status} ${res.statusText}`;
    throw new Error(msg);
  }

  return res;
}
