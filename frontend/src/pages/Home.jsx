import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

function Card({ titulo, texto }) {
  return (
    <div
      style={{
        background: "white",
        border: "1px solid #e2e8f0",
        borderRadius: "14px",
        padding: "20px",
      }}
    >
      <h3 style={{ margin: "0 0 8px 0" }}>{titulo}</h3>
      <p style={{ margin: 0, color: "#64748b" }}>{texto}</p>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        fontFamily: "Segoe UI, sans-serif",
        background: "#f8fafc",
        color: "#0f172a",
      }}
    >
      <Header />

      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 80px",
          paddingTop: "100px",
        }}
      >
        <div style={{ width: "55%" }}>
          <div
            style={{
              display: "inline-block",
              padding: "6px 14px",
              background: "#dbeafe",
              color: "#1d4ed8",
              borderRadius: "999px",
              marginBottom: "20px",
              fontWeight: 600,
            }}
          >
            Projeto de Cibersegurança
          </div>

          <h1 style={{ fontSize: "64px", lineHeight: "1.05" }}>
            Segurança digital para pequenas empresas
          </h1>

          <p style={{ fontSize: "18px", color: "#475569" }}>
            Avalie vulnerabilidades, receba recomendações e melhore a maturidade
            em cibersegurança do seu negócio.
          </p>

          <div style={{ marginTop: "30px", display: "flex", gap: "12px" }}>
            <button
              onClick={() => navigate("/diagnostico")}
              style={{
                background: "#1d4ed8",
                color: "white",
                border: "none",
                padding: "14px 22px",
                borderRadius: "10px",
              }}
            >
              Fazer Diagnóstico
            </button>

            <button
              onClick={() => navigate("/sobre")}
              style={{
                background: "white",
                border: "1px solid #cbd5e1",
                padding: "14px 22px",
                borderRadius: "10px",
              }}
            >
              Sobre o Projeto
            </button>
          </div>
        </div>

        <div style={{ width: "35%", display: "flex", flexDirection: "column", gap: "16px" }}>
          <Card titulo="🔐 Segurança" texto="Proteção de dados e sistemas" />
          <Card titulo="📊 Diagnóstico" texto="Avaliação automática de risco" />
          <Card titulo="💡 Recomendações" texto="Boas práticas aplicadas" />
        </div>
      </section>
    </div>
  );
}