import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Header from "../components/Header";

export default function Login() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const navigate = useNavigate();

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
            width: "420px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
            border: "1px solid #e5e7eb",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "25px",
            }}
          >
            <h2
              style={{
                margin: 0,
                color: "#111827",
                fontSize: "28px",
                fontWeight: "700",
              }}
            >
              Bem-vindo
            </h2>

            <p
              style={{
                marginTop: "8px",
                color: "#6b7280",
                fontSize: "14px",
              }}
            >
              Entre para acessar sua conta
            </p>
          </div>

          <input
            type="email"
            placeholder="Seu e-mail"
            style={input}
          />

          <div
            style={{
              position: "relative",
              marginTop: "12px",
            }}
          >
            <input
              type={mostrarSenha ? "text" : "password"}
              placeholder="Sua senha"
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
                border: "none",
                background: "transparent",
                cursor: "pointer",
                color: "#6b7280",
              }}
            >
              {mostrarSenha ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>

          <div
            style={{
              textAlign: "right",
              marginTop: "10px",
            }}
          >
            <a
              href="#"
              style={{
                color: "#2563eb",
                fontSize: "13px",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              Esqueci minha senha
            </a>
          </div>

          <button style={button}>
            Entrar
          </button>

          <div
            style={{
              textAlign: "center",
              marginTop: "20px",
              color: "#6b7280",
              fontSize: "14px",
            }}
          >
            Não possui conta?{" "}
            <span
              onClick={() => navigate("/cadastro")}
              style={{
                color: "#2563eb",
                fontWeight: "600",
                cursor: "pointer",
                transition: "0.2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#1d4ed8";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "#2563eb";
              }}
            >
              Criar conta
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const input = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: "12px",
  border: "1px solid #d1d5db",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box",
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