import { apiFetch } from './http';

export type ClienteProfile = {
  clienteId: number;
  nome: string;
  email: string;
  cpf: string;
  locacaoId?: number | null;
  placa?: string | null;
  dataSaida?: string | null;
  dataDevolucao?: string | null;
};


export async function getMyProfile() {
  const res = await apiFetch('/profile/me', { method: 'GET' });
  const ct = res.headers.get('content-type') || '';
  if (!ct.includes('application/json')) {
    const txt = await res.text();
    throw new Error(txt || `Resposta não é JSON`);
  }
  return res.json();
}

