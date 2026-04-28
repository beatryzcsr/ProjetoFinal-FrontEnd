import { buscarProdutos } from "../Get/get";
import API_URL from "../../Services/api";
import { useState } from "react";
import GetListagem from "../Get/get"

function EditarProduto() {
    const [idEditando, setIdEditando] = useState(null);
    const [nomeEditado, setNomeEditado] = useState("");
    const [precoEditado, setPrecoEditado] = useState("");
    const [estoqueEditado, setEstoqueEditado] = useState("");
    const [categoriaEditado, setCategoriaEditado] = useState("");

    function prepararEdicao(produto) {
        setIdEditando(produto.id);
        setNomeEditado(produto.nome);
        setPrecoEditado(produto.preco);
        setEstoqueEditado(produto.estoque);
        setCategoriaEditado(produto.categoria);
    }



    async function salvarEdicao(event) {
        event.preventDefault();

        const produtoAtualizado = {
            nome: nomeEditado,
            preco: precoEditado,
            estoque: estoqueEditado,
            categoria: categoriaEditado,
        };

        try {
            await fetch(`${API_URL}/${idEditando}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(produtoAtualizado),
            });

            alert("Produto atualizado!");

            setIdEditando(null);
            setNomeEditado("");
            setPrecoEditado("");
            setEstoqueEditado("");
            setCategoriaEditado("");

            buscarProdutos();
        } catch (erro) {
            console.log("Erro ao editar:", erro);
        }
    }



    return (
        <form onSubmit={salvarEdicao}>
            

                <button onClick={() => prepararEdicao(GetListagem)}>
                    Editar
                </button>

            {idEditando && (
                <form onSubmit={salvarEdicao}>
                    <input
                        type="text"
                        value={nomeEditado}
                        onChange={(event) => setNomeEditado(event.target.value)}
                    />
                    <input
                        type="number"
                        value={precoEditado}
                        onChange={(event) => setPrecoEditado(event.target.value)}
                    />
                    <input
                        type="number"
                        value={estoqueEditado}
                        onChange={(event) => setEstoqueEditado(event.target.value)}
                    />
                    <input
                        type="text"
                        value={categoriaEditado}
                        onChange={(event) => setCategoriaEditado(event.target.value)}
                    />

                    <button type="submit">Salvar edição</button>
                </form>
            )}
  
  
        </form>
    );

}

export default EditarProduto;


