import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="home-hero">
          <h1>Sistema de Comidas Japonesas</h1>
          <p>Gerencie o estoque de comidas de forma simples e rápida.</p>
          <div className="home-actions">
            <Link to="/produtos"><button className="btn btn-primary">Ver Produtos</button></Link>
            <Link to="/cadastro"><button className="btn btn-secondary">Cadastrar Novo</button></Link>
          </div>
        </div>

        <div className="home-cards">
          <div className="info-card">
            <span className="info-icon">📋</span>
            <h3>Listagem</h3>
            <p>Visualize todos os produtos cadastrados no sistema.</p>
          </div>
          <div className="info-card">
            <span className="info-icon">➕</span>
            <h3>Cadastro</h3>
            <p>Adicione novos produtos com nome, preço, estoque e categoria.</p>
          </div>
          <div className="info-card">
            <span className="info-icon">✏️</span>
            <h3>Edição e Exclusão</h3>
            <p>Atualize ou remova produtos diretamente na listagem.</p>
          </div>
        </div>
      </div>
    </div>
  );
}