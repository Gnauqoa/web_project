export const PATH_PAGE = {
  root: "/",
  login: "/auth/login",
  register: "/auth/register",
  user: {
    root: (userId: string) => `/users/${userId}/question`,
    question: (userId: string) => `/users/${userId}/questions`,
    answer: (userId: string) => `/users/${userId}/answers`,
  },
};
