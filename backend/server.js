const express = require("express");
const cors    = require("cors");
const bcrypt  = require("bcrypt");
const jwt     = require("jsonwebtoken");
require("dotenv").config();

const db  = require("./db");
const app = express();

app.use(cors({ origin: "http://localhost:5173" })); // porta padrão Vite
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "cyberguard_secret";

// ──────────────────────────────────────────
//  Middleware: verificar token JWT
// ──────────────────────────────────────────
function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ erro: "Token não enviado." });

  const token = header.split(" ")[1];
  try {
    req.usuario = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ erro: "Token inválido ou expirado." });
  }
}

// ──────────────────────────────────────────
//  ROTA: POST /cadastro
// ──────────────────────────────────────────
app.post("/cadastro", async (req, res) => {
  const { nome, email, senha, empresa, papel } = req.body;

  if (!nome || !email || !senha)
    return res.status(400).json({ erro: "Preencha nome, email e senha." });

  try {
    const hash = await bcrypt.hash(senha, 10);
    const [result] = await db.execute(
      "INSERT INTO usuarios (nome, email, senha, empresa, papel) VALUES (?, ?, ?, ?, ?)",
      [nome, email, hash, empresa || null, papel || "usuario"]
    );
    res.status(201).json({ mensagem: "Conta criada com sucesso!", id: result.insertId });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY")
      return res.status(409).json({ erro: "Email já cadastrado." });
    console.error(err);
    res.status(500).json({ erro: "Erro ao cadastrar." });
  }
});

// ──────────────────────────────────────────
//  ROTA: POST /login
// ──────────────────────────────────────────
app.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha)
    return res.status(400).json({ erro: "Informe email e senha." });

  try {
    const [rows] = await db.execute(
      "SELECT * FROM usuarios WHERE email = ?", [email]
    );

    if (rows.length === 0)
      return res.status(401).json({ erro: "Email ou senha incorretos." });

    const usuario = rows[0];
    const senhaOk = await bcrypt.compare(senha, usuario.senha);

    if (!senhaOk)
      return res.status(401).json({ erro: "Email ou senha incorretos." });

    const token = jwt.sign(
      { id: usuario.id, nome: usuario.nome, email: usuario.email, papel: usuario.papel },
      JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({
      token,
      usuario: {
        id:      usuario.id,
        nome:    usuario.nome,
        email:   usuario.email,
        empresa: usuario.empresa,
        papel:   usuario.papel,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro no servidor." });
  }
});

// ──────────────────────────────────────────
//  ROTA: POST /diagnostico  (protegida)
// ──────────────────────────────────────────
app.post("/diagnostico", auth, async (req, res) => {
  const { nivel, percentual, respostas } = req.body;

  if (!nivel || percentual === undefined || !respostas)
    return res.status(400).json({ erro: "Dados incompletos." });

  try {
    const [result] = await db.execute(
      "INSERT INTO diagnosticos (usuario_id, nivel, percentual, respostas) VALUES (?, ?, ?, ?)",
      [req.usuario.id, nivel, percentual, JSON.stringify(respostas)]
    );
    res.status(201).json({ mensagem: "Diagnóstico salvo!", id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao salvar diagnóstico." });
  }
});

// ──────────────────────────────────────────
//  ROTA: GET /diagnosticos  (protegida)
// ──────────────────────────────────────────
app.get("/diagnosticos", auth, async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT id, nivel, percentual, criado_em FROM diagnosticos WHERE usuario_id = ? ORDER BY criado_em DESC",
      [req.usuario.id]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao buscar diagnósticos." });
  }
});

// ──────────────────────────────────────────
//  ROTA: GET /me  (protegida)
// ──────────────────────────────────────────
app.get("/me", auth, (req, res) => {
  res.json(req.usuario);
});

// ──────────────────────────────────────────
//  Inicia servidor
// ──────────────────────────────────────────
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ CyberGuard backend rodando em http://localhost:${PORT}`);
});
