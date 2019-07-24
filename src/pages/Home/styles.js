import styled from 'styled-components';

export const TechList = styled.div`
  ul {
    list-style: none;
    margin: 20px;
  }
`;

export const TechItem = styled.div`
  display: flex;
  flex-direction: row;

  li {
    margin-right: 10px;
  }
`;

export const TechControls = styled.div`
  input {
    padding: 5px;
    border: 1px ${props => (props.error.hasError ? 'red' : '#ccc')} solid;
    border-radius: 4px;
    height: 25px;
    color: ${props => (props.error.hasError ? 'red' : '')};
    width: 180px;
  }

  select {
    border-radius: 4px;
    border: 1px #ccc solid;
    height: 25px;
    width: 180px;
  }

  button {
    background: #7159c1;
    border: 0;
    border-radius: 4px;
    color: #fff;
    height: 25px;
    padding: 0 10px;
    margin-left: 10px;
  }
`;
