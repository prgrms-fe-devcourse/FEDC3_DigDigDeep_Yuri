import { useState } from 'react';
import { checkFileSize } from '../utils/formRules';
import { ERROR_MESSAGES } from '../utils/messages';
import useToast from './useToast';

const usePost = () => {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [image, setImage] = useState<Blob | null>();

  const [imageId, setImageId] = useState<string>('');

  const [name, setName] = useState<string>('');

  const { showToast } = useToast();

  const handleChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  const handleChangeBody = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!checkFileSize(file.size)) {
      showToast({ message: ERROR_MESSAGES.MAX_SIZE_IS_10MB });
      return;
    }
    setImage(file);
    setName(file.name);
    try {
    } catch (error) {
      console.error(error);
    }
  };

  return {
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
  };
};

export default usePost;
