import Icon from './../Base/Icon';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import COLORS from '../../utils/colors';
import EditButton from './../Post/EditButton';
interface Props {
  name?: string;
  isButton: boolean;
  buttonText?: string;
  title?: string;
  body?: string;
  postId?: string;
  image?: Blob | null;
  imageId?: string;
  children?: React.ReactNode;
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
  children,
}: Props) => {
  const navigate = useNavigate();

  return (
    <Container>
      <BackLink onClick={() => navigate(-1)}>
        <Icon name="back" width={20} height={16} />
      </BackLink>
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
      {children}
    </Container>
  );
};

export default DetailHeader;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  width: 35%;
  min-width: 350px;
  height: 6.4rem;
  align-items: center;
  justify-items: end;

  @media screen and (max-width: 767px) and (orientation: portrait) {
    width: 88%;
    min-width: 0;
    height: 6.1rem;
  }
`;

const BackLink = styled.button`
  cursor: pointer;
  font-size: 1.6rem;
  justify-self: start;
`;

const Title = styled.h3`
  font-weight: 700;
  font-size: 1.6rem;
  line-height: 1.9rem;
  letter-spacing: -0.01em;
  color: ${COLORS.text};
  justify-self: center;
  width: max-content;
`;
