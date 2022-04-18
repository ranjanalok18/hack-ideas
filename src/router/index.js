import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/home",
      name: "ChallengeList",
      component: () => import("../components/ChallengeList.vue"),
    },

    {
      path: "/",
      name: "LoginView",
      component: () => import("../components/LoginView.vue"),
    },
  ],
});

export default router;
