<template>
  <q-page class="q-pa-lg container">
    <q-card class="card-login shadow-18 card-container">

        <q-card-section>
          <div class="text-center text-h5 ">Register</div>
        </q-card-section>

        <q-card-section class="q-gutter-md">
          <q-input
            label="Name"
            v-model="registerData.name"
            outlined
            class="input"/>
          <q-input
            label="Email"
            v-model="registerData.email"
            outlined
            class="input"/>
          <q-input
            label="Password"
            type="password"
            v-model="registerData.password"
            outlined
            class="input"/>

          <q-input
            label="Repassword"
            type="password"
            v-model="registerData.repassword"
            outlined
            class="input"/>
        </q-card-section>

        <q-card-actions>
          <div class="q-gutter-sm column items-center items-stretch" style="width: 100%">
            <q-btn
              push
              @click="doRegister"
              color="green-7"
              class="btn-create"
            >
              CREATE
            </q-btn>
            <q-btn
              outline
              to="/auth/login"
              color="primary"
            >
              Login
            </q-btn>
          </div>
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
      registerData: {
        username: '',
        email: '',
        password: ''
      },
      showPw: false,
      urlRegister: 'http://localhost:3000/user/register/'
    }
  },
  methods: {
    ...mapActions(['todo/doRegister']),
    doRegister () {
      const DATA = this.registerData
      const URL = this.urlRegister
      const ID = null
      const ACTION = 'save'
      this['todo/doRegister']({ DATA, URL, ID, ACTION })
        .then((response) => {
          this.$router.push('/auth/login')
        })
        .catch((err) => {
          this.$q.notify({
            message: 'Deu alguma pane ' + err
          })
        })
    }
  }
}
</script>
