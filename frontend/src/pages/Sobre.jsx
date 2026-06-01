import Header from "../components/Header";
import PageWrapper from "../components/PageWrapper";

const secoes = [
  { title:"📌 Problema",          text:"Pequenas empresas enfrentam altos riscos digitais, como vazamento de dados, ataques cibernéticos e falta de controle de segurança. Muitas não possuem conhecimento técnico suficiente para identificar essas vulnerabilidades." },
  { title:"💡 Conceito",          text:"O CyberGuard é uma plataforma que avalia o nível de maturidade em cibersegurança de pequenos negócios por meio de um checklist interativo, gerando uma análise simples e objetiva." },
  { title:"🚀 Ideia da Solução",  text:"Transformar conceitos complexos de segurança digital em algo acessível. O sistema traduz respostas simples em uma avaliação clara: Crítico, Moderado, Bom ou Excelente." },
  { title:"🧩 Como pode ser usado", text:"Empreendedores podem utilizar a ferramenta para avaliar seus sistemas periodicamente, identificar falhas, acompanhar evolução e aplicar melhorias recomendadas automaticamente." },
];

export default function Sobre() {
  return (
    <PageWrapper>
      <div style={{ fontFamily:"'DM Sans',sans-serif", minHeight:"100vh" }}>
        <Header />
        <div style={{ maxWidth:"900px", margin:"0 auto", padding:"120px 24px 80px" }}>

          <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:"42px", fontWeight:800, letterSpacing:"-1px", marginBottom:"10px" }}>
            Sobre o Projeto
          </h1>
          <p style={{ color:"#64748b", fontSize:"17px", marginBottom:"44px" }}>
            Entenda o problema, a ideia e como a solução funciona na prática.
          </p>

          <div style={{ display:"grid", gap:"16px" }}>
            {secoes.map((s, i) => (
              <div
                key={i}
                style={{
                  background:"rgba(255,255,255,0.80)",
                  backdropFilter:"blur(12px)",
                  padding:"28px",
                  borderRadius:"20px",
                  boxShadow:"0 8px 32px rgba(37,99,235,0.08)",
                  border:"1px solid rgba(255,255,255,0.9)",
                  animation:`slideLeft 0.45s ease both`,
                  animationDelay:`${i * 0.10}s`,
                  transition:"transform 0.25s, box-shadow 0.25s",
                  cursor:"default",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform="translateX(6px)"; e.currentTarget.style.boxShadow="0 12px 40px rgba(37,99,235,0.13)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform="translateX(0)"; e.currentTarget.style.boxShadow="0 8px 32px rgba(37,99,235,0.08)"; }}
              >
                <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"20px", fontWeight:700, marginBottom:"10px" }}>{s.title}</h2>
                <p style={{ color:"#475569", lineHeight:"1.7" }}>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
