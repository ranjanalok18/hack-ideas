const state = {
  isLogin: false,
  employeeId: null,
};

const actions = {
  loginEmployee({ commit }, { employeeId }) {
    commit("loginSuccess", { employeeId });
    return true;
  },
  logoutEmployee({ commit }) {
    commit("resetState");
  },
  clearState({ commit }) {
    commit("resetState");
  },
};

const mutations = {
  loginSuccess(state, employeeId) {
    state.isLogin = true;
    state.employeeId = employeeId;
  },
  loginFailure(state) {
    state.isLogin = false;
  },
};

const loginStore = {
  namespaced: true,
  state,
  actions,
  mutations,
};
export default loginStore;
