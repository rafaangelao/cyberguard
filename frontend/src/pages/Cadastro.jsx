import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Header from "../components/Header";

export default function Cadastro() {
  const navigate = useNavigate();

  const [mostrarSenha, setMostrarSenha] = useState(false);

  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    empresa: "",
    papel: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function cadastrar() {
    localStorage.setItem("user", JSON.stringify(form));
    navigate("/login");
  }

  return (
    <div
      style={{
        fontFamily: "Segoe UI",
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #f8fafc 0%, #eef2ff 50%, #f8fafc 100%)",
      }}
    >
      <Header />

      <div
        style={{
          paddingTop: "140px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: "40px",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "40px",
            borderRadius: "24px",
            width: "430px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
            border: "1px solid #e5e7eb",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "25px" }}>
            <h2
              style={{
                margin: 0,
                color: "#111827",
                fontSize: "28px",
                fontWeight: "700",
              }}
            >
              Criar conta
            </h2>

            <p
              style={{
                color: "#6b7280",
                marginTop: "8px",
                fontSize: "14px",
              }}
            >
              Preencha os dados para começar
            </p>
          </div>

          <input
            name="nome"
            placeholder="Nome completo"
            onChange={handleChange}
            style={input}
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            style={input}
          />

          <div style={{ position: "relative", marginTop: "12px" }}>
            <input
              name="senha"
              type={mostrarSenha ? "text" : "password"}
              placeholder="Senha"
              onChange={handleChange}
              style={{
                ...input,
                marginTop: 0,
                paddingRight: "50px",
              }}
            />

            <button
              type="button"
              onClick={() => setMostrarSenha(!mostrarSenha)}
              style={{
                position: "absolute",
                right: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#6b7280",
              }}
            >
              {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <input
            name="empresa"
            placeholder="Empresa"
            onChange={handleChange}
            style={input}
          />

          <select
            name="papel"
            onChange={handleChange}
            style={input}
          >
            <option value="">Selecione o papel</option>
            <option value="gestor">Gestor</option>
            <option value="ti">TI / Segurança</option>
            <option value="usuario">Usuário comum</option>
          </select>

          <button onClick={cadastrar} style={button}>
            Criar conta
          </button>
        </div>
      </div>
    </div>
  );
}

const input = {
  width: "100%",
  padding: "14px 16px",
  marginTop: "12px",
  borderRadius: "12px",
  border: "1px solid #d1d5db",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box",
  transition: "all 0.2s ease",
};

const button = {
  width: "100%",
  marginTop: "24px",
  padding: "14px",
  background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
  color: "#fff",
  border: "none",
  borderRadius: "12px",
  fontSize: "15px",
  fontWeight: "600",
  cursor: "pointer",
  boxShadow: "0 8px 20px rgba(37,99,235,0.25)",
};