import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import { COLOR } from '../utils/color';

interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  item: string;
  value: number | undefined;
  isActive: boolean;
  onClick?(): void;
}

const TabItem = ({ item, value, isActive, onClick }: TabProps) => {
  return (
    <Button key={item} onClick={onClick} isActive={isActive}>
      <Value>{value}</Value>
      <Title>{item.charAt(0).toUpperCase() + item.slice(1)}</Title>
    </Button>
  );
};

export default TabItem;

const Button = styled.button<{ isActive: boolean }>`
  cursor: pointer;
  width: 7rem;
  border-bottom: 2px solid
    ${({ isActive }) => (isActive ? COLOR.green : 'transparent')};
`;

const Value = styled.div`
  font-size: 1.8rem;
  font-weight: 500;
  color: ${COLOR.text};
  padding-bottom: 0.4rem;
`;

const Title = styled.div`
  color: ${COLOR.brownGray};
  font-size: 1.2rem;
  padding-bottom: 0.5rem;
`;
