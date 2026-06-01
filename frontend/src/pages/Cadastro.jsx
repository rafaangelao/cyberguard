import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import { apiCadastro } from "../api";

export default function Cadastro() {
  const navigate = useNavigate();
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro]       = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ nome:"", email:"", senha:"", empresa:"", papel:"" });

  function handleChange(e) { setForm({ ...form, [e.target.name]: e.target.value }); }

  async function cadastrar() {
    setErro("");
    if (!form.nome || !form.email || !form.senha) return setErro("Preencha nome, email e senha.");
    setLoading(true);
    const data = await apiCadastro(form);
    setLoading(false);
    if (data.erro) return setErro(data.erro);
    setSucesso(true);
    setTimeout(() => navigate("/login"), 1500);
  }

  return (
    <PageWrapper>
      <div style={page}>
        <div style={{ position:"fixed", top:"-100px", right:"-100px", width:"400px", height:"400px", borderRadius:"50%", background:"radial-gradient(circle, rgba(124,58,237,0.12), transparent 70%)", pointerEvents:"none" }} />

        <div style={wrapper}>
          <div style={{ textAlign:"center", marginBottom:"8px", animation:"float 3s ease-in-out infinite" }}>
            <UserPlus size={48} color="#7c3aed" strokeWidth={1.5} />
          </div>

          <div style={card}>
            <div style={{ textAlign:"center", marginBottom:"28px" }}>
              <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"28px", fontWeight:800, color:"#0f172a", letterSpacing:"-0.5px" }}>
                Criar conta
              </h2>
              <p style={{ marginTop:"6px", color:"#64748b", fontSize:"14px" }}>
                Preencha os dados para começar
              </p>
            </div>

            <input className="input-base" name="nome"  placeholder="Nome completo" onChange={handleChange} />
            <input className="input-base" name="email" type="email" placeholder="Email" onChange={handleChange} style={{ marginTop:"12px" }} />

            <div style={{ position:"relative", marginTop:"12px" }}>
              <input
                className="input-base"
                name="senha"
                type={mostrarSenha ? "text" : "password"}
                placeholder="Senha"
                onChange={handleChange}
                style={{ paddingRight:"50px" }}
              />
              <button type="button" onClick={() => setMostrarSenha(!mostrarSenha)} style={eyeBtn}>
                {mostrarSenha ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <input className="input-base" name="empresa" placeholder="Empresa" onChange={handleChange} style={{ marginTop:"12px" }} />

            <select name="papel" onChange={handleChange} className="input-base" style={{ marginTop:"12px", color: form.papel ? "#0f172a" : "#94a3b8" }}>
              <option value="">Selecione o papel</option>
              <option value="gestor">Gestor</option>
              <option value="ti">TI / Segurança</option>
              <option value="usuario">Usuário comum</option>
            </select>

            {erro && (
              <div style={{ marginTop:"10px", padding:"10px 14px", borderRadius:"10px", background:"rgba(220,38,38,0.08)", border:"1px solid rgba(220,38,38,0.20)", color:"#dc2626", fontSize:"13px" }}>
                {erro}
              </div>
            )}
            {sucesso && (
              <div style={{ marginTop:"10px", padding:"10px 14px", borderRadius:"10px", background:"rgba(22,163,74,0.08)", border:"1px solid rgba(22,163,74,0.20)", color:"#16a34a", fontSize:"13px" }}>
                ✅ Conta criada! Redirecionando...
              </div>
            )}

            <button className="btn-primary" onClick={cadastrar} disabled={loading} style={{ marginTop:"24px", opacity: loading ? 0.7 : 1 }}>
              {loading ? "Criando..." : "Criar conta →"}
            </button>

            <p style={{ textAlign:"center", marginTop:"20px", color:"#64748b", fontSize:"14px" }}>
              Já tem conta?{" "}
              <span onClick={() => navigate("/login")} style={{ color:"#2563eb", fontWeight:600, cursor:"pointer" }}>
                Entrar
              </span>
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

const page    = { minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:"40px 20px", flexDirection:"column" };
const wrapper = { width:"100%", maxWidth:"430px", display:"flex", flexDirection:"column", alignItems:"center" };
const card    = { width:"100%", background:"rgba(255,255,255,0.85)", backdropFilter:"blur(16px)", padding:"40px", borderRadius:"24px", boxShadow:"0 20px 60px rgba(124,58,237,0.12)", border:"1px solid rgba(255,255,255,0.9)" };
const eyeBtn  = { position:"absolute", right:"14px", top:"50%", transform:"translateY(-50%)", border:"none", background:"transparent", cursor:"pointer", color:"#94a3b8", display:"flex" };
