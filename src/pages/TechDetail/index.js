import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { FaSpinner } from 'react-icons/fa';
import { Container } from '../../components/Container';
import { Loading } from '../../components/Loading';

import api from '../../services/api';

export default function TechDetail({ match }) {
  const { id } = match.params;
  const [tech, setTech] = useState({});
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function getTech() {
      try {
        setLoading(true);

        const response = await api.get(`/techs/${id}`);

        setTech(response.data);
        setLoading(false);
      } catch (err) {
        setNotFound(true);
        setLoading(false);
      }
    }
    getTech();
  }, [id]);

  return (
    <Container>
      {loading ? (
        <Loading>
          <FaSpinner color="#aaa" size={14} />
        </Loading>
      ) : notFound ? (
        <span>Tecnologia não encontrada.</span>
      ) : (
        <>
          <span>{`ID: ${tech.id} - Nome: ${tech.techName}`}</span>
          <p>{tech.techDescription}</p>
        </>
      )}
    </Container>
  );
}

TechDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
