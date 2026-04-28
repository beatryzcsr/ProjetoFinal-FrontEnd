import { useEffect, useState } from "react";
import API_URL from "../../Services/api"

function GetListagem (){
    const [produtos, setProdutos] = useState([]);




    useEffect(() => {

        async function buscarProdutos() {
        try{
            const resposta = await fetch(API_URL);
            const dados = await resposta.json();
            setProdutos(dados);
        }catch (erro) {
            console.log("Erro ao buscar produtos: ", erro);
        }
    }

        buscarProdutos();
    }, []);

    return (
        <div className="title">
            <h1>Lista de Produtos: Doces Japoneses</h1>
            {produtos.map((produto)=> (
                    <div key={produto.id}>
                        <h2>{produto.nome}</h2>
                        <p>Preço: R$ {produto.preco}</p>
                    </div>

                ))}
        </div>
    );
    
}


export default GetListagem;

