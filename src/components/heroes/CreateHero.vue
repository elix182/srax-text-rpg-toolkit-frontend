<template>
  <v-container>
    <v-row no-gutters justify="center">
      <v-col cols="6">
        <v-card>
          <v-card-title>Hero Information</v-card-title>
          <v-list-item>
            <v-list-item-content>
              <v-container>
                <v-row>
                  <v-text-field v-model="firstName" label="First Name"></v-text-field>
                </v-row>
                <v-row>
                  <v-text-field v-model="lastName" label="Last Name"></v-text-field>
                </v-row>
                <v-row>
                  <v-select
                    v-model="race"
                    :items="races"
                    item-text="name"
                    item-value="id"
                    :menu-props="{ maxHeight: '400' }"
                    label="Race"
                    hint="Pick a Race for your hero"
                    persistent-hint
                    v-on:change="fetchRaceHeroClasses"
                  ></v-select>
                </v-row>
                <v-row>
                  <v-select
                    v-model="heroClass"
                    :items="classes"
                    item-text="name"
                    item-value="id"
                    :menu-props="{ maxHeight: '400' }"
                    label="Class"
                    hint="Pick a Class for your hero"
                    persistent-hint
                    v-on:change="fetchClassWeapons"
                  ></v-select>
                </v-row>
                <v-row>
                  <v-select
                    v-model="weapon"
                    :items="weapons"
                    item-text="name"
                    item-value="id"
                    :menu-props="{ maxHeight: '400' }"
                    label="Weapon"
                    hint="Pick a Weapon for your hero"
                    persistent-hint
                  ></v-select>
                </v-row>
              </v-container>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-title>Hero Stats</v-card-title>
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
    <v-row>
        <v-col>
        <v-card>
          <v-list-item>
            <v-list-item-content>
              <v-container>
                <v-btn color="primary" dark v-on:click="createHero">Create</v-btn>
                <v-btn color="accent" dark v-on:click="goBack">Cancel</v-btn>
              </v-container>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "CreateHero",
  created: function () {
    this.$emit("loggedInEvent", true);
    this.$emit("componentChangedEvent", 'Create Hero');
  },
  mounted: function() {
    this.fetchHeroRaces();
  },
  data: () => ({
    races: [],
    classes: [],
    weapons: [],
    firstName: "",
    lastName: "",
    race: null,
    heroClass: null,
    weapon: null,
    str: "",
    strRoll: "",
    dex: "",
    dexRoll: "",
    int: "",
    intRoll: ""
  }),
  methods: {
    goBack: function(){
        this.$router.go(-1);
    },
    fetchHeroRaces: function() {
      axios.get("api/herorace").then(response => {
        this.races = response.data;
        this.classes = [];
        this.race = null;
      });
    },
    fetchRaceHeroClasses: function() {
      axios.get("api/heroclass/herorace/" + this.race).then(response => {
        this.classes = response.data;
        this.weapons = [];
        this.heroClass = null;
      });
    },
    fetchClassWeapons: function() {
      axios.get("api/weapon/heroclass/" + this.heroClass).then(response => {
        this.weapons = response.data;
        this.weapon = null;
      });
    },
    createHero: function() {
      let body = {
          firstName: this.firstName,
          lastName: this.lastName,
          raceId: this.race,
          classId: this.heroClass,
          weaponId: this.weapon,
          str: this.str,
          dex: this.dex,
          int: this.int
      };
      axios
        .post("api/hero", body)
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
        let random = Math.random() * 6 + 1;
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
