export const nickNameRule = {
  required: '닉네임을 입력해주세요.',
  pattern: {
    value: /^[A-Za-z0-9가-힣]{4,12}$/,
    message: '영어, 숫자, 한글만 입력 가능합니다. (2-8자리)',
  },
};

export const emailRule = {
  required: '이메일을 입력해주세요.',
  pattern: {
    value:
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
    message: '올바르지 않은 이메일 형식입니다.',
  },
};

export const passwordRule = {
  required: '비밀번호를 입력해주세요.',
  pattern: {
    value: /^(?=.*[a-zA-Z])(?=.*[0-9]).{4,12}$/,
    message: '영문, 숫자를 섞어 입력해주세요. (4-12자리)',
  },
};

export const confirmPasswordRule = (password: string) => {
  return {
    required: '비밀번호를 입력해주세요.',
    validate: (confirmPassword: string) =>
      confirmPassword === password || '비밀번호가 일치하지 않습니다.',
  };
};
