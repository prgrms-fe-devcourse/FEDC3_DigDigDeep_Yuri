type QueryType = 'postDetail' | 'postList' | 'postAuthor' | 'profile';

const imageQuery = {
  postDetail: '/upload/q_auto:best/f_auto/',
  postList: '/upload/q_auto:low/f_auto/',
  postAuthor: '/upload/q_10/f_auto/',
  profile: '/upload/q_10/f_auto/',
};

export const queryLowImage = (src: string, query: QueryType) => {
  return src.replace('/upload/', imageQuery[query]);
};
