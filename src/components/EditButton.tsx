import { useCallback } from 'react';
import styled from 'styled-components';
import { createPost } from '../utils/post';
import { COLOR } from '../utils/color';
import { useNavigate } from 'react-router-dom';

interface Props {
  text?: string;
  title?: string;
  body?: string;
}

const EditButton = ({ text, title, body }: Props) => {
  const navigator = useNavigate();
  const createGround = useCallback(async () => {
    try {
      const data = await createPost(
        JSON.stringify({ title, body }),
        null,
        '63b5b86c21d0f92287bd6474'
      );
      navigator(`/posts/${data._id}`);
    } catch {
      alert('그라운드 생성에 실패했습니다.');
    }
  }, [navigator, title, body]);
  return (
    <Button onClick={() => (text === 'CREATE' ? createGround() : '')}>
      {text}
    </Button>
  );
};

export default EditButton;

const Button = styled.button`
  background: ${COLOR.green};
  border-radius: 23.5px;
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 1rem;
  letter-spacing: -0.01em;
  color: ${COLOR.white};
  padding: 1.1rem 2.2rem;
  width: fit-content;
  justify-self: right;
`;
