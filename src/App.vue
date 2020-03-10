<template>
  <v-app>
    <navbar v-if="showNavigation" @toggleNavEvent="toggleNavigation"></navbar>
    <v-app-bar app color="primary" dark v-if="appBarVisible" >
      <v-btn color="secondary" text v-on:click="toggleNavigation" class="mr-2">
        <v-icon>menu</v-icon>
      </v-btn>
      <v-toolbar-title class="ml-2">
        <span>{{componentTitle}}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <router-view
        @loggedInEvent="toggleAppBar"
        @loggedOutEvent="toggleAppBar"
        @componentChangedEvent="updateTitle"
        @goBackEvent="goBack"
      ></router-view>
    </v-content>
  </v-app>
</template>

<script>
import navbar from "./components/NavigationBar";
export default {
  name: "App",
  components: {
    navbar   
  },
  data: () => ({
    componentTitle: "",
    appBarVisible: false,
    showNavigation: false
  }),
  methods: {
    toggleAppBar: function(state) {
      this.appBarVisible = state;
    },
    updateTitle: function(title) {
      this.componentTitle = title;
    },
    toggleNavigation: function() {
      this.showNavigation = !this.showNavigation;
    },
    goBack: function() {
      this.$router.go(-1);
    }
  }
};
</script>
