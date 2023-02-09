import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import COLORS from '../../utils/colors';
import { queryLowImage } from '../../utils/image';
import ROUTES from '../../utils/routes';
import Image from '../Base/Image';

interface PostContentProps {
  _id: string;
  title: string;
  image?: string;
  isDetailPage?: boolean;
  isMyLikes?: boolean;
}

interface PostDetailProps {
  isDetailPage?: boolean;
  isMyLikes?: boolean;
}

interface ImageContainerProps {
  width?: string;
  height?: string;
  isMyLikes?: boolean;
}

const PostContent = ({
  _id,
  title,
  image,
  isDetailPage,
  isMyLikes,
}: PostContentProps) => {
  const navigate = useNavigate();
  const postContent = JSON.parse(title);

  const toPostDetail = () => {
    navigate(ROUTES.POSTS_BY_ID(_id));
  };

  if (isDetailPage) {
    return (
      <Section>
        <Title isDetailPage={isDetailPage}>{postContent.title}</Title>
        {image && (
          <ImageContainer width="100%">
            <Image
              src={queryLowImage(image, 'postDetail')}
              alt="post-image"
              objectFit="contain"
            />
          </ImageContainer>
        )}
        <Text isDetailPage={isDetailPage}>{postContent.body}</Text>
      </Section>
    );
  }

  if (isMyLikes) {
    return (
      <PostWrapper onClick={toPostDetail}>
        <Title isMyLikes={isMyLikes}>{postContent.title}</Title>
        <Text>{postContent.body}</Text>
      </PostWrapper>
    );
  }

  return (
    <Section onClick={toPostDetail}>
      <Title isDetailPage={isDetailPage}>{postContent.title}</Title>
      {image && (
        <ImageContainer width="100%">
          <Image
            src={queryLowImage(image, 'postDetail')}
            alt="post-image"
            objectFit="contain"
          />
        </ImageContainer>
      )}
      <Text isDetailPage={isDetailPage}>{postContent.body}</Text>
    </Section>
  );
};

export default PostContent;

const Section = styled.div`
  background-color: ${COLORS.white};
  padding: 1rem 2rem;

  @media screen and (max-width: 767px) and (orientation: portrait) {
    padding: 1rem 1.5rem;
  }
`;

const PostWrapper = styled.div``;

const shortenContent = `
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Title = styled.span<PostDetailProps>`
  font-weight: 700;
  font-size: 1.8rem;
  line-height: 2.5rem;
  letter-spacing: -0.01em;
  color: ${COLORS.brown};
  margin: ${({ isMyLikes }) => (isMyLikes ? '' : '0.5rem 0 1.5rem')};
  word-break: break-all;
  ${({ isDetailPage }) => (isDetailPage ? '' : shortenContent)};
`;

const Text = styled.div<PostDetailProps>`
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 2rem;
  margin: 1rem 0 0.5rem;
  letter-spacing: -0.01em;
  color: ${COLORS.brown};
  word-break: break-all;
  white-space: pre-wrap;
  ${({ isDetailPage }) => (isDetailPage ? '' : shortenContent)};
`;

const ImageContainer = styled.div<ImageContainerProps>`
  position: relative;
  display: inline-block;
  overflow: hidden;
  width: ${({ width }) => width ?? '12rem'};
  min-width: 12rem;
  aspect-ratio: 1 / 1;
  background-color: #fafafa;
  border-radius: ${({ isMyLikes }) => (isMyLikes ? 0 : '15px')};
`;
