import { Routes, Route } from "react-router-dom";
import { Login, Register, Home, Recipes, Recipe } from "./pages";

import "./styles/global.scss";

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />
      <Route path="/recipes" element={<Recipes />} />
      <Route path="/recipes/:id" element={<Recipe />} />
    </Routes>
  );
}
