const state = {
  isLogin: false,
  employeeId: "",
};
const getters = {};
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
    localStorage.setItem("employeeId", employeeId.employeeId);
  },
  loginFailure(state) {
    state.isLogin = false;
  },
};

const loginStore = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
export default loginStore;
