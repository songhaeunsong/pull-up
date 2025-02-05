export const AuthStore = (() => {
  let accessToken: string | null;

  return {
    getAccessToken: () => accessToken,
    setAccessToken: (token: string) => {
      accessToken = token;
    },
    clearAccessToken: () => {
      accessToken = null;
    },
  };
})();
