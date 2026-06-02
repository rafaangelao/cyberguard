// src/api.js
// Centraliza todas as chamadas ao backend CyberGuard

const BASE = "http://localhost:3001";

function getToken() {
  return localStorage.getItem("cg_token");
}

function headers(auth = false) {
  const h = { "Content-Type": "application/json" };
  if (auth) h["Authorization"] = `Bearer ${getToken()}`;
  return h;
}

// ── Auth ──────────────────────────────────
export async function apiCadastro(dados) {
  const res = await fetch(`${BASE}/cadastro`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(dados),
  });
  return res.json();
}

export async function apiLogin(email, senha) {
  const res = await fetch(`${BASE}/login`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ email, senha }),
  });
  return res.json();
}

// ── Diagnóstico ───────────────────────────
export async function apiSalvarDiagnostico(dados) {
  const res = await fetch(`${BASE}/diagnostico`, {
    method: "POST",
    headers: headers(true),
    body: JSON.stringify(dados),
  });
  return res.json();
}

export async function apiListarDiagnosticos() {
  const res = await fetch(`${BASE}/diagnosticos`, {
    headers: headers(true),
  });
  return res.json();
}
 
