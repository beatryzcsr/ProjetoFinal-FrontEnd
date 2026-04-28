import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import API_URL from '../services/api.js';

const CATEGORIAS = [
  'Ferramentas de Corte',
  'Pastilhas e Insertos',
  'Eixos e Componentes',
  'Transmissão',
  'Buchas e Rolamentos',
  'Outros',
];

const VAZIO = { nome: '', preco: '', estoque: '', categoria: '' };

export default function Cadastro() {
  const [form, setForm]   = useState(VAZIO);
  const [msg, setMsg]     = useState('');
  const [enviando, setEnviando] = useState(false);
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function cadastrarProduto(event) {
    event.preventDefault();
    setEnviando(true);
    setMsg('');

    try {
      const resposta = await fetch(API_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      });

      if (!resposta.ok) {
        const err = await resposta.json().catch(() => ({}));
        throw new Error(err.erro || 'Erro ao cadastrar');
      }

      setMsg('sucesso');
      setForm(VAZIO);
      setTimeout(() => navigate('/produtos'), 1500);
    } catch (e) {
      setMsg('erro:' + e.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Cadastrar Produto</h1>

        {msg === 'sucesso' && <div className="msg msg-sucesso">✅ Produto cadastrado! Redirecionando...</div>}
        {msg.startsWith('erro:') && <div className="msg msg-erro">❌ {msg.replace('erro:', '')}</div>}

        <div className="form-card">
          <form onSubmit={cadastrarProduto}>
            <div className="form-group">
              <label>Nome da Peça</label>
              <input
                type="text"
                name="nome"
                placeholder="Ex: Fresa de Topo 10mm"
                value={form.nome}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Preço (R$)</label>
                <input
                  type="number"
                  name="preco"
                  step="0.01"
                  min="0.01"
                  placeholder="0.00"
                  value={form.preco}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Estoque</label>
                <input
                  type="number"
                  name="estoque"
                  min="0"
                  placeholder="0"
                  value={form.estoque}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Categoria</label>
              <select name="categoria" value={form.categoria} onChange={handleChange} required>
                <option value="">Selecione...</option>
                {CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="btn-group">
              <button type="submit" className="btn btn-primary" disabled={enviando}>
                {enviando ? 'Cadastrando...' : 'Cadastrar'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/produtos')}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}