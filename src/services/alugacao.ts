import { apiFetch } from './http';

export type AlugacaoForm = {
  cpf: string; 
  nome: string;
  placa: string; 
  dataRetirada: string;
  dataDevolucao: string;
};

export type AlugacaoCard = {
  id: string;
  cpf: string;
  nome: string;
  placa: string;
  dataRetirada: string; 
  dataDevolucao: string; 
};


const BASE_FORM = '/locacoes/form';
const BASE_LOC  = '/locacoes';


const onlyDigits = (s: string) => (s || '').replace(/\D/g, '');
const normPlaca  = (p: string) => (p || '').replace(/-/g, '').toUpperCase();


export function brToISODateTime(d: string, time = '00:00:00') {
  if (!d) return d;
  if (/^\d{4}-\d{2}-\d{2}T/.test(d)) return d;
  if (/^\d{4}-\d{2}-\d{2}$/.test(d)) return `${d}T${time}`;
  const m = d.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!m) return d;
  const [, dd, mm, yyyy] = m;
  return `${yyyy}-${mm}-${dd}T${time}`;
}


export function isoToBR(d?: string) {
  if (!d) return '';
  const m = d.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return d;
  const [, yyyy, mm, dd] = m;
  return `${dd}/${mm}/${yyyy}`;
}

async function ensureOk(res: Response, label: string) {
  if (!res.ok) {
    let body = '';
    try { body = await res.text(); } catch {}
    throw new Error(`${label} -> HTTP ${res.status} ${res.statusText} ${body}`);
  }
}


export async function createAlugacaoFromForm(payload: AlugacaoForm): Promise<AlugacaoCard> {
  const body = {
    cpf: onlyDigits(payload.cpf),
    nome: payload.nome?.trim(),
    placa: normPlaca(payload.placa),
    dataRetirada: brToISODateTime(payload.dataRetirada, '00:00:00'),
    dataDevolucao: brToISODateTime(payload.dataDevolucao, '00:00:00'),
  };

  const res = await apiFetch(BASE_FORM, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  await ensureOk(res, `POST ${BASE_FORM}`);

  const j = await res.json();
  return {
    id: String(j?.id ?? ''),
    cpf: j?.cpf ?? '',
    nome: j?.nome ?? '',
    placa: j?.placa ?? '',
    dataRetirada: isoToBR(j?.dataRetirada),
    dataDevolucao: isoToBR(j?.dataDevolucao),
  };
}

export async function listAlugacoesForm(): Promise<AlugacaoCard[]> {
  const res = await apiFetch(BASE_FORM, { method: 'GET' });
  await ensureOk(res, `GET ${BASE_FORM}`);

  const data = await res.json();
  return (Array.isArray(data) ? data : []).map((a: any) => ({
    id: String(a?.id ?? ''),
    cpf: a?.cpf ?? '',
    nome: a?.nome ?? '',
    placa: a?.placa ?? '',
    dataRetirada: isoToBR(a?.dataRetirada),
    dataDevolucao: isoToBR(a?.dataDevolucao),
  }));
}

export async function updateAlugacaoFromForm(id: string | number, payload: Partial<AlugacaoForm>) {
  const body: any = {};
  if (payload.cpf != null)           body.cpf = onlyDigits(payload.cpf);
  if (payload.nome != null)          body.nome = payload.nome.trim();
  if (payload.placa != null)         body.placa = normPlaca(payload.placa);
  if (payload.dataRetirada)          body.dataRetirada  = brToISODateTime(payload.dataRetirada, '00:00:00');
  if (payload.dataDevolucao)         body.dataDevolucao = brToISODateTime(payload.dataDevolucao, '00:00:00');

 
  const res = await apiFetch(`${BASE_LOC}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  await ensureOk(res, `PUT ${BASE_LOC}/${id}`);
  return res.json();
}


export async function deleteAlugacaoForm(id: string | number) {

  const res = await apiFetch(`${BASE_LOC}/${id}`, { method: 'DELETE' });
  await ensureOk(res, `DELETE ${BASE_LOC}/${id}`);
}
