import styled from 'styled-components';
import { COLOR } from '../../utils/color';
import EditButton from './../Post/EditButton';
import BackButton from '../Button/BackButton';
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
  return (
    <Container>
      <BackButton />
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
  grid-template-columns: 1fr 1.5fr 1fr;
  padding: 2rem 0;
  width: 50%;
  min-width: calc(767px - 14%);
  align-items: center;
  justify-items: end;
  @media screen and (max-width: 767px) and (orientation: portrait) {
    width: 86%;
    padding: 1.7rem 0;
    min-width: 86%;
  }
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
