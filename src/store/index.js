import Vue from "vue";
import Vuex from "vuex";
import LoginStore from "./LoginStore";
import ItemStore from "./ItemStore";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    LoginStore,
    ItemStore,
  },
});
