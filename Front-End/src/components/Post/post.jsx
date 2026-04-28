import useState from "react";
import API_URL from "../../Services/api";
import { buscarProdutos } from "../Get/get";


function Cadastro() {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [estoque, setEstoque] = useState("");
  const [categoria, setCategoria] = useState("");

  async function cadastrarProduto(event) {
    event.preventDefault();

    const novoProduto = {
      nome: nome,
      preco: preco,
      estoque: estoque,
      categoria: categoria,
    };

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoProduto),
      });

      alert("Produto cadastrado com sucesso!");

      setNome("");
      setPreco("");
      setEstoque("");
      setCategoria("");

      buscarProdutos();
    } catch (erro) {
      console.log("Erro ao cadastrar:", erro);
    }
  }

  return (
    <form onSubmit={cadastrarProduto}>
      <input
        type="text"
        placeholder="Nome do produto"
        value={nome}
        onChange={(event) => setNome(event.target.value)}
      />

      <input
        type="number"
        placeholder="Preço"
        value={preco}
        onChange={(event) => setPreco(event.target.value)}
      />

        <input
        type="number"
        placeholder="Estoque"
        value={estoque}
        onChange={(event) => setNome(event.target.value)}
      />

        <input
        type="text"
        placeholder="Nome da Categoria"
        value={categoria}
        onChange={(event) => setNome(event.target.value)}
      />

      <button type="submit">Salvar</button>
    </form>
  );
}

export default Cadastro;
