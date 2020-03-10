<template>
  <v-navigation-drawer app permanent color="primary" dark>
    <v-list dense nav>
      <div v-for="item in items" :key="item.title">
        <v-list-item v-if="item.subitems.length == 0" link @click="goToOption(item)">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group v-else :prepend-icon="item.icon" no-action active-class="v-list-group-active">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>{{item.title}}</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="subItem in item.subitems"
            :key="subItem.title"
            link
            @click="goToOption(subItem)"
          >
            <v-list-item-content>
              <v-list-item-title>{{subItem.title}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </div>
    </v-list>
  </v-navigation-drawer>
</template> 

<style>
.v-list-group-active {
  background-color: white;
}
</style> 

<script>
export default {
  created: function () {

  },
  methods: {
    goToOption: function(model){
      if(model != null){
        this.$router.replace({ path: `${model.component}` })
        this.$emit("toggleNavEvent");
      } else console.log("No option selected")
    },
  },
  data() {
    return { 
      drawer: null,
      items: [
        { title: 'Dashboard', icon: 'home', component: '/dashboard', subitems: [] },
        { title: 'Heroes', icon: 'people', component: '', subitems: [
          // { title:'List', icon: '', component:'/heroes' },
          // { title:'Create', icon: '', component:'/heroes/create' },
          // { title:'Randomize', icon: '', component:'/heroes/random' }
          ] 
        },
        { title: 'Monsters', icon: 'pets', component: '', subitems: [
          // { title:'List', icon: '', component:'/monsters' },
          // { title:'Create', icon: '', component:'/monsters/create' },
          // { title:'Randomize', icon: '', component:'/monsters/random' }
          ] 
        },
      ]
    }
  }
};
</script>