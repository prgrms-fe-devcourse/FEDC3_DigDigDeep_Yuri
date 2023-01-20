export const ERROR_MESSAGES = {
  EDIT_ERROR: (type: string) => `${type} 수정에 실패했습니다.`,
  DELETE_ERROR: (type: string) => `${type} 삭제하는데 실패했습니다.`,
  CREATE_ERROR: (type: string) => `${type} 생성에 실패했습니다. `,
  GET_ERROR: (type: string) => `${type} 불러오던 중 문제가 발생했습니다.`,
  SERVER_ERROR: '서버와 통신 중 문제가 발생했습니다.',
  REQUIRE_LOGIN: '로그인이 필요합니다.',
  REQUIRE_INPUT: (type: string) => `${type} 작성해주세요.`,
  SEARCH_INPUT: '검색어를 입력해주세요.',
  MAX_SIZE_IS_10MB: '파일 크기는 10MB를 넘길 수 없습니다.',
};

export const CONFIRM_MESSAGES = {
  DELETE_CONFIRM: '정말로 삭제하시겠습니까?',
  LOGOUT_CONFIRM: '정말로 로그아웃 하시겠습니까?',
};

export const SUCCESS_MESSAGES = {
  DELETE_SUCCESS: (type: string) => `${type} 삭제되었습니다.`,
  EDIT_SUCCESS: (type: string) => `${type} 수정되었습니다.`,
  CREATE_SUCCESS: (type: string) => `${type} 생성되었습니다.`,
  SIGNUP_SUCCESS: '가입되었습니다.',
  SHARE_SUCCESS: '클립보드에 저장되었습니다',
  LIKE_SUCCESS: '좋아요를 눌렀습니다.',
  UNLIKE_SUCCESS: '좋아요를 취소했습니다.',
  FOLLOW_SUCCESS: '팔로우 했습니다.',
  UNFOLLOW_SUCCESS: '언팔로우 했습니다.',
  CREATE_COMMENT_SUCCESS: '디깅 +1',
  DELETE_COMMENT_SUCCESS: '디깅 -1',
};

export const FORM_RULE_MESSAGE = {
  NICKNAME_REQUIRED: '닉네임을 입력해주세요.',
  NICKNAME_PATTERN: '영어, 숫자, 한글만 입력 가능합니다. (2-8자리)',
  EMAIL_REQUIRED: '이메일을 입력해주세요.',
  EMAIL_PATTERN: '올바르지 않은 이메일 형식입니다.',
  PASSWORD_REQUIRED: '비밀번호를 입력해주세요.',
  PASSWORD_PATTERN: '영문과 숫자를 조합해주세요. (6-12자리)',
  CONFIRM_PASSWORD_VALIDATE: '비밀번호가 일치하지 않습니다.',
  EMAIL_ALREADY_IN_USE: '이미 사용중인 이메일입니다.',
  INCORRECT_LOGIN_INFO:
    '이메일 또는 비밀번호를 잘못 입력했습니다.\n입력하신 내용을 다시 확인해주세요.',
};
