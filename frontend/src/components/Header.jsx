import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const usuario = JSON.parse(localStorage.getItem("cg_usuario") || "null");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function sair() {
    localStorage.removeItem("cg_token");
    localStorage.removeItem("cg_usuario");
    navigate("/login");
  }

  const links = [
    { label: "Início",      path: "/" },
    { label: "Diagnóstico", path: "/diagnostico" },
    { label: "Materiais",   path: "/materiais" },
    { label: "Sobre",       path: "/sobre" },
  ];

  return (
    <header style={{
      position: "fixed",
      top: 0, left: 0, right: 0,
      zIndex: 100,
      padding: scrolled ? "10px 40px" : "18px 40px",
      background: scrolled
        ? "rgba(255,255,255,0.88)"
        : "rgba(255,255,255,0.60)",
      backdropFilter: "blur(16px)",
      borderBottom: scrolled ? "1px solid rgba(37,99,235,0.10)" : "1px solid transparent",
      boxShadow: scrolled ? "0 4px 24px rgba(37,99,235,0.08)" : "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
    }}>

      {/* Logo */}
      <div
        onClick={() => navigate("/")}
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: "22px",
          cursor: "pointer",
          background: "linear-gradient(135deg, #2563eb, #7c3aed)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "-0.5px",
        }}
      >
        🛡 CyberGuard
      </div>

      {/* Nav links */}
      <nav style={{ display: "flex", gap: "4px", alignItems: "center" }}>
        {links.map((l) => {
          const active = location.pathname === l.path;
          return (
            <button
              key={l.path}
              onClick={() => navigate(l.path)}
              style={{
                padding: "8px 16px",
                borderRadius: "10px",
                border: "none",
                background: active ? "rgba(37,99,235,0.10)" : "transparent",
                color: active ? "#2563eb" : "#475569",
                fontWeight: active ? 600 : 400,
                fontSize: "14px",
                fontFamily: "'DM Sans', sans-serif",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                if (!active) e.target.style.background = "rgba(37,99,235,0.06)";
              }}
              onMouseLeave={(e) => {
                if (!active) e.target.style.background = "transparent";
              }}
            >
              {l.label}
            </button>
          );
        })}

        {usuario ? (
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginLeft: "8px" }}>
            <span style={{ fontSize: "13px", color: "#64748b" }}>
              Olá, <strong>{usuario.nome?.split(" ")[0]}</strong>
            </span>
            <button
              onClick={sair}
              style={{
                padding: "8px 16px",
                borderRadius: "10px",
                border: "1.5px solid #e2e8f0",
                background: "transparent",
                color: "#64748b",
                fontSize: "13px",
                fontFamily: "'DM Sans', sans-serif",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.target.style.borderColor = "#dc2626"; e.target.style.color = "#dc2626"; }}
              onMouseLeave={(e) => { e.target.style.borderColor = "#e2e8f0"; e.target.style.color = "#64748b"; }}
            >
              Sair
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            style={{
              marginLeft: "8px",
              padding: "8px 20px",
              borderRadius: "10px",
              border: "none",
              background: "linear-gradient(135deg, #2563eb, #7c3aed)",
              color: "#fff",
              fontSize: "14px",
              fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(37,99,235,0.25)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(37,99,235,0.35)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(37,99,235,0.25)"; }}
          >
            Entrar
          </button>
        )}
      </nav>
    </header>
  );
}
