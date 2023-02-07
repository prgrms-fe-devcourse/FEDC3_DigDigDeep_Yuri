import { ButtonHTMLAttributes, useEffect, useState } from 'react';
import styled from 'styled-components';
import COLORS from '../../utils/colors';

interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  item: string;
  value: number | undefined;
  isActive: boolean;
  onClick?(): void;
}

const TabItem = ({ item, value, isActive, onClick }: TabProps) => {
  const [name, setName] = useState<string>('');

  useEffect(() => {
    if (item === 'posts') {
      setName('ground');
    } else if (item === 'followers') {
      setName('follower');
    } else {
      setName('following');
    }
  }, [item]);

  return (
    <Button key={item} onClick={onClick} isActive={isActive}>
      <Value>{value}</Value>
      <Title>{name.charAt(0).toUpperCase() + name.slice(1)}</Title>
    </Button>
  );
};

export default TabItem;

const Button = styled.button<{ isActive: boolean }>`
  cursor: pointer;
  width: 8rem;
  border-bottom: 3px solid
    ${({ isActive }) => (isActive ? COLORS.green : 'transparent')};
`;

const Value = styled.div`
  font-size: 1.8rem;
  font-weight: 500;
  color: ${COLORS.text};
  padding-bottom: 0.4rem;
`;

const Title = styled.div`
  color: ${COLORS.brownGray};
  font-size: 1.3rem;
  font-weight: 500;
  padding-bottom: 0.7rem;
`;
