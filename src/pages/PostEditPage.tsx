import styled from 'styled-components';
import DetailHeader from '../components/DetailHeader';
import PostEdit from '../components/PostEdit';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

type PostId = string;

const PostEditPage = () => {
  const { postId } = useParams<PostId>();
  const [hasId, setHasId] = useState<boolean>(false);

  useEffect(() => {
    if (postId) setHasId(true);
  }, [postId]);

  return (
    <Container>
      <DetailHeader
        title="그라운드"
        isButton={true}
        buttonText={postId ? 'DONE' : 'CREATE'}
      />
      <PostEdit hasId={hasId} />
    </Container>
  );
};

export default PostEditPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
