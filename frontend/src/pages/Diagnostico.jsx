import { useState, useRef } from "react";
import jsPDF from "jspdf";
import { CheckCircle, Circle, MinusCircle, BarChart3, ShieldAlert, TrendingUp, Award, ChevronDown } from "lucide-react";
import Header from "../components/Header";
import PageWrapper from "../components/PageWrapper";
import { apiSalvarDiagnostico } from "../api";

// ── 10 perguntas ponderadas ─────────────────────────────────
const PERGUNTAS = [
  { id:1,  texto:"A empresa usa autenticação em dois fatores (MFA) em todos os sistemas críticos?",           peso:3, categoria:"Acesso" },
  { id:2,  texto:"Os funcionários recebem treinamentos periódicos sobre segurança digital e phishing?",       peso:2, categoria:"Pessoas" },
  { id:3,  texto:"Existe backup regular e automático dos dados, armazenado fora do ambiente principal?",      peso:3, categoria:"Dados" },
  { id:4,  texto:"Todos os dispositivos da empresa possuem antivírus atualizado e ativo?",                    peso:2, categoria:"Dispositivos" },
  { id:5,  texto:"Existe uma política de controle de acesso — cada pessoa acessa apenas o que precisa?",      peso:3, categoria:"Acesso" },
  { id:6,  texto:"A empresa usa conexões seguras (HTTPS, VPN) para acesso remoto e transmissão de dados?",   peso:2, categoria:"Rede" },
  { id:7,  texto:"Senhas fortes são exigidas e trocadas periodicamente nos sistemas da empresa?",             peso:2, categoria:"Acesso" },
  { id:8,  texto:"Existe um plano de resposta a incidentes caso ocorra um ataque ou vazamento de dados?",    peso:3, categoria:"Gestão" },
  { id:9,  texto:"Os sistemas e softwares utilizados são mantidos atualizados com os patches de segurança?", peso:2, categoria:"Dispositivos" },
  { id:10, texto:"A empresa conhece e adota práticas de conformidade com a LGPD (Lei Geral de Proteção de Dados)?", peso:2, categoria:"Compliance" },
];

const NIVEL_CONFIG = {
  "Crítico":   { color:"#dc2626", bg:"rgba(220,38,38,0.08)",  border:"rgba(220,38,38,0.25)",  emoji:"🔴", msg:"Sua empresa está em risco elevado. É urgente adotar medidas básicas de proteção digital imediatamente." },
  "Moderado":  { color:"#f59e0b", bg:"rgba(245,158,11,0.08)", border:"rgba(245,158,11,0.25)", emoji:"🟡", msg:"Há uma base razoável, mas existem vulnerabilidades importantes que precisam de atenção em breve." },
  "Bom":       { color:"#2563eb", bg:"rgba(37,99,235,0.08)",  border:"rgba(37,99,235,0.25)",  emoji:"🔵", msg:"Bom nível de maturidade! Continue evoluindo e corrija os pontos pendentes para chegar à excelência." },
  "Excelente": { color:"#16a34a", bg:"rgba(22,163,74,0.08)",  border:"rgba(22,163,74,0.25)",  emoji:"🟢", msg:"Parabéns! Sua empresa demonstra maturidade exemplar em cibersegurança. Mantenha o ritmo." },
};

const STATS = [
  { icon:<ShieldAlert size={22}/>, label:"das PMEs brasileiras já sofreram algum ataque digital",  valor:"60%",  cor:"#dc2626" },
  { icon:<TrendingUp  size={22}/>, label:"de aumento em ataques a pequenas empresas em 2023",       valor:"80%",  cor:"#f59e0b" },
  { icon:<Award       size={22}/>, label:"dos ataques poderiam ser evitados com boas práticas",     valor:"95%",  cor:"#16a34a" },
];

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const obs = useRef(null);
  const attachRef = (el) => {
    ref.current = el;
    if (el && !obs.current) {
      obs.current = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); } }, { threshold: 0.1 });
      obs.current.observe(el);
    }
  };
  return [attachRef, visible];
}

export default function Diagnostico() {
  const [respostas, setRespostas] = useState({});
  const [resultado, setResultado] = useState(null);
  const [salvando, setSalvando]   = useState(false);
  const [salvo, setSalvo]         = useState(false);
  const checklistRef = useRef(null);

  const [introRef, introVisible] = useReveal();
  const [statsRef, statsVisible] = useReveal();
  const [checkRef, checkVisible] = useReveal();

  function handleResposta(id, valor) {
    setRespostas((prev) => ({ ...prev, [id]: valor }));
  }

  function calcular() {
    let total = 0, max = 0;
    PERGUNTAS.forEach((p) => {
      max += p.peso * 2;
      const r = respostas[p.id];
      if (r === "sim")     total += p.peso * 2;
      if (r === "parcial") total += p.peso;
    });
    const percent = (total / max) * 100;
    let nivel = "Crítico";
    if (percent > 40) nivel = "Moderado";
    if (percent > 60) nivel = "Bom";
    if (percent > 80) nivel = "Excelente";
    const res = { nivel, percent: percent.toFixed(0) };
    setResultado(res);
    salvarNoBanco(res);
    setTimeout(() => {
      document.getElementById("resultado-section")?.scrollIntoView({ behavior:"smooth" });
    }, 300);
  }

  async function salvarNoBanco(res) {
    setSalvando(true);
    await apiSalvarDiagnostico({ nivel: res.nivel, percentual: res.percent, respostas });
    setSalvando(false);
    setSalvo(true);
  }

  function baixarPDF() {
    if (!resultado) return;
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Relatório de Diagnóstico — CiberGuard", 10, 20);
    doc.setFontSize(13);
    doc.text(`Nível de Maturidade: ${resultado.nivel}`, 10, 40);
    doc.text(`Percentual: ${resultado.percent}%`, 10, 52);
    doc.setFontSize(11);
    doc.text("Respostas do Checklist:", 10, 70);
    PERGUNTAS.forEach((p, i) => {
      const linhas = doc.splitTextToSize(`${i+1}. ${p.texto}: ${respostas[p.id] || "não respondido"}`, 185);
      doc.text(linhas, 14, 82 + i * 14);
    });
    doc.save("diagnostico-ciberseguranca.pdf");
  }

  const respondidas = Object.keys(respostas).length;
  const progresso   = Math.round((respondidas / PERGUNTAS.length) * 100);

  const opcoes = [
    { val:"sim",     label:"Sim",     Icon: CheckCircle, cor:"#16a34a" },
    { val:"parcial", label:"Parcial", Icon: MinusCircle, cor:"#f59e0b" },
    { val:"não",     label:"Não",     Icon: Circle,      cor:"#dc2626" },
  ];

  return (
    <PageWrapper>
      <div style={{ fontFamily:"'DM Sans',sans-serif", minHeight:"100vh" }}>
        <Header />

        {/* ══ HERO DA PÁGINA ══════════════════════════════ */}
        <section style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"120px 24px 60px", textAlign:"center", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:"-100px", left:"-100px", width:"500px", height:"500px", borderRadius:"50%", background:"radial-gradient(circle, rgba(37,99,235,0.12), transparent 70%)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:"-80px", right:"-80px", width:"400px", height:"400px", borderRadius:"50%", background:"radial-gradient(circle, rgba(220,38,38,0.08), transparent 70%)", pointerEvents:"none" }} />

          <div style={{ position:"relative", maxWidth:"740px" }}>
            <span style={{ display:"inline-block", padding:"6px 18px", borderRadius:"999px", background:"rgba(220,38,38,0.10)", border:"1px solid rgba(220,38,38,0.20)", color:"#dc2626", fontSize:"12px", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"24px" }}>
              🔍 Diagnóstico Gratuito
            </span>

            <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(36px,6vw,64px)", fontWeight:800, letterSpacing:"-2px", color:"#0f172a", lineHeight:1.05, marginBottom:"20px" }}>
              Sua empresa está{" "}
              <span style={{ background:"linear-gradient(135deg,#dc2626,#f59e0b)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                protegida?
              </span>
            </h1>

            <p style={{ fontSize:"clamp(16px,2vw,19px)", color:"#475569", lineHeight:1.7, marginBottom:"44px" }}>
              Responda 10 perguntas e descubra em minutos o nível de maturidade em cibersegurança do seu negócio. Totalmente gratuito, sem precisar de conhecimento técnico.
            </p>

            <button
              onClick={() => checklistRef.current?.scrollIntoView({ behavior:"smooth" })}
              style={{ display:"inline-flex", alignItems:"center", gap:"10px", padding:"16px 36px", borderRadius:"14px", border:"none", background:"linear-gradient(135deg,#2563eb,#7c3aed)", color:"#fff", fontSize:"16px", fontWeight:700, cursor:"pointer", boxShadow:"0 12px 40px rgba(37,99,235,0.35)", fontFamily:"'DM Sans',sans-serif", transition:"transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform="translateY(-3px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform="translateY(0)"; }}
            >
              Começar Diagnóstico <ChevronDown size={18}/>
            </button>
          </div>

          {/* Scroll hint */}
          <div style={{ position:"absolute", bottom:"32px", left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:"6px", color:"#94a3b8", fontSize:"12px", animation:"float 2s ease-in-out infinite" }}>
            <span>role para baixo</span>
            <ChevronDown size={16}/>
          </div>
        </section>

        {/* ══ POR QUE FAZER O DIAGNÓSTICO ════════════════ */}
        <section ref={introRef} style={{ padding:"100px 24px", background:"rgba(255,255,255,0.55)", backdropFilter:"blur(8px)" }}>
          <div style={{ maxWidth:"1000px", margin:"0 auto" }}>

            <div style={{ textAlign:"center", marginBottom:"60px", opacity: introVisible ? 1 : 0, transform: introVisible ? "translateY(0)" : "translateY(30px)", transition:"all 0.7s ease" }}>
              <span style={{ display:"inline-block", padding:"5px 16px", borderRadius:"999px", background:"rgba(37,99,235,0.10)", color:"#2563eb", fontSize:"12px", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"16px" }}>
                Por que fazer?
              </span>
              <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(26px,4vw,40px)", fontWeight:800, letterSpacing:"-1px", color:"#0f172a", marginBottom:"14px" }}>
                A realidade das pequenas empresas
              </h2>
              <p style={{ color:"#64748b", fontSize:"17px", maxWidth:"580px", margin:"0 auto", lineHeight:1.6 }}>
                A maioria dos ataques digitais não mira grandes corporações — eles escolhem justamente quem menos se prepara.
              </p>
            </div>

            {/* Stats */}
            <div ref={statsRef} style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:"20px", marginBottom:"60px" }}>
              {STATS.map((s, i) => (
                <div key={i} style={{ padding:"32px", borderRadius:"20px", background:"rgba(255,255,255,0.85)", backdropFilter:"blur(12px)", border:"1px solid rgba(255,255,255,0.9)", boxShadow:"0 8px 32px rgba(37,99,235,0.08)", textAlign:"center", opacity: statsVisible ? 1 : 0, transform: statsVisible ? "translateY(0)" : "translateY(30px)", transition:`all 0.6s ease ${i*0.15}s` }}>
                  <div style={{ fontSize:"52px", fontFamily:"'Syne',sans-serif", fontWeight:800, color:s.cor, marginBottom:"8px" }}>{s.valor}</div>
                  <div style={{ color:"#475569", fontSize:"15px", lineHeight:1.5 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Blocos explicativos */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:"20px" }}>
              {[
                { icon:"🎯", titulo:"Diagnóstico preciso", texto:"10 perguntas cobrindo as principais áreas de risco: acesso, dados, dispositivos, rede, pessoas, gestão e conformidade com a LGPD." },
                { icon:"⚡", titulo:"Resultado imediato", texto:"Em menos de 5 minutos você recebe seu nível de maturidade — Crítico, Moderado, Bom ou Excelente — com um diagnóstico claro." },
                { icon:"📄", titulo:"Relatório em PDF", texto:"Exporte um relatório completo com todas as suas respostas e o resultado para guardar ou compartilhar com sua equipe." },
                { icon:"🔒", titulo:"100% gratuito e seguro", texto:"Nenhuma informação sensível é coletada. O diagnóstico é baseado em boas práticas internacionais de segurança da informação." },
              ].map((b, i) => (
                <div key={i} style={{ padding:"28px", borderRadius:"18px", background:"rgba(255,255,255,0.80)", backdropFilter:"blur(12px)", border:"1px solid rgba(255,255,255,0.9)", boxShadow:"0 6px 24px rgba(37,99,235,0.07)", opacity: introVisible ? 1 : 0, transform: introVisible ? "translateX(0)" : "translateX(-20px)", transition:`all 0.6s ease ${0.3 + i*0.12}s` }}>
                  <div style={{ fontSize:"30px", marginBottom:"12px" }}>{b.icon}</div>
                  <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"17px", marginBottom:"8px", color:"#0f172a" }}>{b.titulo}</h3>
                  <p style={{ color:"#64748b", fontSize:"14px", lineHeight:1.6, margin:0 }}>{b.texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CHECKLIST ══════════════════════════════════ */}
        <section ref={(el) => { checklistRef.current = el; checkRef(el); }} style={{ padding:"100px 24px 60px" }}>
          <div style={{ maxWidth:"860px", margin:"0 auto" }}>

            <div style={{ textAlign:"center", marginBottom:"48px", opacity: checkVisible ? 1 : 0, transition:"all 0.6s ease" }}>
              <span style={{ display:"inline-block", padding:"5px 16px", borderRadius:"999px", background:"rgba(37,99,235,0.10)", color:"#2563eb", fontSize:"12px", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"16px" }}>
                Checklist
              </span>
              <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(26px,4vw,40px)", fontWeight:800, letterSpacing:"-1px", color:"#0f172a", marginBottom:"12px" }}>
                Responda as 10 perguntas
              </h2>
              <p style={{ color:"#64748b", fontSize:"16px" }}>
                Seja honesto — o diagnóstico só é útil se refletir a realidade da sua empresa.
              </p>
            </div>

            {/* Barra de progresso */}
            <div style={{ marginBottom:"32px", padding:"20px 24px", borderRadius:"16px", background:"rgba(255,255,255,0.80)", backdropFilter:"blur(12px)", border:"1px solid rgba(255,255,255,0.9)", boxShadow:"0 4px 20px rgba(37,99,235,0.07)" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"10px" }}>
                <span style={{ fontSize:"14px", color:"#64748b", fontWeight:500 }}>Progresso</span>
                <span style={{ fontSize:"14px", color:"#2563eb", fontWeight:700 }}>{respondidas}/10 respondidas</span>
              </div>
              <div style={{ height:"8px", background:"#f1f5f9", borderRadius:"999px", overflow:"hidden" }}>
                <div style={{ height:"100%", width:`${progresso}%`, background:"linear-gradient(90deg,#2563eb,#7c3aed)", borderRadius:"999px", transition:"width 0.4s ease" }} />
              </div>
            </div>

            {/* Perguntas */}
            <div style={{ background:"rgba(255,255,255,0.82)", backdropFilter:"blur(12px)", borderRadius:"24px", padding:"32px", boxShadow:"0 16px 48px rgba(37,99,235,0.10)", border:"1px solid rgba(255,255,255,0.9)" }}>
              {PERGUNTAS.map((p, idx) => {
                const respondida = respostas[p.id];
                return (
                  <div
                    key={p.id}
                    style={{
                      marginBottom: idx < PERGUNTAS.length - 1 ? "28px" : 0,
                      paddingBottom: idx < PERGUNTAS.length - 1 ? "28px" : 0,
                      borderBottom: idx < PERGUNTAS.length - 1 ? "1px solid #f1f5f9" : "none",
                      opacity: checkVisible ? 1 : 0,
                      transform: checkVisible ? "translateY(0)" : "translateY(20px)",
                      transition: `all 0.5s ease ${idx * 0.06}s`,
                    }}
                  >
                    <div style={{ display:"flex", alignItems:"flex-start", gap:"12px", marginBottom:"14px" }}>
                      <span style={{ minWidth:"28px", height:"28px", borderRadius:"8px", background: respondida ? "linear-gradient(135deg,#2563eb,#7c3aed)" : "#f1f5f9", color: respondida ? "#fff" : "#94a3b8", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"12px", fontWeight:700, flexShrink:0, transition:"all 0.3s" }}>
                        {respondida ? "✓" : p.id}
                      </span>
                      <div style={{ flex:1 }}>
                        <span style={{ display:"inline-block", padding:"2px 10px", borderRadius:"999px", background:"rgba(37,99,235,0.08)", color:"#2563eb", fontSize:"11px", fontWeight:600, marginBottom:"6px" }}>
                          {p.categoria}
                        </span>
                        <p style={{ margin:0, fontWeight:500, color:"#0f172a", lineHeight:1.5 }}>{p.texto}</p>
                      </div>
                    </div>

                    <div style={{ display:"flex", gap:"10px", paddingLeft:"40px", flexWrap:"wrap" }}>
                      {opcoes.map(({ val, label, Icon, cor }) => {
                        const ativo = respostas[p.id] === val;
                        return (
                          <button
                            key={val}
                            onClick={() => handleResposta(p.id, val)}
                            style={{ display:"flex", alignItems:"center", gap:"6px", padding:"10px 18px", borderRadius:"10px", border: ativo ? `1.5px solid ${cor}` : "1.5px solid #e2e8f0", background: ativo ? `${cor}15` : "white", color: ativo ? cor : "#64748b", fontWeight: ativo ? 600 : 400, fontSize:"13px", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"all 0.18s ease", transform: ativo ? "scale(1.05)" : "scale(1)" }}
                          >
                            <Icon size={14}/> {label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Botão gerar */}
            <div style={{ marginTop:"28px" }}>
              {respondidas < 10 && (
                <p style={{ textAlign:"center", color:"#94a3b8", fontSize:"14px", marginBottom:"12px" }}>
                  Responda todas as perguntas para gerar o diagnóstico ({10 - respondidas} restantes)
                </p>
              )}
              <button
                className="btn-primary"
                onClick={calcular}
                disabled={respondidas < 10}
                style={{ opacity: respondidas < 10 ? 0.5 : 1, cursor: respondidas < 10 ? "not-allowed" : "pointer" }}
              >
                {respondidas < 10 ? `Responda mais ${10 - respondidas} pergunta(s)` : "Gerar Diagnóstico →"}
              </button>
            </div>
          </div>
        </section>

        {/* ══ RESULTADO ══════════════════════════════════ */}
        {resultado && (() => {
          const cfg = NIVEL_CONFIG[resultado.nivel];
          return (
            <section id="resultado-section" style={{ padding:"60px 24px 100px" }}>
              <div style={{ maxWidth:"860px", margin:"0 auto" }}>
                <div style={{ padding:"40px", borderRadius:"28px", background:"rgba(255,255,255,0.90)", backdropFilter:"blur(16px)", border:`2px solid ${cfg.border}`, boxShadow:`0 24px 80px ${cfg.color}20`, animation:"scaleIn 0.5s cubic-bezier(0.22,1,0.36,1) both" }}>

                  <div style={{ textAlign:"center", marginBottom:"32px" }}>
                    <div style={{ fontSize:"56px", marginBottom:"16px" }}>{cfg.emoji}</div>
                    <p style={{ fontSize:"13px", color:"#94a3b8", marginBottom:"6px", textTransform:"uppercase", letterSpacing:"0.08em" }}>Resultado do Diagnóstico</p>
                    <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"42px", fontWeight:800, color:cfg.color, letterSpacing:"-1px" }}>
                      {resultado.nivel}
                    </h2>
                    <p style={{ color:"#475569", fontSize:"16px", maxWidth:"480px", margin:"12px auto 0", lineHeight:1.6 }}>
                      {cfg.msg}
                    </p>
                  </div>

                  {/* Barra */}
                  <div style={{ marginBottom:"28px" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"8px" }}>
                      <span style={{ fontSize:"14px", color:"#64748b" }}>Nível de maturidade</span>
                      <span style={{ fontSize:"14px", fontWeight:700, color:cfg.color }}>{resultado.percent}%</span>
                    </div>
                    <div style={{ height:"12px", background:"#f1f5f9", borderRadius:"999px", overflow:"hidden" }}>
                      <div style={{ height:"100%", width:`${resultado.percent}%`, background:`linear-gradient(90deg, #2563eb, #7c3aed)`, borderRadius:"999px", transition:"width 1.5s cubic-bezier(0.22,1,0.36,1)" }} />
                    </div>
                  </div>

                  {/* Escala visual */}
                  <div style={{ display:"flex", gap:"6px", marginBottom:"32px" }}>
                    {[{ l:"Crítico","c":"#dc2626" },{ l:"Moderado","c":"#f59e0b" },{ l:"Bom","c":"#2563eb" },{ l:"Excelente","c":"#16a34a" }].map((n) => (
                      <div key={n.l} style={{ flex:1, padding:"8px", borderRadius:"10px", background: resultado.nivel === n.l ? `${n.c}20` : "#f8fafc", border: resultado.nivel === n.l ? `1.5px solid ${n.c}` : "1.5px solid #f1f5f9", textAlign:"center" }}>
                        <div style={{ fontSize:"11px", fontWeight:700, color: resultado.nivel === n.l ? n.c : "#94a3b8" }}>{n.l}</div>
                      </div>
                    ))}
                  </div>

                  {salvando && <p style={{ color:"#94a3b8", fontSize:"13px", textAlign:"center", marginBottom:"16px" }}>Salvando diagnóstico...</p>}
                  {salvo    && <p style={{ color:"#16a34a", fontSize:"13px", textAlign:"center", marginBottom:"16px" }}>✅ Diagnóstico salvo com sucesso!</p>}

                  <button
                    onClick={baixarPDF}
                    style={{ width:"100%", padding:"15px", borderRadius:"14px", border:"none", background:"#0f172a", color:"white", fontWeight:700, fontSize:"15px", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"opacity 0.2s" }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity="0.85"}
                    onMouseLeave={(e) => e.currentTarget.style.opacity="1"}
                  >
                    📄 Baixar Relatório em PDF
                  </button>
                </div>
              </div>
            </section>
          );
        })()}
      </div>
    </PageWrapper>
  );
}
