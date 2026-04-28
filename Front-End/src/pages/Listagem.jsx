import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import API_URL from '../services/api.js';

const CATEGORIAS = [
  'Chinesa',
  'Japonesa',
  'Coreana',
  'Tailandesa',
  'Vietnamita',
  'Outros',
];

export default function Listagem() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [erro, setErro]         = useState('');
  const [busca, setBusca]       = useState('');

  // edição
  const [editando, setEditando]   = useState(null);
  const [formEdicao, setFormEdicao] = useState({ nome: '', preco: '', estoque: '', categoria: '' });
  const [msgEdicao, setMsgEdicao] = useState('');

  async function buscarProdutos() {
    try {
      setLoading(true);
      setErro('');
      const resposta = await fetch(API_URL);
      const dados    = await resposta.json();
      setProdutos(dados);
    } catch (e) {
      setErro('Erro ao buscar produtos: ' + e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErro('');
        const resposta = await fetch(API_URL);
        const dados    = await resposta.json();
        setProdutos(dados);
      } catch (e) {
        setErro('Erro ao buscar produtos: ' + e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function excluirProduto(id) {
    const confirmar = confirm('Deseja excluir este produto?');
    if (!confirmar) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      buscarProdutos();
    } catch (e) {
      alert('Erro ao excluir: ' + e.message);
    }
  }

  function prepararEdicao(produto) {
    setEditando(produto.id);
    setFormEdicao({
      nome:      produto.nome,
      preco:     produto.preco,
      estoque:   produto.estoque,
      categoria: produto.categoria,
    });
    setMsgEdicao('');
  }

  async function salvarEdicao(event) {
    event.preventDefault();
    try {
      const resposta = await fetch(`${API_URL}/${editando}`, {
        method:  'PUT',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(formEdicao),
      });
      if (!resposta.ok) {
        const err = await resposta.json().catch(() => ({}));
        throw new Error(err.mensagem || 'Erro ao atualizar');
      }
      setMsgEdicao('sucesso');
      setEditando(null);
      buscarProdutos();
    } catch (e) {
      setMsgEdicao('erro:' + e.message);
    }
  }

  const produtosFiltrados = produtos.filter(p =>
    p.nome.toLowerCase().includes(busca.toLowerCase()) ||
    p.categoria.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Produtos</h1>

        {msgEdicao === 'sucesso' && <div className="msg msg-sucesso">✅ Produto atualizado com sucesso!</div>}
        {msgEdicao.startsWith('erro:') && <div className="msg msg-erro">❌ {msgEdicao.replace('erro:', '')}</div>}

        <input
          type="text"
          className="input-busca"
          placeholder="🔍 Buscar por nome ou categoria..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
        />

        {loading && <p className="status">⏳ Carregando...</p>}
        {erro    && <p className="status status-erro">{erro}</p>}
        {!loading && !erro && produtosFiltrados.length === 0 && (
          <p className="status">📭 Nenhum produto encontrado.</p>
        )}

        {produtosFiltrados.map(produto => (
          <div key={produto.id}>
            {editando === produto.id ? (
              <div className="form-card">
                <h3>Editando: <em>{produto.nome}</em></h3>
                <form onSubmit={salvarEdicao}>
                  <div className="form-group">
                    <label>Nome</label>
                    <input
                      type="text"
                      value={formEdicao.nome}
                      onChange={e => setFormEdicao({ ...formEdicao, nome: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Preço (R$)</label>
                      <input
                        type="number" step="0.01" min="0.01"
                        value={formEdicao.preco}
                        onChange={e => setFormEdicao({ ...formEdicao, preco: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Estoque</label>
                      <input
                        type="number" min="0"
                        value={formEdicao.estoque}
                        onChange={e => setFormEdicao({ ...formEdicao, estoque: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Categoria</label>
                    <select
                      value={formEdicao.categoria}
                      onChange={e => setFormEdicao({ ...formEdicao, categoria: e.target.value })}
                      required
                    >
                      <option value="">Selecione...</option>
                      {CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="btn-group">
                    <button type="submit" className="btn btn-primary">Salvar</button>
                    <button type="button" className="btn btn-secondary" onClick={() => setEditando(null)}>Cancelar</button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="produto-card">
                <div className="produto-info">
                  <strong>{produto.nome}</strong>
                  <span className="produto-meta">{produto.categoria} · Estoque: {produto.estoque}</span>
                  <span className="produto-preco">
                    R$ {Number(produto.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="btn-group">
                  <button className="btn btn-warning" onClick={() => prepararEdicao(produto)}>Editar</button>
                  <button className="btn btn-danger"  onClick={() => excluirProduto(produto.id)}>Excluir</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
