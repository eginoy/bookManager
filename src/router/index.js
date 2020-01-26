import Vue from 'vue'
import VueRouter from 'vue-router'
import BooksList from '../components/BooksList'
import BookRegister from '../components/BookRegister'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: BooksList
    },
    {
      path: '/books',
      component: BooksList
    },
    {
      path: '/bookRegistration',
      component: BookRegister
    }
  ]
})
