import React, { ReactNode, useEffect, useState, useRef } from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import COLORS from '../../utils/colors';
import ROUTES from '../../utils/routes';
import Divider from './../Base/Divider';
import Icon from './../Base/Icon';
import useToast from '../../hooks/useToast';
import { ERROR_MESSAGES } from '../../utils/messages';
import { useRecoilState } from 'recoil';
import { SelectOption, searchState } from '../../recoil/atoms/search';

const events = ['mousedown', 'touchstart'] as const;

const selectOptions: SelectOption[] = [
  {
    label: '그라운드',
    value: 'posts',
  },
  {
    label: '사용자',
    value: 'users',
  },
];

interface FormProps {
  children: ReactNode[];
  isFocus: boolean;
  visible?: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
const Searchbar = ({
  isMobile,
  setIsSearchbarShow,
}: {
  isMobile: boolean;
  setIsSearchbarShow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [search, setSearchState] = useRecoilState(searchState);
  const [isFocus, setIsFocus] = useState(false);
  const [visible, setVisible] = useState(isMobile ? false : true);
  const ref = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const { showToast } = useToast();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchState({
      ...search,
      value: e.target.value,
    });
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectOption = selectOptions.find(
      (option) => option.value === e.target.value
    );
    if (selectOption) {
      setSearchState({
        ...search,
        options: selectOption,
      });
    }
  };

  const handleReset = () => {
    setSearchState({
      ...search,
      value: '',
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.value) {
      return navigate(
        ROUTES.SEARCH_BY_QUERY(search.value, search.options.value)
      );
    }
    showToast({ message: ERROR_MESSAGES.SEARCH_INPUT });
  };

  const onInputBlur = () => setIsFocus(false);

  const onInputFocus = () => setIsFocus(true);

  const handleEvent = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!ref.current) return;
      if (!isMobile) return;
      if (!(e.target instanceof Node)) return;

      if (!ref.current.contains(e.target)) {
        setVisible(false);
        const timeout = setTimeout(() => {
          setIsSearchbarShow(false);
          clearTimeout(timeout);
        }, 300);
      }
    },
    [setIsSearchbarShow, isMobile]
  );

  useEffect(() => {
    setVisible(true);

    for (const event of events) {
      window.addEventListener(event, handleEvent);
    }

    const onScroll = () => {
      if (isMobile) {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      for (const event of events) {
        window.removeEventListener(event, handleEvent);
      }
    };
  }, [isMobile, handleEvent]);

  return (
    <Form ref={ref} isFocus={isFocus} visible={visible} onSubmit={onSubmit}>
      <Button>
        <Icon name="search" size={13} />
      </Button>
      <Input
        type="text"
        placeholder={search.options.label + '를 검색해보세요!'}
        value={search.value}
        onFocus={onInputFocus}
        onBlur={onInputBlur}
        onChange={onChange}
      />
      {search.value && (
        <Button type="button" onClick={handleReset}>
          <Icon name="close" size={12} />
        </Button>
      )}
      <Divider type="vertical" size={0} />
      <Select value={search.options.value} onChange={handleSelect}>
        {selectOptions.map(({ value, label }) => (
          <Option key={value} value={value}>
            {label}
          </Option>
        ))}
      </Select>
    </Form>
  );
};

const Form = styled.form<FormProps>`
  width: 100%;
  display: flex;
  background: ${COLORS.white};
  min-width: 250px;
  border-radius: 23.5px;
  align-items: center;
  justify-content: space-between;
  gap: 1.3rem;
  padding: 1.3rem 1.8rem;
  border: 1px solid;
  box-sizing: border-box;
  border-color: ${({ isFocus }) =>
    isFocus ? COLORS.lightBrown : COLORS.lightGray};
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
  color: ${COLORS.lightBrown};
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 1.6rem;
  padding: 0;

  ::placeholder {
    color: ${COLORS.brownGray};
    line-height: 1.3rem;
  }
`;

const Select = styled.select`
  border: none;
  font-size: 1.2rem;
  color: ${COLORS.lightBrown};
  outline: none;
`;

const Option = styled.option``;

export default Searchbar;
