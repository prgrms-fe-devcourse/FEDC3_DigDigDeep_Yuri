import { useCallback } from 'react';
import styled from 'styled-components';
import { createPost, updatePost } from '../utils/post';
import { COLOR } from '../utils/color';
import { useNavigate } from 'react-router-dom';
import useToast from '../hooks/useToast';

interface Props {
  text?: string;
  title?: string;
  body?: string;
  postId?: string;
}

const EditButton = ({ text, title, body, postId }: Props) => {
  const navigator = useNavigate();
  const { showToast } = useToast();

  const createGround = useCallback(async () => {
    try {
      const data = await createPost(
        JSON.stringify({ title, body }),
        null,
        '63b5b86c21d0f92287bd6474'
      );
      showToast({ message: '그라운드를 생성했습니다.' });
      navigator(`/posts/${data._id}`);
    } catch {
      showToast({ message: '그라운드 생성에 실패했습니다.' });
    }
  }, [navigator, showToast, title, body]);

  const updateGround = useCallback(async () => {
    try {
      if (postId) {
        await updatePost(
          postId,
          JSON.stringify({ title, body }),
          null,
          '63b5b86c21d0f92287bd6474'
        );
        showToast({ message: '그라운드를 수정했습니다.' });
        navigator(`/`);
      }
    } catch {
      showToast({ message: '그라운드 수정에 실패했습니다.' });
    }
  }, [showToast, navigator, postId, title, body]);

  return (
    <Button
      onClick={() => (text === 'CREATE' ? createGround() : updateGround())}
    >
      {text}
    </Button>
  );
};

export default EditButton;

const Button = styled.button`
  background: ${COLOR.green};
  border-radius: 23.5px;
  font-weight: 600;
  font-size: 1rem;
  letter-spacing: -0.01em;
  color: ${COLOR.white};
  padding: 1.1rem 2.2rem;
  width: fit-content;
  justify-self: right;
`;
