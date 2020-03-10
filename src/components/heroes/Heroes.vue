<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card justify="center">
          <v-list-item>
            <v-list-item-content>
              <v-container>
                <v-row>
                  <v-col cols="6">
                    <v-btn color="info"  dark v-on:click="goToRandomHero">Randomize</v-btn>
                  </v-col>
                  <v-col cols="6">
                    <v-btn style="float: right;" color="primary" dark v-on:click="goToCreateHero">Create</v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
    <v-row cols="12" justify="center">
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="heroes"
          :items-per-page="10"
          :search="search"
          class="elevation-1"
        >
          <template v-slot:item.race="{ item }">
            <div style="text-align: center;">{{ item.race.name }}</div>
          </template>
          <template v-slot:item.class="{ item }">
            <div style="text-align: center;">{{ item.hero_class.name }}</div>
          </template>
          <template v-slot:item.weapon="{ item }">
            <div style="text-align: center;">{{ item.weapon.name }}</div>
          </template>
          <template v-slot:item.action="{ item }">
            <v-icon small class="mr-2" @click="goToEditHero(item)" color="primary">edit</v-icon>
            <v-icon small @click="deleteHero(item)" color="danger">delete</v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "Heroes",
  created: function () {
    this.$emit("loggedInEvent", true);
    this.$emit("componentChangedEvent", 'Heroes');
  },
  mounted: function() {
    this.fetchHeroes();
  },
  data: () => ({
    heroes: [],
    search: "",
    headers: [
      {
        text: "First Name",
        align: "center",
        sortable: true,
        value: "firstName",
        width: "33.3333%"
      },
      {
        text: "Last Name",
        align: "center",
        sortable: true,
        value: "lastName"
      },
      { text: "Level", value: "level", align: "center", sortable: true },
      { text: "Race", value: "race", align: "center", sortable: false },
      { text: "Class", value: "class", align: "center", sortable: false },
      { text: "Weapon", value: "weapon", align: "center", sortable: false },
      { text: "Actions", value: "action", align: "center", sortable: false }
    ]
  }),
  methods: {
    fetchHeroes: function() {
      axios.get("api/hero").then(response => {
        this.heroes = response.data;
      });
    },
    goToCreateHero: function() {
      this.$router.push({ path: "heroes/create" });
    },
    goToEditHero: function(hero) {
      this.$router.push({ path: "heroes/edit/"+hero.id });
    },
    deleteHero: function(hero) {
      axios.delete("api/hero/"+hero.id).then(response => {
        console.log(response)
        this.fetchHeroes()
      });
    },
    goToRandomHero: function() {
      this.$router.push({ path: "heroes/random" });
    }
  }
};
</script>
