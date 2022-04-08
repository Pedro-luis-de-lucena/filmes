
import { useEffect, useState } from 'react';
import './Filme-info.css';
import { useParams, useHistory } from 'react-router-dom';
import api from '../../services/api';

export default function Filme(){
  const { id } = useParams();
  const history = useHistory();

  const [filme, setFilme] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{

    async function loadFilme(){
      const response = await api.get(`r-api/?api=filmes/${id}`);
      
      if(response.data.length === 0){
        //Tentou acessar com um ID que nao existe, navego ele para home!
        history.replace('/');
        return;
      }

      setFilme(response.data);
      setLoading(false);
    }

    loadFilme();

    return () => {
      console.log('COMPONENTE DESMONTADO')
    }

  }, [history, id]);

  function salveFilm(){
      
    const minhaLista = localStorage.getItem('filmes');

    let saveFilm = JSON.parse(minhaLista) || [];

    const hasFilme = saveFilm.some( (filmesSalvos) => filmesSalvos.id === filme.id);
  
    if(hasFilme){
        alert("Ja tem este filme salvo.");
        return;
    }
    saveFilm.push(filme);
    localStorage.setItem('filmes', JSON.stringify(saveFilm))
    alert('Filme salvo com sucesso!');

}

  if(loading){
    return(
    <div className="filme-info">
      <h1>Carregando seu filme...</h1>
    </div>
    )
  }
  return(
    <div className="filme-info">
      <div className='nome-filme'>
      <h1> {filme.nome} </h1>
      </div>
      <img src={filme.foto} alt={filme.nome} />
    <div className='sinopse'>
      <div className='sinopse_caixa'>
      <h3>Sinopse</h3>
      </div>
      {filme.sinopse}
    </div>
      <div className="botoes">
        <button onClick={salveFilm} >Salvar</button>
        <button>
          <a target="blank" href={`https://youtube.com/results?search_query=${filme.nome} Trailer`}>
            Trailer
          </a>
        </button>
      </div>
    </div>
  )
}