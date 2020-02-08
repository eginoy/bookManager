import Vue from 'vue'
import VueRouter from 'vue-router'
import BooksList from '../components/BooksList'
import BookRegister from '../components/BookRegister'
import Login from '../components/Login'

// import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

Vue.use(VueRouter)

var router = new VueRouter({
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
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '*',
      component: BooksList
    }
  ]
})

// router.beforeEach(function (to, from, next) {
//   if (to === '/login') {
//     next()
//   } else {
//     firebase.auth().onAuthStateChanged(function (user) {
//       if (user) {
//         next()
//       } else {
//         next({
//           path: '/login'
//         })
//       }
//     })
//   }
// })

export default router
