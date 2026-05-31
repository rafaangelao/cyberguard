import Header from "../components/Header";

export default function Materiais() {
  return (
    <div
      style={{
        fontFamily: "Segoe UI",
        background: "linear-gradient(135deg,#f8fafc,#eef2ff)",
        minHeight: "100vh",
      }}
    >
      <Header />

      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "120px 20px",
        }}
      >
        <h1 style={{ fontSize: "42px" }}>Materiais de Apoio</h1>

        <p style={{ color: "#64748b", marginTop: "10px" }}>
          Aqui você encontra conteúdos para entender melhor sobre cibersegurança,
          proteção de dados e boas práticas digitais.
        </p>

        <div style={{ marginTop: "30px", display: "grid", gap: "15px" }}>
          <Card
            title="🔐 O que é Cibersegurança?"
            text="Conceitos básicos de proteção digital e riscos."
          />
          <Card
            title="🛡️ Boas práticas"
            text="Como proteger empresas contra ataques digitais."
          />
          <Card
            title="📊 Segurança de dados"
            text="Cuidados com informações sensíveis e LGPD."
          />
          <Card
            title="💻 Principais ataques"
            text="Phishing, ransomware e outros riscos comuns."
          />
        </div>
      </div>
    </div>
  );
}

function Card({ title, text }) {
  return (
    <div
      style={{
        background: "white",
        padding: "22px",
        borderRadius: "14px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
      }}
    >
      <h3 style={{ marginBottom: "8px" }}>{title}</h3>
      <p style={{ margin: 0, color: "#64748b" }}>{text}</p>
    </div>
  );
}