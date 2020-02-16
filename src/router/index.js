import Vue from 'vue'
import VueRouter from 'vue-router'
import BooksList from '../components/BooksList'
import BookRegister from '../components/BookRegister'
import Login from '../components/Login'
import Logout from '../components/Logout'
import NoAuthority from '../components/NoAuthority'

import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: BooksList,
      beforeEnter: (to, from, next) => {
        firebase.auth().onAuthStateChanged(user => {
          const reg = new RegExp('.*@monoworks.co.jp$')
          if (user === null) return next({ path: '/login' })
          if (reg.test(user.email)) {
            next()
          } else {
            next({
              path: '/noAuthority'
            })
          }
        })
      }
    },
    {
      path: '/books',
      component: BooksList,
      beforeEnter: (to, from, next) => {
        firebase.auth().onAuthStateChanged(user => {
          const reg = new RegExp('.*@monoworks.co.jp$')
          if (user === null) return next({ path: '/login' })
          if (reg.test(user.email)) {
            next()
          } else {
            next({
              path: '/noAuthority'
            })
          }
        })
      }
    },
    {
      path: '/bookRegistration',
      component: BookRegister,
      beforeEnter: (to, from, next) => {
        firebase.auth().onAuthStateChanged(user => {
          const reg = new RegExp('.*@monoworks.co.jp$')
          if (user === null) return next({ path: '/login' })
          if (reg.test(user.email)) {
            next()
          } else {
            next({
              path: '/noAuthority'
            })
          }
        })
      }
    },
    {
      path: '/noAuthority',
      component: NoAuthority,
      beforeEnter: (to, from, next) => {
        firebase.auth().onAuthStateChanged(user => {
          if (user === null) return next({ path: '/login' })
          next()
        })
      }
    },
    {
      path: '/login',
      component: Login,
      beforeEnter: (to, from, next) => {
        firebase.auth().onAuthStateChanged(user => {
          if (user !== null) return next({ path: '/books' })
          next()
        })
      }
    },
    {
      path: '/logout',
      component: Logout,
      beforeEnter: (to, from, next) => {
        firebase.auth().onAuthStateChanged(user => {
          if (user === null) return next({ path: '/login' })
          next()
        })
      }
    },
    {
      path: '*',
      component: BooksList,
      beforeEnter: (to, from, next) => {
        firebase.auth().onAuthStateChanged(user => {
          const reg = new RegExp('.*@monoworks.co.jp$')
          if (user === null) return next({ path: '/login' })
          if (reg.test(user.email)) {
            next()
          } else {
            next({
              path: '/noAuthority'
            })
          }
        })
      }
    }
  ]
})

export default router
