import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../../servicos/api';

function Contas() {
  const [listaContas, setListaContas] = useState([{}]);

  async function listar() {
    try {
      const response = await api.get('api/conta/buscar');
      setListaContas(response.data);
    } catch (err) {
      alert("Erro ao carregar lista de contas")
      console.log(err);
    }
  }

  useEffect(() => {
    listar();
  }, [])

  if (listaContas.length === 0) return null;

  return (
    <div className="container">
      <div className="cabecalho">
        <h2 style={{ marginBottom: '10px' }}>Lista de Contas</h2>
        <Link to="/">Voltar</Link>
      </div>
      <div className="lista">
        {listaContas.length === 1 &&
          <h3>Nenhuma conta cadastrada</h3>
        }
        <ul>
          {listaContas.length !== 1 && listaContas.map(conta => (
            <li key={conta.idconta}>
              <div className="info-lista">
                <strong style={{ marginRight: '5px' }}>Nº conta:</strong>
                <p>{conta.idconta}</p>
              </div>

              <div className="info-lista">
                <strong style={{ marginRight: '5px' }}>Agência:</strong>
                <p>{conta.agencia}</p>
              </div >

              <div className="info-lista">
                <strong style={{ marginRight: '5px' }}>Tipo:</strong>
                <p>{conta.tipo}</p>
              </div >

              <div className="info-lista">
                <strong style={{ marginRight: '5px' }}>Score:</strong>
                <p>{conta.score.score}</p>
              </div >

              <div className="info-lista">
                <strong style={{ marginRight: '5px' }}>Limite cartão:</strong>
                <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(conta.score.limiteCartao)}</p>
              </div >

              <div className="info-lista">
                <strong style={{ marginRight: '5px' }}>Limite cheque:</strong>
                <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(conta.score.limiteCheque)}</p>
              </div >
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Contas;