import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiFetch } from './http';
import { API_URL } from '../config/env';

export type RegisterPayload = {
  nome: string;
  cpf: string;
  email: string;
  senha: string;
};

type LoginPayload = { email: string; password: string };


const BASE = `${API_URL.replace(/\/$/, '')}/api/auth`;


export const onlyDigits = (s: string) => (s || '').replace(/\D/g, '');

export async function registerUser(payload: RegisterPayload) {
  const body = {
    nome: payload.nome.trim(),
    cpf: onlyDigits(payload.cpf),
    email: payload.email.trim().toLowerCase(),
    senha: payload.senha,
  };

  const res = await fetch(`${BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    let msg = `Falha no cadastro (HTTP ${res.status})`;
    try {
      const t = await res.text();
      if (t) {
        try {
          const j = JSON.parse(t);
          msg = j?.message ?? j?.error ?? t;
        } catch {
          msg = t;
        }
      }
    } catch {}
    throw new Error(msg);
  }

  return res.json(); 
}

export async function login({ email, password }: LoginPayload) {
  const res = await fetch(`${BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha: password, password }),
  });

  if (!res.ok) {
    let msg = 'Falha no login';
    try { const j = await res.json(); msg = j?.message ?? msg; } catch {}
    throw new Error(msg);
  }

  const data = await res.json();
  const token: string = data?.token || data?.access_token || data?.jwt;
  if (!token) throw new Error('Token não retornado pela API.');

  await AsyncStorage.setItem('@safeyard:token', token);
  return token;
}

export async function whoAmI() {
  const res = await apiFetch('/auth/me', { method: 'GET' });
  if (!res.ok) throw new Error(`Falha no /auth/me (HTTP ${res.status})`);
  return res.json() as Promise<{
    email?: string;
    role?: string;
    authorities?: Array<{ authority?: string } | string>;
    [k: string]: any;
  }>;
}


export async function logout() {
  try {
    await AsyncStorage.removeItem('@safeyard:token');
    return true;
  } catch {
    return false;
  }
}


const Auth = { registerUser, login, whoAmI, logout, onlyDigits };
export default Auth;
