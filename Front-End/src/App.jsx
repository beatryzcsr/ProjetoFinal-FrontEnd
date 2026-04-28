import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Listagem from './pages/Listagem.jsx';
import Cadastro from './pages/Cadastro.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/"          element={<Home />} />
      <Route path="/produtos"  element={<Listagem />} />
      <Route path="/cadastro"  element={<Cadastro />} />
    </Routes>
  );
}