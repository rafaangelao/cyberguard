import { useState } from "react";
import jsPDF from "jspdf";
import Header from "../components/Header";

export default function Diagnostico() {
  const perguntas = [
    { id: 1, texto: "A empresa usa autenticação em dois fatores (MFA)?", peso: 2 },
    { id: 2, texto: "Funcionários recebem treinamento de segurança?", peso: 2 },
    { id: 3, texto: "Existe backup regular dos dados?", peso: 3 },
    { id: 4, texto: "Antivírus atualizado em todos os dispositivos?", peso: 2 },
    { id: 5, texto: "Existe controle de acesso aos sistemas?", peso: 3 },
  ];

  const [respostas, setRespostas] = useState({});
  const [resultado, setResultado] = useState(null);

  function handleResposta(id, valor) {
    setRespostas((prev) => ({
      ...prev,
      [id]: valor,
    }));
  }

  function calcular() {
    let total = 0;
    let max = 0;

    perguntas.forEach((p) => {
      max += p.peso * 2;

      const r = respostas[p.id];
      if (r === "sim") total += p.peso * 2;
      if (r === "parcial") total += p.peso;
    });

    const percent = (total / max) * 100;

    let nivel = "Crítico";
    if (percent > 40) nivel = "Moderado";
    if (percent > 60) nivel = "Bom";
    if (percent > 80) nivel = "Excelente";

    setResultado({
      nivel,
      percent: percent.toFixed(0),
    });
  }

  function baixarPDF() {
    if (!resultado) return;

    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Relatório de Diagnóstico de Cibersegurança", 10, 20);

    doc.setFontSize(12);
    doc.text(`Nível: ${resultado.nivel}`, 10, 40);
    doc.text(`Maturidade: ${resultado.percent}%`, 10, 50);

    doc.text(
      "Relatório gerado automaticamente com base no checklist.",
      10,
      70
    );

    doc.save("diagnostico-ciberseguranca.pdf");
  }

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
          paddingTop: "120px",
          maxWidth: "900px",
          margin: "0 auto",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        {/* TÍTULO */}
        <h1 style={{ fontSize: "42px", marginBottom: "8px" }}>
          Diagnóstico de Cibersegurança
        </h1>

        <p style={{ color: "#64748b", marginBottom: "30px" }}>
          Responda o checklist para avaliar o nível de maturidade digital da sua empresa
        </p>

        {/* CARD PERGUNTAS */}
        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "20px",
            boxShadow: "0 15px 40px rgba(0,0,0,0.06)",
          }}
        >
          {perguntas.map((p) => (
            <div
              key={p.id}
              style={{
                marginBottom: "20px",
                paddingBottom: "20px",
                borderBottom: "1px solid #eee",
              }}
            >
              <p style={{ marginBottom: "10px" }}>{p.texto}</p>

              <div style={{ display: "flex", gap: "10px" }}>
                {["sim", "parcial", "não"].map((op) => (
                  <button
                    key={op}
                    onClick={() => handleResposta(p.id, op)}
                    style={{
                      padding: "10px 14px",
                      borderRadius: "10px",
                      border: "1px solid #ddd",
                      cursor: "pointer",
                      background:
                        respostas[p.id] === op
                          ? "linear-gradient(135deg,#2563eb,#7c3aed)"
                          : "white",
                      color: respostas[p.id] === op ? "white" : "#0f172a",
                    }}
                  >
                    {op.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* BOTÃO */}
        <button
          onClick={calcular}
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "16px",
            borderRadius: "14px",
            border: "none",
            background: "linear-gradient(135deg,#2563eb,#7c3aed)",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Gerar Diagnóstico
        </button>

        {/* RESULTADO */}
        {resultado && (
          <div
            style={{
              marginTop: "30px",
              background: "white",
              padding: "25px",
              borderRadius: "20px",
              boxShadow: "0 15px 40px rgba(0,0,0,0.06)",
            }}
          >
            <h2 style={{ marginBottom: "10px" }}>
              Nível: {resultado.nivel}
            </h2>

            <div
              style={{
                height: "10px",
                background: "#eee",
                borderRadius: "999px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${resultado.percent}%`,
                  height: "100%",
                  background: "linear-gradient(135deg,#2563eb,#7c3aed)",
                }}
              />
            </div>

            <p style={{ marginTop: "10px", color: "#64748b" }}>
              {resultado.percent}% de maturidade
            </p>

            {/* PDF */}
            <button
              onClick={baixarPDF}
              style={{
                marginTop: "15px",
                width: "100%",
                padding: "14px",
                borderRadius: "12px",
                border: "none",
                background: "#0f172a",
                color: "white",
                cursor: "pointer",
              }}
            >
              Baixar relatório em PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
}