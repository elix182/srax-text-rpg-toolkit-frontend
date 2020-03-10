<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/doom-imp.png')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to RPG Toolkit
        </h1>

        <p class="subheading font-weight-regular">
          This is the SRAX Test for young and talented developers!
        </p>
        <v-btn color="primary" dark v-on:click="goToDashboard">Enter</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'LandingPage',
    created: function () {
      this.$emit("loggedOutEvent", false);
    },
    data: () => ({
    }),
    methods: {
      goToDashboard: function(){
        this.$emit("loggedInEvent", true);
        this.$router.replace({ path: 'dashboard' })
      }
    }
  }
</script>
