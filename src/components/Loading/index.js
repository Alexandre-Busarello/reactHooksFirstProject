import styled, { css } from 'styled-components';
import { rotate } from '../../styles/global';

export const Loading = styled.div`
  display: flexbox;
  align-items: center;
  justify-content: center;

  ${css`
    svg {
      animation: ${rotate} 2s linear infinite;
    }
  `}
`;
