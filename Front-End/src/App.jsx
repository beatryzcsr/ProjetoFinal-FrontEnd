import { useState, useEffect, useCallback } from 'react';
import { BASE_URL } from './services/api';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import ConfirmModal from './components/ConfirmModal';
import ProductDetail from './components/ProductDetail';
import { Package, LayoutDashboard, Settings, LogOut, Plus, User } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import './App.css';

function App() {
  
  const [produtos, setProdutos] = useState([]);
  const [produtoEmEdicao, setProdutoEmEdicao] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);



  // Estados para o Modal de Exclusão
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Estados para o Modal de Detalhes
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [produtoDetalhe, setProdutoDetalhe] = useState(null);

  const openDetail = (produto) => {
    setProdutoDetalhe(produto);
    setIsDetailOpen(true);
  };

  const fetchProdutos = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/produtos`);
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.mensagem || 'Erro na requisição');
      }
      const data = await response.json();
      setProdutos(data);
    } catch (error) {
      console.error("Erro ao buscar produtos", error);
      toast.error(`Erro: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProdutos();
    
  }, [fetchProdutos]);


  return (
    <>
    <div className=''></div>
    </>
  )
}

export default App
