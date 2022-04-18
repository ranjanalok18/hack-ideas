const state = {
  items: [
    {
      id: 1,
      title: "Ali Connors",
      content: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
      upVote: 0,
      downVote: 0,
    },
    {
      id: 2,
      title: "Trevor Hansen",
      content: `Have any ideas about what we should get Heidi for her birthday?`,
      upVote: 0,
      downVote: 0,
    },
    {
      id: 3,
      title: "Recipe to try",
      content: `We should eat this: Grate, Squash, Corn, and tomatillo Tacos."`,
      upVote: 0,
      downVote: 0,
    },
  ],
};
const getters = {
  getItems() {
    return state.items;
  },
};
const actions = {
  updateItemStore({ commit }, payload) {
    commit("updateItem", payload);
  },
  upVoteStore({ commit }, payload) {
    commit("upVote", payload);
  },
  downVoteStore({ commit }, payload) {
    commit("downVote", payload);
  },
  newItemStore({ commit }, payload) {
    commit("newItem", payload);
  },
};

const mutations = {
  updateItem(state, payload) {
    state.items[payload.index].content = payload.content;
  },

  upVote(state, payload) {
    state.items[payload.index].upVote += 1;
  },
  downVote(state, payload) {
    state.items[payload.index].downVote += 1;
  },
  newItem(state, payload) {
    state.items.push(payload.newContent);
  },
};

const itemStore = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

export default itemStore;
