import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import { apiLogin } from "../api";

export default function Login() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [email, setEmail]   = useState("");
  const [senha, setSenha]   = useState("");
  const [erro, setErro]     = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin() {
    setErro("");
    if (!email || !senha) return setErro("Preencha email e senha.");
    setLoading(true);
    const data = await apiLogin(email, senha);
    setLoading(false);
    if (data.erro) return setErro(data.erro);
    localStorage.setItem("cg_token",   data.token);
    localStorage.setItem("cg_usuario", JSON.stringify(data.usuario));
    navigate("/diagnostico");
  }

  return (
    <PageWrapper>
      <div style={page}>

        {/* Blobs decorativos */}
        <div style={{ position:"fixed", top:"-100px", left:"-100px", width:"400px", height:"400px", borderRadius:"50%", background:"radial-gradient(circle, rgba(37,99,235,0.12), transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"fixed", bottom:"-80px", right:"-80px", width:"350px", height:"350px", borderRadius:"50%", background:"radial-gradient(circle, rgba(124,58,237,0.10), transparent 70%)", pointerEvents:"none" }} />

        <div style={wrapper}>
          {/* Ícone */}
          <div style={{ textAlign:"center", marginBottom:"8px", animation:"float 3s ease-in-out infinite" }}>
            <ShieldCheck size={48} color="#2563eb" strokeWidth={1.5} />
          </div>

          <div style={card}>
            <div style={{ textAlign:"center", marginBottom:"28px" }}>
              <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"28px", fontWeight:800, color:"#0f172a", letterSpacing:"-0.5px" }}>
                Bem-vindo de volta
              </h2>
              <p style={{ marginTop:"6px", color:"#64748b", fontSize:"14px" }}>
                Entre para acessar sua conta
              </p>
            </div>

            <input
              className="input-base"
              type="email"
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div style={{ position:"relative", marginTop:"12px" }}>
              <input
                className="input-base"
                type={mostrarSenha ? "text" : "password"}
                placeholder="Sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                style={{ paddingRight:"50px" }}
              />
              <button type="button" onClick={() => setMostrarSenha(!mostrarSenha)} style={eyeBtn}>
                {mostrarSenha ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {erro && (
              <div style={{ marginTop:"10px", padding:"10px 14px", borderRadius:"10px", background:"rgba(220,38,38,0.08)", border:"1px solid rgba(220,38,38,0.20)", color:"#dc2626", fontSize:"13px" }}>
                {erro}
              </div>
            )}

            <button
              className="btn-primary"
              onClick={handleLogin}
              disabled={loading}
              style={{ marginTop:"24px", opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "Entrando..." : "Entrar →"}
            </button>

            <p style={{ textAlign:"center", marginTop:"20px", color:"#64748b", fontSize:"14px" }}>
              Não tem conta?{" "}
              <span onClick={() => navigate("/cadastro")} style={{ color:"#2563eb", fontWeight:600, cursor:"pointer" }}>
                Criar conta
              </span>
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

const page    = { minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:"40px 20px", flexDirection:"column" };
const wrapper = { width:"100%", maxWidth:"420px", display:"flex", flexDirection:"column", alignItems:"center", gap:"0" };
const card    = { width:"100%", background:"rgba(255,255,255,0.85)", backdropFilter:"blur(16px)", padding:"40px", borderRadius:"24px", boxShadow:"0 20px 60px rgba(37,99,235,0.13)", border:"1px solid rgba(255,255,255,0.9)" };
const eyeBtn  = { position:"absolute", right:"14px", top:"50%", transform:"translateY(-50%)", border:"none", background:"transparent", cursor:"pointer", color:"#94a3b8", display:"flex" };
