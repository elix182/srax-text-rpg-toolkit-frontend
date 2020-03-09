import Vue from 'vue';
import VueRouter from 'vue-router';
import LandingPage from '../components/LandingPage';
import Dashboard from '../components/dashboard/Dashboard';
import Heroes from '../components/heroes/Heroes';
import CreateHero from '../components/heroes/CreateHero';
import EditHero from '../components/heroes/EditHero';
import RandomHero from '../components/heroes/RandomHero';
import Monsters from '../components/monsters/Monsters';

Vue.use(VueRouter);

const routes = [
  { path: '', component: LandingPage },
  { path: '/dashboard', component: Dashboard },
  { path: '/heroes', component: Heroes },
  { path: '/heroes/create', component: CreateHero },
  { path: '/heroes/edit', component: EditHero },
  { path: '/heroes/random', component: RandomHero },
  { path: '/monsters', component: Monsters }
];

export default new VueRouter({
  routes
});