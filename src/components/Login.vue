<template>
  <div>
    <button @click="googleLogin">Googleでログイン</button>
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
        .signInWithPopup(provider)
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
        })
    }
  }
}
</script>

<style lang="sass" scoped></style>
