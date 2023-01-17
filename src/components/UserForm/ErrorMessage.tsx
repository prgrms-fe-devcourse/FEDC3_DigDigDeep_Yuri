import styled from 'styled-components';
import { COLOR } from '../../utils/color';

const ErrorMessage = styled.span`
  display: block;
  font-weight: 400;
  font-size: 1.3rem;
  line-height: 1.9rem;
  letter-spacing: -0.01em;
  white-space: pre-wrap;
  min-height: 1.9rem;

  color: ${COLOR.orange};
`;

export default ErrorMessage;
