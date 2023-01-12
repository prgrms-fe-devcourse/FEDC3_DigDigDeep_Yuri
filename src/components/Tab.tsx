import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  item: string;
  value: number | undefined;
  isActive: boolean;
  onClick?(): void;
}

const Tab = ({ item, value, isActive, onClick }: TabProps) => {
  return (
    <TabButton key={item} onClick={onClick} isActive={isActive}>
      <div>{value}</div>
      <div>{item.charAt(0).toUpperCase() + item.slice(1)}</div>
    </TabButton>
  );
};

export default Tab;

const TabButton = styled.button<{ isActive: boolean }>`
  background-color: ${({ isActive }) => (isActive ? 'red' : 'white')};
  cursor: pointer;
`;
