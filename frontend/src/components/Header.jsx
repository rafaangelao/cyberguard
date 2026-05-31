import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <nav
      style={{
        height: "80px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 80px",
        borderBottom: "1px solid #e2e8f0",
        background: "#ffffff",
        position: "fixed",
        width: "100%",
        top: 0,
        zIndex: 1000,
        fontFamily: "Segoe UI",
      }}
    >
      {/* LOGO */}
      <h2
        style={{ color: "#1d4ed8", margin: 0, cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        CyberGuard
      </h2>

      {/* LINKS */}
      <div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
        <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          Início
        </span>

        <span style={{ cursor: "pointer" }} onClick={() => navigate("/sobre")}>
          Sobre
        </span>

        <span style={{ cursor: "pointer" }} onClick={() => navigate("/diagnostico")}>
          Diagnóstico
        </span>

        <span style={{ cursor: "pointer" }} onClick={() => navigate("/materiais")}>
          Materiais
        </span>

        {/* BOTÕES AUTENTICAÇÃO */}
        <button
          onClick={() => navigate("/login")}
          style={{
            background: "transparent",
            border: "1px solid #1d4ed8",
            color: "#1d4ed8",
            padding: "8px 14px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Login
        </button>

        <button
          onClick={() => navigate("/cadastro")}
          style={{
            background: "#1d4ed8",
            color: "white",
            border: "none",
            padding: "8px 14px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Cadastre-se
        </button>
      </div>
    </nav>
  );
}