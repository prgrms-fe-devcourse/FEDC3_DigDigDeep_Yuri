import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { createPost, updatePost } from '../../utils/api/post';
import { COLOR } from '../../utils/color';
import { useNavigate } from 'react-router-dom';
import useToast from '../../hooks/useToast';
import { ROUTES } from '../../utils/routes';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../../utils/messages';

interface Props {
  text?: string;
  title?: string;
  body?: string;
  postId?: string;
  image?: Blob | null;
  imageId?: string;
}

const EditButton = ({ text, title, body, postId, image, imageId }: Props) => {
  const navigator = useNavigate();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createGround = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await createPost(
        JSON.stringify({ title, body }),
        image ?? null,
        '63b5b86c21d0f92287bd6474'
      );
      showToast({ message: SUCCESS_MESSAGES.CREATE_SUCCESS('그라운드가') });
      navigator(ROUTES.POSTS_BY_ID(data._id));
      setIsLoading(false);
    } catch {
      showToast({ message: ERROR_MESSAGES.CREATE_ERROR('그라운드') });
    }
  }, [navigator, showToast, title, body, image]);

  const updateGround = useCallback(async () => {
    try {
      if (postId) {
        setIsLoading(true);
        await updatePost(
          postId,
          JSON.stringify({ title, body }),
          image ?? null,
          '63b5b86c21d0f92287bd6474',
          imageId
        );
        showToast({ message: SUCCESS_MESSAGES.EDIT_SUCCESS('그라운드가') });
        navigator(ROUTES.HOME);
        setIsLoading(false);
      }
    } catch {
      showToast({ message: ERROR_MESSAGES.EDIT_ERROR('그라운드') });
    }
  }, [showToast, navigator, postId, title, body, image, imageId]);

  return (
    <Button
      disabled={isLoading}
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
  font-weight: 700;
  font-size: 1.3rem;
  letter-spacing: -0.01em;
  color: ${COLOR.white};
  padding: 1.1rem 2.2rem;
  width: fit-content;
  justify-self: right;
`;
