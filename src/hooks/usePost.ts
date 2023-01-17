import { useState } from 'react';

const usePost = () => {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [image, setImage] = useState<Blob>();

  const [imageId, setImageId] = useState<string>('');

  const [isLoading, setIsLoading] = useState(false);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  const handleChangeBody = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsLoading(true);
    setImage(file);
    try {
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    title,
    body,
    image,
    imageId,
    isLoading,
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
