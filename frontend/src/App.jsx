import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Diagnostico from "./pages/Diagnostico";
import Sobre from "./pages/Sobre";
import Materiais from "./pages/Materiais";

import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diagnostico" element={<Diagnostico />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/materiais" element={<Materiais />} />

        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </BrowserRouter>
  );
}