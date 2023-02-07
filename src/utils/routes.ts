const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  SEARCH: '/search',
  POSTS_NEW: '/posts/new',
  POSTS_DETAIL: '/posts/:postId',
  POSTS_EDIT: '/posts/:postId/edit',
  PROFILE_DETAIL: '/profile/:userId',
  PROFILE_ME: '/profile/me',
  PROFILE_ME_LIKES: '/profile/me/likes',
  PROFILE_ME_EDIT: '/profile/me/edit',
  NOTIFICATION: '/notifications',
  NOT_FOUND: '*',
  POSTS_BY_ID: (postId: string) => `/posts/${postId}`,
  PROFILE_BY_USER_ID: (userId: string) => `/profile/${userId}`,
  POSTS_EDIT_BY_ID: (postId: string) => `/posts/${postId}/edit`,
  SEARCH_BY_QUERY: (search: string, select: string) =>
    `/search?q=${search}&type=${select}`,
} as const;

export default ROUTES;
