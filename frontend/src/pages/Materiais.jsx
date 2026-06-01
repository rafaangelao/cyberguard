import Header from "../components/Header";
import PageWrapper from "../components/PageWrapper";

const cards = [
  { emoji:"🔐", title:"O que é Cibersegurança?", text:"Conceitos básicos de proteção digital e riscos.", cor:"#2563eb" },
  { emoji:"🛡️", title:"Boas práticas",           text:"Como proteger empresas contra ataques digitais.", cor:"#7c3aed" },
  { emoji:"📊", title:"Segurança de dados",       text:"Cuidados com informações sensíveis e LGPD.", cor:"#0891b2" },
  { emoji:"💻", title:"Principais ataques",       text:"Phishing, ransomware e outros riscos comuns.", cor:"#dc2626" },
];

export default function Materiais() {
  return (
    <PageWrapper>
      <div style={{ fontFamily:"'DM Sans',sans-serif", minHeight:"100vh" }}>
        <Header />
        <div style={{ maxWidth:"860px", margin:"0 auto", padding:"120px 24px 80px" }}>

          <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:"42px", fontWeight:800, letterSpacing:"-1px" }}>
            Materiais de Apoio
          </h1>
          <p style={{ color:"#64748b", marginTop:"10px", fontSize:"16px", marginBottom:"40px" }}>
            Conteúdos para entender melhor sobre cibersegurança, proteção de dados e boas práticas digitais.
          </p>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(380px,1fr))", gap:"16px" }}>
            {cards.map((c, i) => (
              <div
                key={i}
                style={{
                  background:"rgba(255,255,255,0.80)",
                  backdropFilter:"blur(12px)",
                  padding:"28px",
                  borderRadius:"20px",
                  border:"1px solid rgba(255,255,255,0.9)",
                  boxShadow:"0 8px 32px rgba(37,99,235,0.08)",
                  animation:`fadeUp 0.4s ease both`,
                  animationDelay:`${i * 0.08}s`,
                  transition:"transform 0.25s, box-shadow 0.25s",
                  cursor:"default",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow=`0 16px 48px rgba(37,99,235,0.14)`; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 8px 32px rgba(37,99,235,0.08)"; }}
              >
                <div style={{ fontSize:"32px", marginBottom:"12px" }}>{c.emoji}</div>
                <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, marginBottom:"8px", color:"#0f172a" }}>{c.title}</h3>
                <p style={{ margin:0, color:"#64748b", lineHeight:"1.6" }}>{c.text}</p>
                <div style={{ marginTop:"16px", height:"3px", width:"40px", borderRadius:"999px", background:`linear-gradient(90deg, ${c.cor}, #7c3aed)` }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
