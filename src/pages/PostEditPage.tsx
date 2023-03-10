import styled from 'styled-components';
import DetailHeader from '../components/Header/DetailHeader';
import PostEdit from '../components/Post/PostEdit';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import usePost from '../hooks/usePost';

const PostEditPage = () => {
  const { postId } = useParams<string>();
  const [hasId, setHasId] = useState<boolean>(false);
  const {
    name,
    title,
    body,
    image,
    imageId,
    setTitle,
    setBody,
    setImage,
    setImageId,
    handleChangeTitle,
    handleChangeBody,
    handleChangeImage,
  } = usePost();

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
        postId={postId}
        image={image}
        imageId={imageId}
      />
      <PostEdit
        name={name}
        postId={postId}
        hasId={hasId}
        title={title}
        body={body}
        image={image}
        setTitle={setTitle}
        setBody={setBody}
        setImage={setImage}
        setImageId={setImageId}
        handleTitle={handleChangeTitle}
        handleBody={handleChangeBody}
        handleImage={handleChangeImage}
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
