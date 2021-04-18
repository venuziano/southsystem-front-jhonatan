import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../../servicos/api';

import './styles.css';

function People() {
  const [nome, setNome] = useState('');
  const [documento, setDocumento] = useState('');
  const [tipoFisica, setTipoFisica] = useState(true);
  const [tipoJuridica, setTipoJuridica] = useState(false);
  const [listaPessoas, setListaPessoas] = useState([{}]);

  async function cadastrar(e) {
    try {
      e.preventDefault();

      const data = {
        nome,
        numeroDocumento: documento.replace(/[^\d]+/g, '')
      }

      const response = await api.post('api/cliente/cadastrar', data);
      setListaPessoas([
        ...listaPessoas,
        response.data
      ])
    } catch (err) {
      // console.log(err.response);
      if (err.response.status === 400) {
        alert("Erro no cadastro, tente novamente.")
      }
    }
  }

  async function listar() {
    try {
      const response = await api.get('api/cliente/buscar');
      setListaPessoas(response.data);
    } catch (err) {
      alert("Erro ao carregar lista de usuários")
      console.log(err);
    }
  }

  function mascaraCPF(value) {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
  }

  function mascaraCNPJ(e) {
    let x = e.replace(/\D/g, '')
      .match(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/);

    e = !x[2] ? x[1] : x[1] + '.' + x[2] + '.' + x[3] + '/' + x[4] + (x[5] ? '-' + x[5] : '');

    return e
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
  }

  useEffect(() => {
    listar();
  }, [])

  return (
    <div className="container">
      <div className="cadastro">
        <div className="cabecalho">
          <h2>Cadastrar Usuário</h2>
          <Link to="/">Voltar</Link>
        </div>
        <form onSubmit={cadastrar}>
          <div className="campos-cadastro">
            <div className="tipo-pessoa">
              <input
                className="radio-button-tipo-pessoa"
                type="radio"
                id="pf"
                name="tipoPf"
                value="Pessoa Física"
                defaultChecked
                checked={tipoFisica}
                onChange={() => {
                  setTipoJuridica(false);
                  setTipoFisica(true);
                  setDocumento('');
                }}
              />
              <label
                className="radio-button-tipo-pessoa"
                for="pf"
              >
                Pessoa Física
              </label><br></br>
              <input
                className="radio-button-tipo-pessoa"
                type="radio"
                id="pj"
                name="tipoPj"
                value="Pessoa Jurídica"
                checked={tipoJuridica}
                onChange={() => {
                  setTipoJuridica(true);
                  setTipoFisica(false);
                  setDocumento('');
                }}
              />
              <label
                className="radio-button-tipo-pessoa"
                for="pj"
              >
                Pessoa Jurídica
              </label><br></br>
            </div>
            <input
              placeholder="Nome"
              className="inputs-cadastro"
              value={nome}
              onChange={e => setNome(e.target.value)}
            />
            {tipoFisica &&
              <input
                placeholder="CPF"
                className="inputs-cadastro"
                maxLength="14"
                value={documento}
                onChange={e => setDocumento(mascaraCPF(e.target.value))}
              />
            }
            {tipoJuridica &&
              <input
                placeholder="CNPJ"
                className="inputs-cadastro"
                maxLength="18"
                value={documento}
                onChange={e => setDocumento(mascaraCNPJ(e.target.value))}
              />
            }
            <div className="container-botao-cadastrar">
              <button type="submit">Cadastrar</button>
            </div>
          </div>
        </form>
      </div>
      <div className="lista">
        <h2 style={{ marginTop: '10px', marginBottom: '10px' }}>Lista de Usuário</h2>
        {listaPessoas.length === 1 &&
          <h3>Nenhum usuário cadastrado</h3>
        }
        <ul>
          {listaPessoas.length !== 1 && listaPessoas.map(pessoas => (
            <li key={pessoas.idCliente}>
              <div className="info-lista">
                <strong style={{ marginRight: '5px' }}>Nome:</strong>
                <p>{pessoas.nome}</p>
              </div>

              <div className="info-lista">
                <strong style={{ marginRight: '5px' }}>Documento:</strong>
                <p>{pessoas.numeroDocumento}</p>
              </div >

              <div className="info-lista">
                <strong style={{ marginRight: '5px' }}>Tipo Pessoa:</strong>
                <p>{pessoas.tipo}</p>
              </div >
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default People;
