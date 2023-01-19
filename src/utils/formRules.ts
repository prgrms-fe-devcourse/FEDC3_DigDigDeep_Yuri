export const FORM_RULE_MESSAGE = {
  NICKNAME_REQUIRED: '닉네임을 입력해주세요.',
  NICKNAME_PATTERN: '영어, 숫자, 한글만 입력 가능합니다. (2-8자리)',
  EMAIL_REQUIRED: '이메일을 입력해주세요.',
  EMAIL_PATTERN: '올바르지 않은 이메일 형식입니다.',
  PASSWORD_REQUIRED: '비밀번호를 입력해주세요.',
  PASSWORD_PATTERN: '영문, 숫자를 섞어 입력해주세요. (4-12자리)',
  CONFIRM_PASSWORD_VALIDATE: '비밀번호가 일치하지 않습니다.',
  EMAIL_ALREADY_IN_USE: '이미 사용중인 이메일입니다.',
  INCORRECT_LOGIN_INFO:
    '이메일 또는 비밀번호를 잘못 입력했습니다.\n입력하신 내용을 다시 확인해주세요.',
};

export const SIGN_UP_RULES = {
  nickname: {
    required: FORM_RULE_MESSAGE.NICKNAME_REQUIRED,
    pattern: {
      value: /^[A-Za-z0-9가-힣]{4,12}$/,
      message: FORM_RULE_MESSAGE.NICKNAME_PATTERN,
    },
  },

  email: {
    required: FORM_RULE_MESSAGE.EMAIL_REQUIRED,
    pattern: {
      value:
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
      message: FORM_RULE_MESSAGE.EMAIL_PATTERN,
    },
  },

  password: {
    required: FORM_RULE_MESSAGE.PASSWORD_REQUIRED,
    pattern: {
      value: /^(?=.*[a-zA-Z])(?=.*[0-9]).{4,12}$/,
      message: FORM_RULE_MESSAGE.PASSWORD_PATTERN,
    },
  },

  confirmPassword: (password: string) => {
    return {
      required: FORM_RULE_MESSAGE.PASSWORD_REQUIRED,
      validate: (confirmPassword: string) =>
        confirmPassword === password ||
        FORM_RULE_MESSAGE.CONFIRM_PASSWORD_VALIDATE,
    };
  },
};

export const LOGIN_RULES = {
  email: {
    required: FORM_RULE_MESSAGE.EMAIL_REQUIRED,
  },

  password: {
    required: FORM_RULE_MESSAGE.PASSWORD_REQUIRED,
  },
};

export const PROFILE_EDIT_RULES = {
  nickname: {
    pattern: {
      value: /^[A-Za-z0-9가-힣]{4,12}$/,
      message: FORM_RULE_MESSAGE.NICKNAME_PATTERN,
    },
  },

  password: {
    pattern: {
      value: /^(?=.*[a-zA-Z])(?=.*[0-9]).{4,12}$/,
      message: FORM_RULE_MESSAGE.PASSWORD_PATTERN,
    },
  },

  confirmPassword: (password: string) => {
    return {
      validate: (confirmPassword?: string) =>
        confirmPassword === password ||
        FORM_RULE_MESSAGE.CONFIRM_PASSWORD_VALIDATE,
    };
  },
};
