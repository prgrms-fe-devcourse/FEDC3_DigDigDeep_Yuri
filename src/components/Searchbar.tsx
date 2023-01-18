import React, { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { COLOR } from '../utils/color';
import { ROUTES } from '../utils/routes';
import Divider from './Base/Divider';
import Icon from './Base/Icon';

interface FormProps {
  children: ReactNode[];
  isFocus: boolean;
  visible?: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
const Searchbar = ({ isMobile }: { isMobile: boolean }) => {
  const [search, setSearch] = useState('');
  const [select, setSelect] = useState('posts');
  const [isFocus, setIsFocus] = useState(false);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSelect(e.target.value);

  const handleReset = () => setSearch('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search) {
      return navigate(ROUTES.SEARCH_BY_QUERY(search, select));
    }
    alert('검색어를 입력해주세요.');
  };

  const onInputBlur = () => setIsFocus(false);

  const onInputFocus = () => setIsFocus(true);

  useEffect(() => {
    setVisible(true);

    const onScroll = (e: Event) => {
      if (isMobile) {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [isMobile]);

  return (
    <Form isFocus={isFocus} visible={visible} onSubmit={onSubmit}>
      <Button>
        <Icon name="search" size={13} />
      </Button>
      <Input
        type="text"
        placeholder="그라운드를 검색해보세요!"
        value={search}
        onFocus={onInputFocus}
        onBlur={onInputBlur}
        onChange={onChange}
      />
      {search && (
        <Button type="button" onClick={handleReset}>
          <Icon name="close" width={12} height={12} />
        </Button>
      )}
      <Divider type="vertical" size={0} />
      <Select onChange={handleSelect}>
        <Option value="posts">그라운드</Option>
        <Option value="users">사용자</Option>
      </Select>
    </Form>
  );
};

const Form = styled.form<FormProps>`
  width: 100%;
  display: flex;
  background: ${COLOR.white};
  min-width: 50rem;
  border-radius: 23.5px;
  align-items: center;
  justify-content: space-between;
  gap: 1.3rem;
  padding: 1.3rem 1.8rem;
  border: 1px solid;
  box-sizing: border-box;
  border-color: ${({ isFocus }) =>
    isFocus ? COLOR.lightBrown : COLOR.lightGray};
  width: ${({ visible }) => (visible ? '100%' : 0)};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: all 0.4s ease-out;

  @media screen and (max-width: 767px) and (orientation: portrait) {
    box-shadow: 0px 2px 4px rgba(146, 113, 96, 0.11);
    padding: 1.4rem 1.8rem;
    min-width: 0;
    margin: 0;
  }
`;

const Button = styled.button`
  width: 1.3rem;
  height: 1.3rem;
  margin-left: 0.4rem;
  cursor: pointer;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  letter-spacing: -0.01em;
  color: ${COLOR.lightBrown};
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 1.6rem;
  padding: 0;

  ::placeholder {
    color: ${COLOR.brownGray};
    line-height: 1.3rem;
  }
`;

const Select = styled.select`
  border: none;
  font-size: 1.2rem;
  color: ${COLOR.lightBrown};
  outline: none;
`;

const Option = styled.option``;

export default Searchbar;
