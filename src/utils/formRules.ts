import { LIMITED_FILE_SIZE } from './constants';
import { FORM_RULE_MESSAGE } from './messages';

export const SIGN_UP_RULES = {
  nickname: {
    required: FORM_RULE_MESSAGE.NICKNAME_REQUIRED,
    pattern: {
      value: /^[A-Za-z0-9가-힣]{2,12}$/,
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
      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/,
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
} as const;

export const LOGIN_RULES = {
  email: {
    required: FORM_RULE_MESSAGE.EMAIL_REQUIRED,
  },

  password: {
    required: FORM_RULE_MESSAGE.PASSWORD_REQUIRED,
  },
} as const;

export const PROFILE_EDIT_RULES = {
  nickname: {
    pattern: {
      value: /^[A-Za-z0-9가-힣]{2,12}$/,
      message: FORM_RULE_MESSAGE.NICKNAME_PATTERN,
    },
  },

  password: {
    pattern: {
      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/,
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
} as const;

export const checkFileSize = (fileSize: number) => {
  return fileSize <= LIMITED_FILE_SIZE;
};
