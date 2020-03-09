<template>
  <v-container>
   <v-row class="text-center">
      <v-col cols="6">
        <v-card class="mx-auto" max-width="344">
          <v-card-text>
            <p class="display-1 text--primary">
              Heroes
            </p>
            <div v-if="heroesSummary != null">
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
            </div>
            <div v-else>
              <div class="text--primary">
                Heroes summary not available
              </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" text v-on:click="goToHeroes" style="float: right;">Go to Heroes</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="6">
        <v-card class="mx-auto" max-width="344">
          <v-card-text>
            <p class="display-1 text--primary">
              Monsters
            </p>
            <div v-if="monstersSummary != null">
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
            </div>
            <div v-else>
              <div class="text--primary">
                Monsters summary not available
              </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" text v-on:click="goToMonsters" style="float: right;">Go to Monsters</v-btn>
          </v-card-actions>
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
      heroesSummary: null,
      monstersSummary: null
    }),
    methods: {
      goToHeroes: function(){
        this.$router.push({ path: "heroes" });
      },
      goToMonsters: function(){
        this.$router.push({ path: "monsters" });
      },
      fetchHeroesSummary: function(){
        axios.get('api/hero/dashboard')
          .then((response) => {
            this.heroesSummary = response.data;
            if(this.heroesSummary.available == 0){
              this.heroesSummary = null;
            }
          });
      },
      fetchMonstersSummary: function(){
        axios.get('api/monster/dashboard')
          .then((response) => {
            this.monstersSummary = response.data;
            if(this.monstersSummary.available == 0){
              this.monstersSummary = null;
            }
          });
      }
    }
  }
</script>
