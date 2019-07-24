import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { FaSpinner } from 'react-icons/fa';

import { TechItem, TechList, TechControls } from './styles';
import { Container } from '../../components/Container';
import { Loading } from '../../components/Loading';

import api from '../../services/api';

export default function Home() {
  const [techs, setTechs] = useState([]);
  const [newTech, setNewTech] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ hasError: false, message: '' });

  useEffect(() => {
    setLoading(true);
    async function getTechs() {
      const response = await api.get('/techs');

      setTechs(response.data);
      setLoading(false);
    }
    getTechs();
  }, []);

  useEffect(() => {
    if (techs.length > 0) {
      setSelectedId(String(techs[0].id));
    }
  }, [techs]);

  async function handleAdd() {
    if (!newTech) {
      setError({
        hasError: true,
        message: 'Tecnologia é obrigatória.',
      });
      return;
    }
    setError({ hasError: false, message: '' });

    const obj = {
      id: techs.length > 0 ? techs[techs.length - 1].id + 1 : 1,
      techName: newTech,
      techDescription: '',
    };
    setTechs([...techs, obj]);

    setLoading(true);
    await api.post('/techs', obj);

    setNewTech('');
    setLoading(false);
  }

  async function handleRemove() {
    const newArray = techs.filter(t => String(t.id) !== selectedId);
    setLoading(true);

    try {
      await api.delete(`/techs/${selectedId}`);

      setTechs(newArray);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }

  return (
    <Container>
      {loading ? (
        <Loading>
          <FaSpinner color="#aaa" size={14} />
        </Loading>
      ) : (
        <>
          <TechList>
            <h1>Tecnologias</h1>
            <ul>
              {techs.map(t => (
                <TechItem key={t.id}>
                  <li>{t.techName}</li>
                  <Link to={`/detail/${t.id}`}>Selecionar</Link>
                </TechItem>
              ))}
            </ul>
          </TechList>
          <TechControls error={error}>
            <input
              type="text"
              value={newTech}
              onChange={e => setNewTech(e.target.value)}
            />
            <button type="button" onClick={handleAdd}>
              Adicionar
            </button>
            <br />
            <br />
            <select
              value={selectedId}
              onChange={e => setSelectedId(e.target.value)}
            >
              {techs.map(t => (
                <option key={t.id} value={t.id}>
                  {t.techName}
                </option>
              ))}
            </select>
            <button type="button" onClick={handleRemove}>
              Excluir
            </button>
          </TechControls>
        </>
      )}
    </Container>
  );
}
