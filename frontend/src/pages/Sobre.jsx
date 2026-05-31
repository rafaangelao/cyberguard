import Header from "../components/Header";

export default function Sobre() {
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
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "120px 20px 60px",
        }}
      >
        {/* TÍTULO */}
        <h1 style={{ fontSize: "42px", marginBottom: "10px" }}>
          Sobre o Projeto CyberGuard
        </h1>

        <p style={{ color: "#64748b", fontSize: "18px", marginBottom: "40px" }}>
          Entenda o problema, a ideia e como a solução funciona na prática.
        </p>

        {/* BLOCO PROBLEMA */}
        <Section
          title="📌 Problema"
          text="Pequenas empresas enfrentam altos riscos digitais, como vazamento de dados, ataques cibernéticos e falta de controle de segurança. Muitas não possuem conhecimento técnico suficiente para identificar essas vulnerabilidades."
        />

        {/* BLOCO CONCEITO */}
        <Section
          title="💡 Conceito"
          text="O CyberGuard é uma plataforma que avalia o nível de maturidade em cibersegurança de pequenos negócios por meio de um checklist interativo, gerando uma análise simples e objetiva."
        />

        {/* BLOCO IDEIA */}
        <Section
          title="🚀 Ideia da Solução"
          text="Transformar conceitos complexos de segurança digital em algo acessível. O sistema traduz respostas simples em uma avaliação clara: Crítico, Moderado, Bom ou Excelente."
        />

        {/* USOS */}
        <Section
          title="🧩 Como pode ser usado"
          text="Empreendedores podem utilizar a ferramenta para avaliar seus sistemas periodicamente, identificar falhas, acompanhar evolução e aplicar melhorias recomendadas automaticamente."
        />
      </div>
    </div>
  );
}

function Section({ title, text }) {
  return (
    <div
      style={{
        background: "white",
        padding: "25px",
        borderRadius: "16px",
        marginBottom: "20px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
      }}
    >
      <h2 style={{ marginBottom: "10px" }}>{title}</h2>
      <p style={{ color: "#475569", lineHeight: "1.6" }}>{text}</p>
    </div>
  );
}