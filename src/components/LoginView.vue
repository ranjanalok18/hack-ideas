<template>
  <div class="mt-12" id="inspire">
    <v-container fluid fill-height align-center justify-center>
      <v-card class="elevation-12">
        <v-toolbar dark color="red">
          <v-toolbar-title>Sign In</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" @submit.prevent="loginSubmit">
            <v-text-field
              name="login"
              v-model="employeeId"
              label="Employee Id"
              type="text"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click.prevent="loginSubmit" color="green">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "LoginView",

  data() {
    return {
      employeeId: "",
    };
  },
  methods: {
    ...mapActions({
      loginEmployee: "LoginStore/loginEmployee",
      logoutEmployee: "LoginStore/logoutEmployee",
    }),
    loginSubmit() {
      const employeeId = this.employeeId;
      if (employeeId !== "") {
        this.loginEmployee({ employeeId }).then(() => {
          this.$router.push("/home");
        });
      } else {
        alert("Please fill Employee Id");
        this.logoutEmployee();
      }
    },
  },
};
</script>
