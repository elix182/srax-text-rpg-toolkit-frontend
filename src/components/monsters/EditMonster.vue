<template>
  <v-container>
    <v-row no-gutters justify="center">
      <v-col cols="6">
        <v-card>
          <v-card-title>Monster Information</v-card-title>
          <v-list-item>
            <v-list-item-content>
              <v-container>
                <v-row>
                  <v-text-field v-model="name" label="Name"></v-text-field>
                </v-row>
                <v-row>
                  <v-select
                    v-model="race"
                    :items="races"
                    item-text="name"
                    item-value="id"
                    :menu-props="{ maxHeight: '400' }"
                    label="Race"
                    hint="Pick a Race for your monster"
                    persistent-hint
                    v-on:change="fetchRaceAbilities"
                  ></v-select>
                </v-row>
                <v-row>
                  <v-select
                    v-model="selectedAbilities"
                    :items="abilities"
                    item-text="name"
                    item-value="id"
                    :menu-props="{ maxHeight: '400' }"
                    label="Abilities"
                    hint="Pick some abilities for your monster"
                    persistent-hint
                    multiple
                  ></v-select>
                </v-row>
              </v-container>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-title>Monster Stats</v-card-title>
          <v-list-item>
            <v-list-item-content>
              <v-container>
                <v-row>
                  <v-col cols="4">
                    <p v-html="strRoll"></p>
                    <v-text-field v-model="str" label="STR" readonly></v-text-field>
                    <v-btn color="primary" dark v-on:click="roll('STR')">Roll</v-btn>
                  </v-col>
                  <v-col cols="4">
                    <p v-html="dexRoll"></p>
                    <v-text-field v-model="dex" label="DEX" readonly></v-text-field>
                    <v-btn color="primary" dark v-on:click="roll('DEX')">Roll</v-btn>
                  </v-col>
                  <v-col cols="4">
                    <p v-html="intRoll"></p>
                    <v-text-field v-model="int" label="INT" readonly></v-text-field>
                    <v-btn color="primary" dark v-on:click="roll('INT')">Roll</v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
    <!-- Monster picture editor -->
    <v-row>
      <v-col>
        <v-card>
          <v-list-item>
            <v-list-item-content>
              <v-container>
                <v-row>
                  <v-col>
                    <v-row v-for="(row, y) in picture" v-bind:key="y">
                      <div v-for="(pixel, x) in row" v-bind:key="x" class="square" v-bind:style="{ 'background-color': picture[x][y] }" v-on:click="setGridColor(x, y)">
                      </div>
                    </v-row>
                  </v-col>
                  <v-col>
                    <v-color-picker v-model="color"></v-color-picker>
                  </v-col>
                </v-row>
              </v-container>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
    <!-- /Monster picture editor -->
    <v-row>
        <v-col>
        <v-card>
          <v-list-item>
            <v-list-item-content>
              <v-container>
                <v-btn color="primary" dark v-on:click="updateMonster">Update</v-btn>
                <v-btn color="accent" dark v-on:click="goBack">Cancel</v-btn>
              </v-container>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
  .square {
    height: 25pt;
    width: 25pt;
    border-color: #000000;
    border-style: solid;
    border-width: 1pt;
  }
</style>

<script>
import axios from "axios";
export default {
  name: "EditMonster",
  created: function () {
    this.$emit("loggedInEvent", true);
    this.$emit("componentChangedEvent", 'Edit Monster');
  },
  mounted: function() {
    let self = this;
    self.monsterId = self.$route.params.id;
    this.picture = [];
    for(let i = 0; i < 8; ++i){
      this.picture[i] = []
      for(let j = 0; j < 8; ++j){
        this.picture[i][j] = '#FFFFFF';
      }
    }
    self.fetchMonster(self.monsterId);
  },
  data: () => ({
    monsterId: 0,
    races: [],
    abilities: [],
    name: "",
    race: null,
    selectedAbilities: [],
    str: "",
    strRoll: "",
    dex: "",
    dexRoll: "",
    int: "",
    intRoll: "",
    picture: [],
    color:'#000000'
  }),
  methods: {
    goBack: function(){
        this.$router.go(-1);
    },
    setGridColor: function(x, y){
      this.picture[x][y] = this.color;
      this.$forceUpdate();
    },
    fetchMonster: function(id){
      let self = this;
      axios.get("api/monster/"+id).then(response => {
        let monster = response.data;
        self.name = monster.name;
        self.str = monster.str;
        self.dex = monster.dex;
        self.int = monster.int;
        self.picture = JSON.parse(monster.picture);
        this.$forceUpdate();
        self.fetchRaces(function(){
          self.race = monster.race.id;
          self.fetchRaceAbilities(function(){
            self.selectedAbilities = monster.abilities;
          });
        })
      });
    },
    fetchRaces: function(callback = null) {
      axios.get("api/monsterrace").then(response => {
        this.races = response.data;
        this.abilities = [];
        this.selectedAbilities = [];
        if(callback != null){
          callback(response.data);
        }
      });
    },
    fetchRaceAbilities: function(callback = null) {
      axios.get("api/monsterability/monsterrace/" + this.race).then(response => {
        this.abilities = response.data;
        this.selectedAbilities = [];
        if(callback != null){
          callback(response.data);
        }
      });
    },
    updateMonster: function() {
      let body = {
          name: this.name,
          raceId: this.race,
          abilities: this.selectedAbilities,
          str: this.str,
          dex: this.dex,
          int: this.int,
          picture: JSON.stringify(this.picture)
      };
      axios
        .put("api/monster/"+this.monsterId, body)
        .then(response => {
          console.log(response.data);
          this.goBack();
        })
        .catch(err => {
          console.log(err);
        });
    },
    roll: function(stat) {
      let rolls = [];
      let sortedRolls = [];
      for (let i = 0; i < 4; ++i) {
        let random = Math.random() * 20 + 6;
        let roll = Math.floor(random);
        rolls.push(roll);
        sortedRolls.push(roll);
      }
      for (let i = 0; i < sortedRolls.length; ++i) {
        for (let j = 0; j < sortedRolls.length - 1; ++j) {
          if (sortedRolls[i] > sortedRolls[j]) {
            let temp = sortedRolls[i];
            sortedRolls[i] = sortedRolls[j];
            sortedRolls[j] = temp;
          }
        }
      }
      let statRoll = 0;
      let statRollText = "[ ";
      for (let i = 0; i < sortedRolls.length; ++i) {
        if (i < 3) {
          statRoll += sortedRolls[i];
          statRollText += `<strong>${sortedRolls[i]}</strong>`;
        } else {
          statRollText += `${sortedRolls[i]}`;
        }
        if (i + 1 < rolls.length) {
          statRollText += `,`;
        }
      }
      statRollText += " ]";
      switch (stat) {
        case "STR":
          this.str = statRoll;
          this.strRoll = statRollText;
          break;
        case "DEX":
          this.dex = statRoll;
          this.dexRoll = statRollText;
          break;
        case "INT":
          this.int = statRoll;
          this.intRoll = statRollText;
          break;
      }
    }
  }
};
</script>
