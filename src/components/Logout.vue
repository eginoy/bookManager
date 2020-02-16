<script>
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

export default {
  data () {
    return {}
  },
  created () {
    const self = this
    firebase
      .auth()
      .signOut()
      .then(function () {
        self.$router.push({ path: '/' })
      })
  }
}
</script>
