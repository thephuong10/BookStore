const accountSelector = {
  getToken: (state) => state.account.token,
  getLoading: (state) => state.account.loading,
  getError: (state) => state.account.error,
  getInfo: (state) => state.account.info,
};

export default accountSelector;
