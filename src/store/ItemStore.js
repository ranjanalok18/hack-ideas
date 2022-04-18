const state = {
  items: [
    {
      id: 1,
      title: "Ali Connors",
      content: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
      tagIds: [1, 2],
      upVote: 3,
      downVote: 0,
      createdDate: new Date("12-April-2022"),
    },
    {
      id: 2,
      title: "Trevor Hansen",
      content: `Have any ideas about what we should get Heidi for her birthday?`,
      tagIds: [2],
      upVote: 1,
      downVote: 0,
      createdDate: new Date("12-April-2022"),
    },
    {
      id: 3,
      title: "Recipe to try",
      content: `We should eat this: Grate, Squash, Corn, and tomatillo Tacos."`,
      tagIds: [1],
      upVote: 0,
      downVote: 0,
      createdDate: new Date("15-April-2022"),
    },
  ],
  tags: [
    {
      id: 1,
      tagName: "Feature",
    },
    {
      id: 2,
      tagName: "Tech",
    },
  ],
};
const getters = {
  getItems() {
    return state.items;
  },
  getTags() {
    return state.tags;
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
  sortBy({ commit }, payload) {
    console.log(commit);
    if (payload == "ASC") {
      state.items.sort((a, b) => a.upVote - b.upVote);
    } else if (payload == "DESC") {
      state.items.sort((a, b) => b.upVote - a.upVote);
    }
  },
  sortDate({ commit }, payload) {
    console.log(commit);
    if (payload == "ASC") {
      state.items.sort(
        (a, b) => new Date(a.createdDate) - new Date(b.createdDate)
      );
    } else if (payload == "DESC") {
      state.items.sort(
        (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
      );
    }
  },
};

const mutations = {
  updateItem(state, payload) {
    state.items[payload.index].content = payload.content;
    state.items[payload.index].tagIds = payload.tags;
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
