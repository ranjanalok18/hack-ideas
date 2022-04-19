const state = {
  //Storing the static items in the store
  items: [
    {
      id: 1, // Default id for the hack idea
      title: "Ali Connors", // Title for the idea
      content: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
      tagIds: [1, 2], // Tag selected for the idea
      upVote: ["2"], // Up vote on the idea {{ Array of user }}
      downVote: [], // Down vote on the idea {{ Array of user }}
      upVoted: true,
      downVoted: false,
      createdDate: new Date("12-April-2022"), // Created Date
      createdBy: "ABC",
    },
    {
      id: 2,
      title: "Trevor Hansen",
      content: `Have any ideas about what we should get Heidi for her birthday?`,
      tagIds: [2],
      upVote: ["1"],
      upVoted: false,
      downVoted: false,
      downVote: [],
      createdDate: new Date("12-April-2022"),
      createdBy: "XYZ",
    },
    {
      id: 3,
      title: "Recipe to try",
      content: `We should eat this: Grate, Squash, Corn, and tomatillo Tacos."`,
      tagIds: [1],
      upVote: [],
      downVote: ["1"],
      upVoted: false,
      downVoted: true,
      createdDate: new Date("15-April-2022"),
      createdBy: "ALOK",
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
  // Sorting Based on Up Vote
  sortBy({ commit }, payload) {
    console.log(commit);
    if (payload == "ASC") {
      state.items.sort((a, b) => a.upVote - b.upVote);
    } else if (payload == "DESC") {
      state.items.sort((a, b) => b.upVote - a.upVote);
    }
  },
  // Sorting Based on Created Date
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
    if (
      !state.items[payload.index].upVote.includes(payload.empId) &&
      !state.items[payload.index].downVote.includes(payload.empId)
    ) {
      state.items[payload.index].upVote.push(payload.empId);
      state.items[payload.index].upVoted = true;
    }
  },
  downVote(state, payload) {
    if (
      !state.items[payload.index].downVote.includes(payload.empId) &&
      !state.items[payload.index].upVote.includes(payload.empId)
    ) {
      state.items[payload.index].downVote.push(payload.empId);
      state.items[payload.index].downVoted = true;
    }
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
