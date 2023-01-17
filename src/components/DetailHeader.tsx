import Icon from './Base/Icon';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { COLOR } from '../utils/color';
import EditButton from './EditButton';
interface Props {
  name: string;
  isButton: boolean;
  buttonText?: string;
  title?: string;
  body?: string;
  postId?: string;
  image?: Blob | null;
  imageId?: string;
  route?: string;
}

const DetailHeader = ({
  name,
  isButton,
  buttonText,
  title,
  body,
  postId,
  image,
  imageId,
  route,
}: Props) => {
  return (
    <Container>
      <BackHomeLink to={route ?? '/'}>
        <Icon name="back" width={20} height={16} />
      </BackHomeLink>
      <Title>{name}</Title>
      {isButton && (
        <EditButton
          text={buttonText}
          title={title}
          body={body}
          postId={postId}
          image={image}
          imageId={imageId}
        />
      )}
    </Container>
  );
};

export default DetailHeader;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr;
  padding: 2rem 0;
  width: 50%;
  min-width: 767px;
  align-items: center;
  @media screen and (max-width: 767px) and (orientation: portrait) {
    width: 86%;
    padding: 1.7rem 0;
    min-width: 86%;
  }
`;

const BackHomeLink = styled(Link)`
  font-size: 1.6rem;
`;

const Title = styled.h3`
  font-weight: 700;
  font-size: 1.6rem;
  line-height: 1.9rem;
  letter-spacing: -0.01em;
  color: ${COLOR.text};
  justify-self: center;
  width: max-content;
`;
