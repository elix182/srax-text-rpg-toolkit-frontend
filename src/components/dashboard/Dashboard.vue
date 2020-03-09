<template>
  <v-container>
   <v-row class="text-center">
      <v-col cols="12">
        
      </v-col>

      <v-col class="mb-4">
        
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
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
        
      },
      fetchMonstersSummary: function(){
        
      }
    }
  }
</script>
