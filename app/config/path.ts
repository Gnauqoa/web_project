export const PATH_PAGE = {
  root: "/",
  login: "/auth/login",
  register: "/auth/register",
  search: "/search",
  user: {
    root: (userId: string) => `/users/${userId}/questions`,
    question: (userId: string) => `/users/${userId}/questions`,
    answer: (userId: string) => `/users/${userId}/answers`,
  },
};
