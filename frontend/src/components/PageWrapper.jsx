// src/components/PageWrapper.jsx
// Envolve cada página com a animação de entrada

export default function PageWrapper({ children }) {
  return (
    <div className="page-enter" style={{ minHeight: "100vh" }}>
      {children}
    </div>
  );
}
