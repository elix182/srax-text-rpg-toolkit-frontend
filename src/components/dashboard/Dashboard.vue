<template>
  <v-container>
   <v-row class="text-center">
      <v-col cols="6">
        <v-card class="mx-auto" max-width="344">
          <v-card-text>
            <p class="display-1 text--primary">
              Heroes
            </p>
            <p>Available</p>
            <div class="text--primary">
              {{heroesSummary.available}}
            </div>
            <p>Most Popular Race</p>
            <div class="text--primary">
              {{heroesSummary.mostPopularRace.name}}
            </div>
            <p>Most Popular Class</p>
            <div class="text--primary">
              {{heroesSummary.mostPopularClass.name}}
            </div>
            <p>Most Popular Weapon</p>
            <div class="text--primary">
              {{heroesSummary.mostPopularWeapon.name}}
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col class="6">
        <v-card class="mx-auto" max-width="344">
          <v-card-text>
            <p class="display-1 text--primary">
              Monsters
            </p>
            <p>Available</p>
            <div class="text--primary">
              {{monstersSummary.available}}
            </div>
            <p>Most Popular Race</p>
            <div class="text--primary">
              {{monstersSummary.mostPopularRace.name}}
            </div>
            <p>Most Popular Ability</p>
            <div class="text--primary">
              {{monstersSummary.mostPopularAbility.name}}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'Dashboard',
    mounted: function() {
      this.fetchHeroesSummary();
      this.fetchMonstersSummary();
    },
    data: () => ({
      heroesSummary: {},
      monstersSumary: {}
    }),
    methods: {
      fetchHeroesSummary: function(){
        axios.get('http://localhost:8000/api/hero/dashboard')
          .then((response) => {
            console.log(response);
            this.heroesSummary = response.data;
          });
      },
      fetchMonstersSummary: function(){
        axios.get('http://localhost:8000/api/monster/dashboard')
          .then((response) => {
            console.log(response);
            this.monstersSummary = response.data;
          });
      }
    }
  }
</script>
