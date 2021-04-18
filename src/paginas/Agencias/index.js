import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit2 } from 'react-icons/fi';

import api from '../../servicos/api';

function Agencias() {
  const [listaAgencias, setListaAgencias] = useState([{}]);
  const [editar, setEditar] = useState(false);
  const [agenciaParaEditar, setAgenciaParaEditar] = useState([{}]);
  const [indexParaEditar, setIndexParaEditar] = useState('');

  const handleOutsideClick = (e) => {
    if (e.target.id === 'modal')
      setEditar(false);
  }

  async function atualizarAgencia() {
    try {
      const data = {
        agencia: agenciaParaEditar.agenciaPadrao
      }

      await api.put(`api/config/atualizar/${agenciaParaEditar.idconfig}`, data);
      setEditar(false);
      let newArr = [...listaAgencias];
      newArr[indexParaEditar] = agenciaParaEditar;

      setListaAgencias(newArr);
    } catch (err) {
      alert("Erro ao atualizar agencia")
      console.log(err);
    }
  }

  async function listar() {
    try {
      const response = await api.get('api/config/buscar');
      setListaAgencias(response.data);
    } catch (err) {
      alert("Erro ao carregar lista de agências")
      console.log(err);
    }
  }

  useEffect(() => {
    listar();
  }, [])

  return (
    <div className="container">
      <div className="cabecalho">
        <h2 style={{ marginBottom: '10px' }}>Lista de Agências</h2>
        <Link to="/">Voltar</Link>
      </div>
      <div className="lista">
        {listaAgencias.length === 0 &&
          <h3>Nenhuma agência cadastrada</h3>
        }
        <ul>
          {listaAgencias.length !== 0 && listaAgencias.map((conta, index) => (
            <li key={conta.idconfig}>
              <div className="info-lista">
                <strong style={{ marginRight: '5px' }}>Agência:</strong>
                <p>{conta.agenciaPadrao}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEditar(true);
                  setAgenciaParaEditar(conta);
                  setIndexParaEditar(index)
                }}
              >
                <FiEdit2 size={20} color="#00000" />
              </button>
            </li>
          ))}
        </ul>
        {editar ? (
        <div id='modal' className="edicao-container" onClick={handleOutsideClick}>
          <div className="edicao">
            <h1 style={{ marginBottom: '10px' }}>Editar Agência</h1>
            <div className="campos-edicao">
              <input
                type="number"
                placeholder="Agência"
                className="inputs-cadastro"
                value={agenciaParaEditar.agenciaPadrao}
                onChange={e => setAgenciaParaEditar({
                  ...agenciaParaEditar,
                  agenciaPadrao: e.target.value
                })}
              />
            </div>
            <div className="botao-edicao">
              <button 
                style={{ marginRight: '15px' }}
                onClick={atualizarAgencia}
              >
                Salvar
              </button>
              <button onClick={() => setEditar(false)}>Fechar</button>
            </div>
          </div>
        </div>
      ) : null}
      </div>
    </div>
  );
}

export default Agencias;