import styled from 'styled-components';
import DetailHeader from '../components/DetailHeader';
import PostEdit from '../components/PostEdit';

const PostEditPage = () => {
  return (
    <Container>
      <DetailHeader title="그라운드" isButton={true} buttonText="DONE" />
      <PostEdit />
    </Container>
  );
};

export default PostEditPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// import { useParams } from 'react-router-dom';

// type PostId = string;

// const PostEdit = () => {
//   const { postId } = useParams<PostId>();
//   return <div>PostEdit, postId: {postId}</div>;
// };

// export default PostEdit;
