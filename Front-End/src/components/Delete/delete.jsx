import { buscarProdutos } from "../Get/get";
import GetListagem from "../Get/get";

async function excluirProduto(id) {
  const confirmar = confirm("Deseja excluir este produto?");

  if (!confirmar) {
    return;
  }

  try {
    await fetch(`${"http://localhost:3000/produtos"}/${id}`, {
      method: "DELETE",
    });

    alert("Produto excluído!");

    buscarProdutos();
  } catch (erro) {
    console.log("Erro ao excluir:", erro);
  }
}

<button onClick={() => excluirProduto(GetListagem.id)}>
  Excluir
</button>


export default excluirProduto;
