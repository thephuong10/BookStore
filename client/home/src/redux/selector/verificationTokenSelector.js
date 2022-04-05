const verificationTokenSelector = {
  confirm: {
    getDisable: (state) => state.verificationToken.confirm.disable,
    getExpried: (state) => state.verificationToken.confirm.expried,
  },
  getToken: (state) => state.verificationToken.token,
  sendTo: {
    getDisable: (state) => state.verificationToken.sendTo.disable,
    getCount: (state) => state.verificationToken.sendTo.count,
  },
};
export default verificationTokenSelector;
