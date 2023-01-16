import { useState } from 'react';

const usePost = () => {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');

  // const [errors, setErrors] = useState({});
  // const [isLoading, setIsLoading] = useState(false);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  const handleChangeBody = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  // const handleSubmit = async (e) => {
  //   setIsLoading(true);
  //   e.preventDefault();
  //   const newErrors = validate(values);
  //   if (Object.keys(newErrors).length === 0) {
  //     await onSubmit();
  //   }
  // setErrors(newErrors);
  // setIsLoading(false);
  // };

  return {
    title,
    body,
    setTitle,
    setBody,
    handleChangeTitle,
    handleChangeBody,
  };
};

export default usePost;
