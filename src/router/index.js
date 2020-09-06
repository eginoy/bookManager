import Vue from 'vue'
import VueRouter from 'vue-router'
import booksList from '../pages/booksList'
import bookRegist from '../pages/bookRegist'
import Login from '../components/Login'
import Logout from '../components/Logout'
import noAuthority from '../pages/noAuthority'

import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

Vue.use(VueRouter)

const authDomain = process.env.VUE_APP_AUTH_DOMAIN

const router = new VueRouter({
  mode: 'history',
  routes: [{
      path: '/',
      component: booksList,
      beforeEnter: (to, from, next) => {
        firebase.auth().onAuthStateChanged(user => {
          const reg = new RegExp('.*' + authDomain + '$')
          if (user === null) {
            return next({
              path: '/login'
            })
          }
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
      component: booksList,
      beforeEnter: (to, from, next) => {
        firebase.auth().onAuthStateChanged(user => {
          const reg = new RegExp('.*' + authDomain + '$')
          if (user === null) {
            return next({
              path: '/login'
            })
          }
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
      path: '/bookRegist',
      component: bookRegist,
      beforeEnter: (to, from, next) => {
        firebase.auth().onAuthStateChanged(user => {
          const reg = new RegExp('.*' + authDomain + '$')
          if (user === null) {
            return next({
              path: '/login'
            })
          }
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
      component: noAuthority,
      beforeEnter: (to, from, next) => {
        firebase.auth().onAuthStateChanged(user => {
          if (user === null) {

            return next({
              path: '/login'
            })
          }
          next()
        })
      }
    },
    {
      path: '/login',
      component: Login,
      beforeEnter: (to, from, next) => {
        firebase.auth().onAuthStateChanged(user => {
          if (user !== null) {

            return next({
              path: '/books'
            })
          }
          next()
        })
      }
    },
    {
      path: '/logout',
      component: Logout,
      beforeEnter: (to, from, next) => {
        firebase.auth().onAuthStateChanged(user => {
          if (user === null) {

            return next({
              path: '/login'
            })
          }
          next()
        })
      }
    },
    {
      path: '*',
      component: booksList,
      beforeEnter: (to, from, next) => {
        firebase.auth().onAuthStateChanged(user => {
          const reg = new RegExp('.*' + authDomain + '$')
          if (user === null) {

            return next({
              path: '/login'
            })
          }
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
