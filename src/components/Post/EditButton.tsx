import { useCallback } from 'react';
import styled from 'styled-components';
import { createPost, updatePost } from '../../utils/api/post';
import COLORS from '../../utils/colors';
import { useNavigate } from 'react-router-dom';
import useToast from '../../hooks/useToast';
import ROUTES from '../../utils/routes';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../../utils/messages';
import { useSetRecoilState } from 'recoil';
import { loadingState } from '../../recoil/atoms/loading';

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
  const setLoading = useSetRecoilState(loadingState);

  const onClick = () => {
    if (!title || title.trim() === '') {
      showToast({ message: ERROR_MESSAGES.REQUIRE_INPUT('제목을') });
      return;
    }
    if (!body || body.trim() === '') {
      showToast({ message: ERROR_MESSAGES.REQUIRE_INPUT('내용을') });
      return;
    }
    text === 'CREATE' ? createGround() : updateGround();
  };

  const createGround = useCallback(async () => {
    try {
      setLoading(true);
      const data = await createPost(
        JSON.stringify({ title, body }),
        image ?? null,
        '63cab9b7bee10265b9975db0'
      );
      showToast({ message: SUCCESS_MESSAGES.CREATE_SUCCESS('그라운드가') });
      navigator(ROUTES.POSTS_BY_ID(data._id));
      setLoading(false);
    } catch {
      showToast({ message: ERROR_MESSAGES.CREATE_ERROR('그라운드') });
    }
  }, [setLoading, title, body, image, showToast, navigator]);

  const updateGround = useCallback(async () => {
    try {
      if (postId) {
        setLoading(true);
        await updatePost(
          postId,
          JSON.stringify({ title, body }),
          image ?? null,
          '63cab9b7bee10265b9975db0',
          image || image === null ? imageId : undefined
        );
        showToast({ message: SUCCESS_MESSAGES.EDIT_SUCCESS('그라운드가') });
        navigator(ROUTES.POSTS_BY_ID(postId));
        setLoading(false);
      }
    } catch {
      showToast({ message: ERROR_MESSAGES.EDIT_ERROR('그라운드') });
    }
  }, [postId, setLoading, title, body, image, imageId, showToast, navigator]);

  return <Button onClick={onClick}>{text}</Button>;
};

export default EditButton;

const Button = styled.button`
  background: ${COLORS.green};
  border-radius: 23.5px;
  font-weight: 700;
  font-size: 1.2rem;
  letter-spacing: -0.01em;
  color: ${COLORS.white};
  padding: 1.1rem 1.8rem;
  width: fit-content;
  justify-self: right;
  cursor: pointer;
`;
