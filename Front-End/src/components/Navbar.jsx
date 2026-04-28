import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <span className="navbar-brand">🔧 Sistema de Produtos</span>
      <div className="navbar-links">
        <NavLink to="/"         className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Início</NavLink>
        <NavLink to="/produtos" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Produtos</NavLink>
        <NavLink to="/cadastro" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Cadastrar</NavLink>
      </div>
    </nav>
  );
}