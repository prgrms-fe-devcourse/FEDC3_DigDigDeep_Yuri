import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Icon from '../Base/Icon';

const BackButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <Button onClick={handleClick}>
      <Icon name="back" width={20} height={16} />
    </Button>
  );
};

export default BackButton;

const Button = styled.button`
  cursor: pointer;
  font-size: 1.6rem;
  justify-self: start;
`;
