import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import PageWrapper from "../components/PageWrapper";

// ── Dados reais do TCC ─────────────────────────────────────
const EQUIPE = [
  { nome: "Augusto Martins",              papel: "Desenvolvedor",  emoji: "👨‍💻" },
  { nome: "Danilo Dellape Gonçalves",     papel: "Scrum Master",   emoji: "🧭" },
  { nome: "Lidia Dantas da Silva",        papel: "Desenvolvedora", emoji: "👩‍💻" },
  { nome: "Rafael Santiago Angelão", papel: "Product Owner & Desenvolvedor", emoji: "🎯" },
  { nome: "Yarah de Assis Silveira Araújo", papel: "Desenvolvedora", emoji: "👩‍💻" },
];

const TECNOLOGIAS = [
  { nome: "React.js",   cor: "#61DAFB", desc: "Interface do usuário",      icon: "⚛️"  },
  { nome: "Node.js",    cor: "#68A063", desc: "Backend & API REST",         icon: "🟢"  },
  { nome: "Express",    cor: "#ffffff", desc: "Framework HTTP",             icon: "🚂"  },
  { nome: "MySQL",      cor: "#F29111", desc: "Banco de dados relacional",  icon: "🗄️"  },
  { nome: "JWT",        cor: "#FB015B", desc: "Autenticação segura",        icon: "🔑"  },
  { nome: "bcrypt",     cor: "#A78BFA", desc: "Criptografia de senhas",     icon: "🔒"  },
  { nome: "Vite",       cor: "#646CFF", desc: "Build tool ultrarrápida",    icon: "⚡"  },
  { nome: "jsPDF",      cor: "#E74C3C", desc: "Geração de relatórios",      icon: "📄"  },
];

const PROPOSITO = [
  { titulo: "O Problema",   texto: "72% das pequenas empresas brasileiras não possuem nenhuma política de segurança digital. Ataques como phishing e ransomware cresceram 80% em 2023, vitimando principalmente micro e pequenos negócios.",  cor: "#dc2626", icon: "⚠️" },
  { titulo: "A Solução",    texto: "O CiberGuard transforma conceitos complexos de segurança em um checklist acessível. Em minutos, o empreendedor descobre seu nível de risco — Crítico, Moderado, Bom ou Excelente — com recomendações personalizadas.", cor: "#2563eb", icon: "🛡️" },
  { titulo: "O Impacto",    texto: "Democratizar a cibersegurança para quem mais precisa e menos tem acesso: os pequenos negócios brasileiros. Prevenção simples, clara e prática — sem precisar de um time de TI.", cor: "#16a34a", icon: "🚀" },
];

// ── Hook: revela ao entrar na viewport ─────────────────────
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ── Seção: título ───────────────────────────────────────────
function SectionTitle({ label, title, sub }) {
  return (
    <div style={{ textAlign: "center", marginBottom: "56px" }}>
      <span style={{ display: "inline-block", padding: "5px 16px", borderRadius: "999px", background: "rgba(37,99,235,0.10)", color: "#2563eb", fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "16px" }}>
        {label}
      </span>
      <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, letterSpacing: "-1px", color: "#0f172a", marginBottom: "12px" }}>
        {title}
      </h2>
      {sub && <p style={{ color: "#64748b", fontSize: "17px", maxWidth: "520px", margin: "0 auto", lineHeight: 1.6 }}>{sub}</p>}
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [heroRef, heroVisible]     = useReveal();
  const [propRef, propVisible]     = useReveal();
  const [techRef, techVisible]     = useReveal();
  const [teamRef, teamVisible]     = useReveal();
  const [schoolRef, schoolVisible] = useReveal();
  const [ctaRef, ctaVisible]       = useReveal();

  return (
    <PageWrapper>
      <div style={{ fontFamily: "'DM Sans', sans-serif", overflowX: "hidden" }}>
        <Header />

        {/* ══════════════════════════════════════════
            HERO
        ══════════════════════════════════════════ */}
        <section
          ref={heroRef}
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "120px 24px 80px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Blobs */}
          <div style={{ position:"absolute", top:"-120px", left:"-120px", width:"600px", height:"600px", borderRadius:"50%", background:"radial-gradient(circle, rgba(37,99,235,0.13) 0%, transparent 70%)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:"-80px", right:"-80px", width:"500px", height:"500px", borderRadius:"50%", background:"radial-gradient(circle, rgba(124,58,237,0.10) 0%, transparent 70%)", pointerEvents:"none" }} />

          <div style={{
            maxWidth: "900px",
            textAlign: "center",
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(40px)",
            transition: "all 0.8s cubic-bezier(0.22,1,0.36,1)",
          }}>
            {/* Badge */}
            <div style={{ marginBottom: "28px" }}>
              <span style={{ display:"inline-flex", alignItems:"center", gap:"8px", padding:"8px 20px", borderRadius:"999px", background:"rgba(37,99,235,0.08)", border:"1px solid rgba(37,99,235,0.20)", color:"#2563eb", fontSize:"13px", fontWeight:600 }}>
                🎓 TCC — ETEC São Paulo · 2026
              </span>
            </div>

            {/* Título */}
            <h1 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(40px, 7vw, 80px)",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-2px",
              color: "#0f172a",
              marginBottom: "28px",
            }}>
              Segurança digital{" "}
              <span style={{
                background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                para pequenas empresas
              </span>
            </h1>

            <p style={{ fontSize: "clamp(16px,2vw,20px)", color: "#475569", lineHeight: 1.7, maxWidth: "640px", margin: "0 auto 44px", fontWeight: 400 }}>
              Avalie vulnerabilidades, receba recomendações personalizadas e melhore a maturidade em cibersegurança do seu negócio — em minutos.
            </p>

            {/* CTAs */}
            <div style={{ display:"flex", gap:"14px", justifyContent:"center", flexWrap:"wrap" }}>
              <button
                onClick={() => navigate("/diagnostico")}
                style={{ padding:"16px 36px", borderRadius:"14px", border:"none", background:"linear-gradient(135deg,#2563eb,#7c3aed)", color:"#fff", fontSize:"16px", fontWeight:700, cursor:"pointer", boxShadow:"0 12px 40px rgba(37,99,235,0.35)", transition:"transform 0.2s, box-shadow 0.2s", fontFamily:"'DM Sans',sans-serif" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 20px 60px rgba(37,99,235,0.45)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 12px 40px rgba(37,99,235,0.35)"; }}
              >
                Fazer Diagnóstico →
              </button>
              <button
                onClick={() => document.getElementById("proposito").scrollIntoView({ behavior:"smooth" })}
                style={{ padding:"16px 36px", borderRadius:"14px", border:"1.5px solid #e2e8f0", background:"rgba(255,255,255,0.7)", backdropFilter:"blur(8px)", color:"#0f172a", fontSize:"16px", fontWeight:600, cursor:"pointer", transition:"all 0.2s", fontFamily:"'DM Sans',sans-serif" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor="#2563eb"; e.currentTarget.style.color="#2563eb"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor="#e2e8f0"; e.currentTarget.style.color="#0f172a"; }}
              >
                Sobre o Projeto
              </button>
            </div>

            {/* Stats */}
            <div style={{ display:"flex", gap:"40px", justifyContent:"center", marginTop:"64px", flexWrap:"wrap" }}>
              {[
                { num:"6",    label:"Integrantes" },
                { num:"10",   label:"Perguntas no checklist" },
                { num:"4",    label:"Níveis de risco" },
                { num:"2026", label:"ETEC São Paulo" },
              ].map((s, i) => (
                <div key={i} style={{ textAlign:"center", opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(20px)", transition:`all 0.6s ease ${0.3 + i*0.1}s` }}>
                  <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"32px", fontWeight:800, background:"linear-gradient(135deg,#2563eb,#7c3aed)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{s.num}</div>
                  <div style={{ fontSize:"13px", color:"#94a3b8", marginTop:"4px" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            PROPÓSITO
        ══════════════════════════════════════════ */}
        <section id="proposito" ref={propRef} style={{ padding:"100px 24px", background:"rgba(255,255,255,0.50)", backdropFilter:"blur(8px)" }}>
          <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
            <SectionTitle label="Propósito" title="Por que o CiberGuard existe?" sub="Um sistema construído para resolver um problema real enfrentado por milhões de pequenas empresas no Brasil." />
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(300px,1fr))", gap:"24px" }}>
              {PROPOSITO.map((p, i) => (
                <div
                  key={i}
                  style={{
                    padding:"32px",
                    borderRadius:"24px",
                    background:"rgba(255,255,255,0.85)",
                    backdropFilter:"blur(12px)",
                    border:`1.5px solid ${p.cor}22`,
                    boxShadow:`0 12px 48px ${p.cor}15`,
                    opacity: propVisible ? 1 : 0,
                    transform: propVisible ? "translateY(0)" : "translateY(30px)",
                    transition: `all 0.6s cubic-bezier(0.22,1,0.36,1) ${i*0.15}s`,
                  }}
                >
                  <div style={{ fontSize:"36px", marginBottom:"16px" }}>{p.icon}</div>
                  <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:"20px", fontWeight:700, color:p.cor, marginBottom:"12px" }}>{p.titulo}</h3>
                  <p style={{ color:"#475569", lineHeight:"1.7", fontSize:"15px" }}>{p.texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            TECNOLOGIAS
        ══════════════════════════════════════════ */}
        <section ref={techRef} style={{ padding:"100px 24px" }}>
          <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
            <SectionTitle label="Stack" title="Tecnologias utilizadas" sub="Arquitetura de três camadas: frontend moderno, backend robusto e banco de dados relacional." />
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(220px,1fr))", gap:"16px" }}>
              {TECNOLOGIAS.map((t, i) => (
                <div
                  key={i}
                  style={{
                    padding:"24px",
                    borderRadius:"18px",
                    background:"rgba(255,255,255,0.80)",
                    backdropFilter:"blur(12px)",
                    border:"1px solid rgba(255,255,255,0.9)",
                    boxShadow:"0 8px 32px rgba(37,99,235,0.07)",
                    display:"flex", alignItems:"center", gap:"16px",
                    opacity: techVisible ? 1 : 0,
                    transform: techVisible ? "scale(1)" : "scale(0.92)",
                    transition: `all 0.5s cubic-bezier(0.22,1,0.36,1) ${i*0.07}s`,
                    cursor:"default",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform="scale(1.04)"; e.currentTarget.style.boxShadow="0 16px 48px rgba(37,99,235,0.13)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.boxShadow="0 8px 32px rgba(37,99,235,0.07)"; }}
                >
                  <div style={{ fontSize:"28px", flexShrink:0 }}>{t.icon}</div>
                  <div>
                    <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"16px", color:"#0f172a" }}>{t.nome}</div>
                    <div style={{ fontSize:"12px", color:"#94a3b8", marginTop:"2px" }}>{t.desc}</div>
                  </div>
                  <div style={{ marginLeft:"auto", width:"6px", height:"6px", borderRadius:"50%", background:t.cor, flexShrink:0, boxShadow:`0 0 8px ${t.cor}` }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            EQUIPE
        ══════════════════════════════════════════ */}
        <section ref={teamRef} style={{ padding:"100px 24px", background:"rgba(255,255,255,0.50)", backdropFilter:"blur(8px)" }}>
          <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
            <SectionTitle label="Equipe" title="Quem construiu o CiberGuard" sub="Seis alunos do Técnico em Desenvolvimento de Sistemas da ETEC São Paulo — modalidade EaD." />
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(300px,1fr))", gap:"20px" }}>
              {EQUIPE.map((m, i) => (
                <div
                  key={i}
                  style={{
                    padding:"28px",
                    borderRadius:"20px",
                    background:"rgba(255,255,255,0.85)",
                    backdropFilter:"blur(12px)",
                    border:"1px solid rgba(255,255,255,0.9)",
                    boxShadow:"0 8px 32px rgba(37,99,235,0.08)",
                    display:"flex", alignItems:"center", gap:"18px",
                    opacity: teamVisible ? 1 : 0,
                    transform: teamVisible ? "translateX(0)" : "translateX(-30px)",
                    transition: `all 0.6s cubic-bezier(0.22,1,0.36,1) ${i*0.10}s`,
                  }}
                >
                  <div style={{ width:"52px", height:"52px", borderRadius:"14px", background:"linear-gradient(135deg,#eff6ff,#eef2ff)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"24px", flexShrink:0 }}>
                    {m.emoji}
                  </div>
                  <div>
                    <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"16px", color:"#0f172a" }}>{m.nome}</div>
                    <div style={{ fontSize:"13px", color:"#2563eb", fontWeight:500, marginTop:"3px" }}>{m.papel}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Orientador */}
            <div style={{ marginTop:"24px", padding:"24px 32px", borderRadius:"20px", background:"linear-gradient(135deg,rgba(37,99,235,0.08),rgba(124,58,237,0.08))", border:"1.5px solid rgba(37,99,235,0.15)", display:"flex", alignItems:"center", gap:"18px", opacity: teamVisible ? 1 : 0, transition:"all 0.6s ease 0.7s" }}>
              <div style={{ fontSize:"32px" }}>🎓</div>
              <div>
                <div style={{ fontSize:"13px", color:"#64748b", marginBottom:"4px" }}>Orientador</div>
                <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"18px", color:"#0f172a" }}>Prof. Cesar Cari Eliseu</div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            ESCOLA
        ══════════════════════════════════════════ */}
        <section ref={schoolRef} style={{ padding:"100px 24px" }}>
          <div style={{ maxWidth:"900px", margin:"0 auto" }}>
            <SectionTitle label="Instituição" title="Onde nasceu o projeto" />
            <div style={{
              padding:"48px",
              borderRadius:"28px",
              background:"rgba(255,255,255,0.85)",
              backdropFilter:"blur(12px)",
              border:"1px solid rgba(255,255,255,0.9)",
              boxShadow:"0 20px 80px rgba(37,99,235,0.12)",
              textAlign:"center",
              opacity: schoolVisible ? 1 : 0,
              transform: schoolVisible ? "translateY(0)" : "translateY(30px)",
              transition:"all 0.7s cubic-bezier(0.22,1,0.36,1)",
            }}>
              <div style={{ fontSize:"56px", marginBottom:"20px" }}>🏫</div>
              <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:"26px", fontWeight:800, color:"#0f172a", marginBottom:"8px" }}>
                Centro Paula Souza — ETEC São Paulo
              </h3>
              <p style={{ color:"#64748b", fontSize:"16px", marginBottom:"8px" }}>
                Superintendência de Ensino e Pesquisa nas Modalidades EaD e Aberta
              </p>
              <p style={{ color:"#2563eb", fontWeight:600, fontSize:"15px" }}>
                Técnico em Desenvolvimento de Sistemas — Modalidade EaD · 2026
              </p>

              <div style={{ marginTop:"32px", display:"flex", gap:"16px", justifyContent:"center", flexWrap:"wrap" }}>
                {["Scrum", "Sprints quinzenais", "3 camadas", "JWT Auth", "API RESTful", "MySQL"].map((tag, i) => (
                  <span key={i} style={{ padding:"6px 16px", borderRadius:"999px", background:"rgba(37,99,235,0.08)", color:"#2563eb", fontSize:"13px", fontWeight:500 }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            CTA FINAL
        ══════════════════════════════════════════ */}
        <section ref={ctaRef} style={{ padding:"100px 24px 120px" }}>
          <div style={{
            maxWidth:"800px",
            margin:"0 auto",
            textAlign:"center",
            padding:"64px 48px",
            borderRadius:"32px",
            background:"linear-gradient(135deg, #1e40af, #7c3aed)",
            boxShadow:"0 32px 100px rgba(37,99,235,0.35)",
            position:"relative",
            overflow:"hidden",
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? "scale(1)" : "scale(0.95)",
            transition:"all 0.7s cubic-bezier(0.22,1,0.36,1)",
          }}>
            {/* Detalhe visual */}
            <div style={{ position:"absolute", top:"-60px", right:"-60px", width:"200px", height:"200px", borderRadius:"50%", background:"rgba(255,255,255,0.07)", pointerEvents:"none" }} />
            <div style={{ position:"absolute", bottom:"-40px", left:"-40px", width:"150px", height:"150px", borderRadius:"50%", background:"rgba(255,255,255,0.05)", pointerEvents:"none" }} />

            <div style={{ position:"relative", zIndex:1 }}>
              <div style={{ fontSize:"48px", marginBottom:"20px" }}>🛡️</div>
              <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(24px,4vw,38px)", fontWeight:800, color:"#fff", marginBottom:"16px", letterSpacing:"-1px" }}>
                Sua empresa está segura?
              </h2>
              <p style={{ color:"rgba(255,255,255,0.80)", fontSize:"17px", marginBottom:"36px", lineHeight:1.6 }}>
                Faça o diagnóstico gratuito agora e descubra seu nível de maturidade em cibersegurança.
              </p>
              <button
                onClick={() => navigate("/diagnostico")}
                style={{ padding:"18px 44px", borderRadius:"14px", border:"none", background:"#fff", color:"#1e40af", fontSize:"17px", fontWeight:700, cursor:"pointer", boxShadow:"0 8px 32px rgba(0,0,0,0.20)", transition:"transform 0.2s, box-shadow 0.2s", fontFamily:"'DM Sans',sans-serif" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 16px 48px rgba(0,0,0,0.30)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 8px 32px rgba(0,0,0,0.20)"; }}
              >
                Iniciar Diagnóstico →
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ borderTop:"1px solid #e2e8f0", padding:"32px 24px", textAlign:"center" }}>
          <p style={{ color:"#94a3b8", fontSize:"14px" }}>
            🛡️ <strong style={{ color:"#2563eb" }}>CiberGuard</strong> · TCC ETEC São Paulo 2026 · Técnico em Desenvolvimento de Sistemas
          </p>
          <p style={{ color:"#cbd5e1", fontSize:"13px", marginTop:"6px" }}>
            Augusto · Danilo · Lidia · Matheus · Rafael · Yarah
          </p>
        </footer>
      </div>
    </PageWrapper>
  );
}
