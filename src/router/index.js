import Vue from 'vue'
import Router from 'vue-router'
import Shop from '@/components/Shop'
import Thankyou from '@/components/Thankyou'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Shop',
      component: Shop
    },
    {
      path: '/thankyou',
      name: 'Thankyou',
      component: Thankyou
    }
  ]
})
