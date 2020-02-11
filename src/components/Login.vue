<template>
  <div class="p-pageWrapper">
    <div class="p-message">
      <span>ログインすると以下の機能が利用できます。</span>
      <ul class="p-message-list">
        <li>バーコード情報から書籍の登録</li>
        <li>登録された書籍の閲覧</li>
      </ul>
    </div>
    <button @click="googleLogin" class="p-loginButton btn btn-primary">
      Googleアカウントでログイン
    </button>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

export default {
  name: 'login',
  data () {
    return {
      errorMessage: ''
    }
  },
  methods: {
    googleLogin () {
      const self = this
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase
        .auth()
        .signInWithRedirect(provider)
        .then(function (result) {
          console.log(result)
          const userData = {
            id: result.user.uid,
            name: result.user.displayName,
            domain: result.additionalUserInfo.profile.hd
          }
          console.log(userData)
          const db = firebase.database().ref('server/saving-data/users')
          db.child(userData.id).set(userData)
          self.$router.push('/')
        })
        .catch(function (error) {
          console.log(error)
          self.$router.push({ path: '/' })
        })
    }
  },
  created () {}
}
</script>

<style>
.p-pageWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.p-message {
  margin: 3em 0;
}

.p-message-list {
  margin: 0.5em 0 0 1em;
}

.p-loginButton {
}
</style>
