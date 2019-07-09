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
          outlined
          class="input"
        >
        </q-input>
        <q-input
          label="Password"
          :type="showPw ? 'text' : 'password'"
          v-model="dataLogin.password"
          outlined
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
    padding 1em
    display flex
    flex-direction column
</style>

<script>
import { mapActions } from 'vuex'
import { SessionStorage } from 'quasar'

export default {
  data () {
    return {
      dataLogin: {
        email: '',
        password: ''
      },
      showPw: false
    }
  },
  methods: {
    ...mapActions(['users/login']),
    doLogin () {
      this['users/login'](this.dataLogin)
        .then((data) => {
          console.log(data)
          SessionStorage.set('token', data.token)
          this.$router.push('/')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
