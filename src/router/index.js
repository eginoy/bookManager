import Vue from 'vue'
import VueRouter from 'vue-router'
import BooksList from '../components/BooksList'
import BookRegister from '../components/BookRegister'
import Login from '../components/Login'

import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

Vue.use(VueRouter)

const router = new VueRouter({
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
      component: Login,
      meta: {
        isPublic: true
      }
    },
    {
      path: '*',
      component: BooksList
    }
  ]
})

router.beforeEach(function (to, from, next) {
  firebase.auth().onAuthStateChanged(function (user) {
    if (to.matched.some(rec => rec.meta.isPublic)) {
      // ・ログインしていない状態でログアウト
      // ・ログインしている状態でログイン
      // 場合のバリデーション
      if (to.path === '/login' && user) next({ path: '/' })
      if (to.path === '/logOut' && !user) next({ path: '/' })
      next()
    } else {
      if (user) {
        next()
      } else {
        next({
          path: '/login'
        })
      }
    }
  })
})

export default router
