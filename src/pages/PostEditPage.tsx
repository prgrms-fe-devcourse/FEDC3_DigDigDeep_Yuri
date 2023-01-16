import styled from 'styled-components';
import DetailHeader from '../components/DetailHeader';
import PostEdit from '../components/PostEdit';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import usePost from '../hooks/usePost';

type PostId = string;

const PostEditPage = () => {
  const { postId } = useParams<PostId>();
  const [hasId, setHasId] = useState<boolean>(false);
  const { title, body, handleChangeTitle, handleChangeBody } = usePost();

  useEffect(() => {
    if (postId) setHasId(true);
  }, [postId]);

  return (
    <Container>
      <DetailHeader
        name="그라운드"
        isButton={true}
        buttonText={postId ? 'DONE' : 'CREATE'}
        title={title}
        body={body}
      />
      <PostEdit
        hasId={hasId}
        handleTitle={handleChangeTitle}
        handleBody={handleChangeBody}
      />
    </Container>
  );
};

export default PostEditPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
