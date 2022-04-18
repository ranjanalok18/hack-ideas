<template>
  <v-app>
    <v-main>
      <!-- <LoginView /> -->
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";
// import LoginView from "./components/LoginView";

export default {
  name: "App",

  components: {
    // HelloWorld,
    // LoginView,
  },

  data: () => ({
    //
  }),
};
</script>
