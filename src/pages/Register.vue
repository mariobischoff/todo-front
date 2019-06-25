<template>
  <q-page class="q-pa-lg container">
    <q-card class="card-login shadow-18 card-container">

        <q-card-section>
          <div class="text-center text-h5 ">Register</div>
        </q-card-section>

        <q-card-section class="q-gutter-md">
          <q-input
            label="Username"
            v-model="username"
            outlined
            class="input"
          >
          </q-input>
          <q-input
            label="Email"
            v-model="email"
            outlined
            class="input"
          >
          </q-input>
          <q-input
            label="Password"
            :type="showPw ? 'text' : 'password'"
            v-model="password"
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

        <q-card-actions>
          <div class="q-gutter-sm column items-center items-stretch" style="width: 100%">
            <q-btn
              color="green-7"
              class="btn-create"
            >
              CREATE
            </q-btn>
            <q-btn
              to="/auth/login"
              color="deep-purple"
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
    padding 1em
    display flex
    flex-direction column
</style>

<script>
export default {
  data () {
    return {
      username: '',
      email: '',
      password: ''
    }
  }
}
</script>
