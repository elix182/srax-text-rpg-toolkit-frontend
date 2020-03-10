<template>
  <v-app>
    <v-app-bar app color="primary" dark v-if="appBarVisible">
      <!-- <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
      </div>-->
      <v-btn color="secondary" text v-on:click="toggleNavigation" class="mr-2">
        <v-icon>menu</v-icon>
      </v-btn>
      <v-btn color="secondary" text v-on:click="goBack" class="mr-2">
        <v-icon>arrow_back</v-icon>
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
      ></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",

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
