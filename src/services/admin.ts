import { apiFetch } from '../services/http';

export type AdminForm = {
  nome: string;
  email: string;
  senha: string;
};

const BASE = '/api/usuarios';

export async function createUsuario(payload: AdminForm) {
  const res = await apiFetch(BASE, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' },
  });
  return res.json(); 
}

export async function listUsuarios() {
  const res = await apiFetch(BASE, { method: 'GET' });
  return res.json() as Promise<any[]>; 
}


export async function updateUsuario(id: number | string, payload: Partial<AdminForm>) {
  const res = await apiFetch(`${BASE}/${id}`, {
    method: 'PUT', 
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' },
  });
  return res.json();
}

export async function deleteUsuario(id: number | string) {
  await apiFetch(`${BASE}/${id}`, { method: 'DELETE' });
}
