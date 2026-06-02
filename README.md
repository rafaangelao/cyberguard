<div align="center">

<img src="https://img.shields.io/badge/🛡️_CyberGuard-Cibersegurança_para_PMEs-2563eb?style=for-the-badge&labelColor=0f172a" alt="CyberGuard"/>

<br/>
<br/>

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-FB015B?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

<br/>

> **Trabalho de Conclusão de Curso — ETEC São Paulo · 2026**  
> Técnico em Desenvolvimento de Sistemas — Modalidade EaD  
> Orientador: **Prof. Cesar Cari Eliseu**

<br/>

[🌐 Acessar o Site](https://cyberguard-7rp4-p0bi2fjm8-rafaangelaos-projects.vercel.app) · [📋 Ver Diagnóstico](#) · [📄 Documentação](#sobre-o-projeto)

</div>

---

## 🛡️ Sobre o Projeto

O **CyberGuard** é uma plataforma web voltada ao apoio de pequenos empreendedores na gestão da cibersegurança de seus negócios.

Diante do crescente número de ameaças digitais e da vulnerabilidade das pequenas empresas frente a ataques cibernéticos, o sistema propõe uma abordagem **prática e acessível** para a identificação de riscos e a adoção de boas práticas de segurança da informação.

### O problema
- 🔴 **60%** das pequenas empresas brasileiras já sofreram algum ataque digital
- 📈 **80%** de aumento em ataques a pequenas empresas em 2023
- ✅ **95%** dos ataques poderiam ser evitados com boas práticas

---

## ✨ Funcionalidades

- 🔐 **Autenticação segura** — Cadastro e login com JWT e bcrypt
- 📋 **Checklist interativo** — 10 perguntas ponderadas por área de risco
- 📊 **Diagnóstico automático** — Classificação em Crítico, Moderado, Bom ou Excelente
- 📄 **Relatório em PDF** — Export do resultado para guardar ou compartilhar
- 🏆 **Histórico de avaliações** — Acompanhe sua evolução ao longo do tempo

---

## 🏗️ Arquitetura

```
CyberGuard/
├── frontend/          # React + Vite
│   └── src/
│       ├── pages/     # Home, Login, Cadastro, Diagnóstico, Materiais, Sobre
│       ├── components/# Header, PageWrapper
│       └── api.js     # Integração com o backend
│
└── backend/           # Node.js + Express
    ├── server.js      # Rotas da API REST
    └── db.js          # Conexão MySQL
```

### Stack tecnológica

| Camada | Tecnologia |
|--------|-----------|
| Frontend | React.js + Vite |
| Backend | Node.js + Express |
| Banco de dados | MySQL |
| Autenticação | JWT + bcryptjs |
| Deploy Frontend | Vercel |
| Deploy Backend | Railway |
| Relatórios | jsPDF |

---

## 🚀 Como rodar localmente

### Pré-requisitos
- Node.js 18+
- MySQL (XAMPP ou similar)

### 1. Clone o repositório
```bash
git clone https://github.com/rafaangelao/cyberguard.git
cd cyberguard
```

### 2. Configure o banco de dados
Importe o arquivo `banco_cyberguard.sql` no phpMyAdmin.

### 3. Configure o backend
```bash
cd backend
cp .env.example .env
# Edite o .env com suas credenciais do MySQL
npm install
npm run dev
```

### 4. Configure o frontend
```bash
cd frontend
npm install
npm run dev
```

Acesse: `http://localhost:5173`

---

## 🔌 API Endpoints

| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| `POST` | `/cadastro` | ❌ | Cria novo usuário |
| `POST` | `/login` | ❌ | Retorna token JWT |
| `POST` | `/diagnostico` | ✅ | Salva diagnóstico |
| `GET` | `/diagnosticos` | ✅ | Lista diagnósticos do usuário |
| `GET` | `/me` | ✅ | Dados do usuário logado |

---

## 👥 Equipe

<table align="center">
  <tr>
    <td align="center">🎯</td>
    <td><strong>Rafael Santiago Angelão</strong><br/><sub>Product Owner & Desenvolvedor</sub></td>
  </tr>
  <tr>
    <td align="center">🧭</td>
    <td><strong>Danilo Dellape Gonçalves</strong><br/><sub>Scrum Master</sub></td>
  </tr>
  <tr>
    <td align="center">👨‍💻</td>
    <td><strong>Augusto Martins</strong><br/><sub>Desenvolvedor</sub></td>
  </tr>
  <tr>
    <td align="center">👩‍💻</td>
    <td><strong>Lidia Dantas da Silva</strong><br/><sub>Desenvolvedora</sub></td>
  </tr>
  <tr>
    <td align="center">👩‍💻</td>
    <td><strong>Yarah de Assis Silveira Araújo</strong><br/><sub>Desenvolvedora</sub></td>
  </tr>
  <tr>
    <td align="center">🎓</td>
    <td><strong>Prof. Cesar Cari Eliseu</strong><br/><sub>Orientador</sub></td>
  </tr>
</table>

---

## 🏫 Instituição

**Centro Paula Souza — ETEC São Paulo**  
Superintendência de Ensino e Pesquisa nas Modalidades EaD e Aberta  
Técnico em Desenvolvimento de Sistemas — Modalidade EaD · 2026

---

## 📝 Metodologia

O projeto adota a metodologia ágil **Scrum**, organizado em sprints quinzenais com cerimônias regulares de planejamento, revisão e retrospectiva.

- ✅ **Sprint 1** — Módulo de autenticação (cadastro e login)
- ✅ **Sprint 2** — Módulo de checklist e avaliação de risco
- 🔄 **Sprint 3** — Melhorias e funcionalidades adicionais

---

<div align="center">

**🛡️ CyberGuard · ETEC São Paulo · 2026**

*Democratizando a cibersegurança para pequenas empresas brasileiras*

</div>
