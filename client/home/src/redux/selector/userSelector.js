const userSelector = {
  getToken: (state) => state.user.auth.token,
  getAuth: (state) => state.user.auth,
  getInfo: (state) => state.user.info,
};
export default userSelector;
