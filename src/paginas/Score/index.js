import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit2 } from 'react-icons/fi';

import api from '../../servicos/api';

import './styles.css';

function Score() {
  const [listaScore, setListaScore] = useState([{}]);
  const [editar, setEditar] = useState(false);
  const [scoreParaEditar, setScoreParaEditar] = useState([{}]);
  const [indexParaEditar, setIndexParaEditar] = useState('');

  const handleOutsideClick = (e) => {
    if (e.target.id === 'modal')
      setEditar(false);
  }

  async function listar() {
    try {
      const response = await api.get('api/credito/buscar');
      setListaScore(response.data);
    } catch (err) {
      alert("Erro ao carregar lista de scores")
      console.log(err);
    }
  }

  async function atualizarCredito() {
    try {
      const data = {
        limiteCartao: scoreParaEditar.limiteCartao,
        limiteCheque: scoreParaEditar.limiteCheque,
      }

      await api.put(`api/credito/atualizar/${scoreParaEditar.score}`, data);
      setEditar(false);
      let newArr = [...listaScore];
      newArr[indexParaEditar] = scoreParaEditar;

      setListaScore(newArr);
    } catch (err) {
      alert("Erro ao atualizar score")
      console.log(err);
    }
  }

  useEffect(() => {
    listar();
  }, [])

  return (
    <div className="container">
      <div className="cabecalho">
        <h2 style={{ marginBottom: '10px' }}>Lista de Scores</h2>
        <Link to="/">Voltar</Link>
      </div>
      <div className="lista">
        {listaScore.length === 1 &&
          <h3>Nenhum score cadastrado</h3>
        }
        <ul>
          {listaScore.length !== 1 && listaScore.map((score, index)=> (
            <li key={score.score}>
              <div className="info-lista">
                <strong style={{ marginRight: '5px' }}>Score:</strong>
                <p>{score.score}</p>
              </div >

              <div className="info-lista">
                <strong style={{ marginRight: '5px' }}>Limite cartão:</strong>
                <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(score.limiteCartao)}</p>
              </div >

              <div className="info-lista">
                <strong style={{ marginRight: '5px' }}>Limite cheque:</strong>
                <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(score.limiteCheque)}</p>
              </div >
              <button
                type="button"
                onClick={() => {
                  setEditar(true);
                  setScoreParaEditar(score);
                  setIndexParaEditar(index)
                }}
              >
                <FiEdit2 size={20} color="#00000" />
              </button>
            </li>
          ))}
        </ul>
      </div>
      {editar ? (
        <div id='modal' className="edicao-container" onClick={handleOutsideClick}>
          <div className="edicao">
            <h1 style={{ marginBottom: '10px' }}>Editar Score</h1>
            <div className="campos-edicao">
              <input
                type="number"
                placeholder="Limite cartão"
                className="inputs-cadastro"
                value={scoreParaEditar.limiteCartao}
                onChange={e => setScoreParaEditar({
                  ...scoreParaEditar,
                  limiteCartao: e.target.value
                })}
              />
              <input
                type="number"
                placeholder="Limite cheque"
                className="inputs-cadastro"
                value={scoreParaEditar.limiteCheque}
                onChange={e => setScoreParaEditar({
                  ...scoreParaEditar,
                  limiteCheque: e.target.value
                })}
              />
            </div>

            <div className="botao-edicao">
              <button 
                style={{ marginRight: '15px' }}
                onClick={atualizarCredito}
              >
                Salvar
              </button>
              <button onClick={() => setEditar(false)}>Fechar</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Score;