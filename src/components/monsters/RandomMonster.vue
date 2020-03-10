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
                  <v-text-field v-model="name" label="Name" readonly></v-text-field>
                </v-row>
                <v-row>
                  <v-text-field v-model="race.name" label="Race" readonly></v-text-field>
                </v-row>
                <v-row>
                  <v-select
                    v-model="selectedAbilities"
                    :items="abilities"
                    item-text="name"
                    item-value="id"
                    :menu-props="{ maxHeight: '400' }"
                    label="Abilities"
                    persistent-hint
                    multiple
                    readonly
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
                <v-btn color="info" v-on:click="fetchMonster">Randomize</v-btn>
                <v-btn color="primary" dark v-on:click="createMonster">Create</v-btn>
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
  name: "RandomMonster",
  mounted: function() {
    this.fetchMonster();
  },
  data: () => ({
    name: "",
    race: null,
    selectedAbilities: [],
    abilities: [],
    str: "",
    strRoll: "",
    dex: "",
    dexRoll: "",
    int: "",
    intRoll: "",
    picture: []
  }),
  methods: {
    goBack: function(){
        this.$router.go(-1);
    },
    fetchMonster: function(){
    let self = this;
    self.generateRandomMonsterRequest((monster) => {
        self.name = monster.name;
        self.race = monster.race;
        self.abilities = monster.abilities;
        self.selectedAbilities = [];
        for(let i = 0; i < monster.abilities.length; ++i){
          self.selectedAbilities.push(monster.abilities[i].id);
        }
        self.picture = JSON.parse(monster.picture);
        this.$forceUpdate();
        self.roll('STR');
        self.roll('DEX');
        self.roll('INT');
    });
    },
    generateRandomMonsterRequest: function(callback = null) {
      axios.get("api/monster/random").then(response => {
        let randomMonster = response.data;
        if(callback != null){
            callback(randomMonster);
        }
      });
    },
    createMonster: function() {
      let body = {
          name: this.name,
          raceId: this.race.id,
          abilities: this.selectedAbilities,
          str: this.str,
          dex: this.dex,
          int: this.int,
          picture: JSON.stringify(this.picture)
      };
      console.log(body);
      axios
        .post("api/monster", body)
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
