import React, { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { COLOR } from '../utils/color';
import Divider from './Base/Divider';
import Icon from './Base/Icon';

interface FormProps {
  children: ReactNode[];
  isFocus: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
const Searchbar = () => {
  const [search, setSearch] = useState('');
  const [select, setSelect] = useState('posts');
  const [isFocus, setIsFocus] = useState(false);
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.value);
  };

  const handleReset = () => setSearch('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search) {
      return navigate(`/search?q=${search}&type=${select}`);
    }
    alert('검색어를 입력해주세요.');
  };

  const onInputBlur = () => {
    setIsFocus(false);
  };

  const onInputFocus = () => setIsFocus(true);

  return (
    <Form isFocus={isFocus} onSubmit={onSubmit}>
      <Button>
        <Icon name="search" width={13} height={13} />
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
  display: flex;
  background: ${COLOR.white};
  box-shadow: 0px 2px 4px rgba(146, 113, 96, 0.11);
  border-radius: 23.5px;
  align-items: center;
  justify-content: space-between;
  gap: 1.3rem;
  margin: 0 5%;
  padding: 1.4rem 1.8rem;
  border: 1px solid;
  border-color: ${({ isFocus }) =>
    isFocus ? COLOR.lightBrown : COLOR.lightGray};
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
  font-family: 'Inter', sans-serif;
  font-style: normal;
  flex-shrink: 1;
  flex-grow: 1;
  padding: 0;

  ::placeholder {
    color: ${COLOR.brownGray};
    line-height: 1.3rem;
  }
`;

const Select = styled.select`
  border: none;
  font-size: 1.2rem;
  font-family: 'Inter', sans-serif;
  color: ${COLOR.lightBrown};
  outline: none;
`;

const Option = styled.option``;

export default Searchbar;
