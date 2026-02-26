import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LayoutContainer from '../components/layout/LayoutContainer.vue'
import IndustryNavPage from '../components/industry/IndustryNavPage.vue'
import ChainPage from '../components/industry/ChainPage.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: LayoutContainer,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
        },
        {
          path: 'industry',
          name: 'industry',
          component: IndustryNavPage,
        },
        {
          path: 'chain/:chainName/:levelType?',
          name: 'chain',
          component: ChainPage,
          props: true,
        },
      ],
    },
  ],
})

export default router
