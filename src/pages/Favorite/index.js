import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import './Favorite.css';

export default function Favorite(){
    const [filmes, setFilmes] = useState([]);

    useEffect(()=>{
        const minhaLista = localStorage.getItem('filmes')
        setFilmes(JSON.parse(minhaLista) || []);

    }, []);

    function handDelet(id){
        let filtroFilmes = filmes.filter((item)=> {
            return (item.id !== id)
        })
        setFilmes(filtroFilmes);
        localStorage.setItem('filmes', JSON.stringify(filtroFilmes))
    }

    return(
        <div id="meus-filmes">
            <h1>Meus Filmes</h1>

            {filmes.length === 0 && <span>Voce esta sem filmes salvos 😅</span>}
        <ul>
            {filmes.map((item)=>{
                return(
                    <li key={item.id}>
                       <span>{item.nome}</span> 

                       <div>
                        <Link to={`/filme/${item.id}`}>ver detalhes</Link>
                        <button onClick={()=>handDelet(item.id)}>excluir</button>
                       </div>
                    </li>
                    )
                })}    
            </ul>   
        </div>
    )
}