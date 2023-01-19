export const ERROR_MESSAGES = {
  EDIT_ERROR: (type: string) => `${type} 수정에 실패했습니다.`,
  DELETE_ERROR: (type: string) => `${type} 삭제하는데 실패했습니다.`,
  CREATE_ERROR: (type: string) => `${type} 생성에 실패했습니다. `,
  GET_ERROR: (type: string) => `${type} 불러오던 중 문제가 발생했습니다.`,
  SERVER_ERROR: '서버와 통신 중 문제가 발생했습니다.',
  REQUIRE_LOGIN: '로그인 먼저 해주세요.',
  REQUIRE_INPUT: (type: string) => `${type} 먼저 작성해주세요.`,
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
