<template>
  <q-page class="q-pa-lg container">
    <q-card class="card-login shadow-18 card-container">
      <q-card-section>
        <div class="text-center text-h5 ">Login</div>
      </q-card-section>

      <q-card-section class="q-gutter-md">
        <q-input
          label="Email"
          v-model="dataLogin.email"
          class="input"
        >
        </q-input>
        <q-input
          label="Password"
          :type="showPw ? 'text' : 'password'"
          v-model="dataLogin.password"
          class="input"
        >
          <template v-slot:append>
            <q-icon
              :name="showPw ? 'visibility' : 'visibility_off'"
              class="cursor-pointer"
              @click="showPw = !showPw"
            />
          </template>
        </q-input>
      </q-card-section>

      <q-card-actions class="q-gutter-sm column items-center items-stretch" style="width: 100%">
        <q-btn
          push
          @click="doLogin"
          size="lg"
          color="green-7"
          class="btn-login col"
        >
          SIGN UP
        </q-btn>
        <q-btn
          flat
          size="md"
          class="col"
          to="register"
          color="teal-14"
        >
          Register
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-page>

</template>

<style lang="stylus" scoped>
.container
  display flex
  .card-container
    width 350px
    padding 1em
    display flex
    flex-direction column
</style>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      urlLogin: '/user/login',
      dataLogin: {
        email: '',
        password: ''
      },
      showPw: false
    }
  },
  methods: {
    ...mapActions(['user/login']),
    doLogin () {
      const DATA = this.dataLogin
      const URL = this.urlLogin
      const ID = null
      const ACTION = 'save'
      this['user/login']({ DATA, URL, ID, ACTION })
        .then(() => {
          this.$router.push('/')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
