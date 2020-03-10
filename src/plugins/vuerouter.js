import Vue from 'vue';
import VueRouter from 'vue-router';
import LandingPage from '../components/LandingPage';
import Dashboard from '../components/dashboard/Dashboard';
import Heroes from '../components/heroes/Heroes';
import CreateHero from '../components/heroes/CreateHero';
import EditHero from '../components/heroes/EditHero';
import RandomHero from '../components/heroes/RandomHero';
import Monsters from '../components/monsters/Monsters';
import CreateMonster from '../components/monsters/CreateMonster';
import EditMonster from '../components/monsters/EditMonster';
import RandomMonster from '../components/monsters/RandomMonster';

Vue.use(VueRouter);

const routes = [
  { path: '', component: LandingPage },
  { path: '/dashboard', component: Dashboard },
  { path: '/heroes', component: Heroes },
  { path: '/heroes/create', component: CreateHero },
  { path: '/heroes/edit/:id', component: EditHero },
  { path: '/heroes/random', component: RandomHero },
  { path: '/monsters', component: Monsters },
  { path: '/monsters/create', component: CreateMonster },
  { path: '/monsters/edit/:id', component: EditMonster },
  { path: '/monsters/random', component: RandomMonster },
];

export default new VueRouter({
  routes
});