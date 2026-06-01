import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home       from "./pages/Home";
import Diagnostico from "./pages/Diagnostico";
import Sobre      from "./pages/Sobre";
import Materiais  from "./pages/Materiais";
import Login      from "./pages/Login";
import Cadastro   from "./pages/Cadastro";

// Rota protegida — redireciona pro login se não tiver token
function PrivateRoute({ children }) {
  const token = localStorage.getItem("cg_token");
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"          element={<Home />} />
        <Route path="/sobre"     element={<Sobre />} />
        <Route path="/materiais" element={<Materiais />} />
        <Route path="/login"     element={<Login />} />
        <Route path="/cadastro"  element={<Cadastro />} />

        {/* Rota protegida */}
        <Route path="/diagnostico" element={
          <PrivateRoute><Diagnostico /></PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}
