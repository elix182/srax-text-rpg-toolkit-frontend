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
                    <v-btn color="info"  dark v-on:click="goToRandomMonster">Randomize</v-btn>
                  </v-col>
                  <v-col cols="6">
                    <v-btn style="float: right;" color="primary" dark v-on:click="goToCreateMonster">Create</v-btn>
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
          :items="monsters"
          :items-per-page="10"
          :search="search"
          class="elevation-1"
        >
          <template v-slot:item.race="{ item }">
            <div style="text-align: center;">{{ item.race.name }}</div>
          </template>
          <template v-slot:item.action="{ item }">
            <v-icon small class="mr-2" @click="goToEditMonster(item)" color="primary">edit</v-icon>
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
  name: "Monsters",
  created: function () {
    this.$emit("loggedInEvent", true);
    this.$emit("componentChangedEvent", 'Monsters');
  },
  mounted: function() {
    this.fetchMonsters();
  },
  data: () => ({
    monsters: [],
    search: "",
    headers: [
      {
        text: "Name",
        align: "center",
        sortable: true,
        value: "name",
        width: "33.3333%"
      },
      { text: "Race", value: "race", align: "center", sortable: false },
      { text: "Level", value: "level", align: "center", sortable: true },
      { text: "Actions", value: "action", align: "center", sortable: false }
    ]
  }),
  methods: {
    fetchMonsters: function() {
      axios.get("api/monster").then(response => {
        this.monsters = response.data;
      });
    },
    goToCreateMonster: function() {
      this.$router.push({ path: "monsters/create" });
    },
    goToEditMonster: function(hero) {
      this.$router.push({ path: "monsters/edit/"+hero.id });
    },
    deleteMonster: function(hero) {
      axios.delete("api/monster/"+hero.id).then(response => {
        console.log(response)
        this.fetchHeroes()
      });
    },
    goToRandomMonster: function() {
      this.$router.push({ path: "monsters/random" });
    }
  }
};
</script>
