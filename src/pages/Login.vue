<template>
  <q-layout>
    <q-page-container>
      <q-page class="container">
        <q-card class="card-login shadow-18">

          <q-card-section>
            <div class="text-center text-h5 ">Login</div>
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

          <q-card-actions class="q-mb-lg">
            <q-btn
              color="green-7"
              class="btn-login"
            >
              SIGN UP
            </q-btn>
          </q-card-actions>

        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style lang="stylus">
  .container
    display flex
    justify-content center
    align-items center
    background $light-blue-4
    .card-login
      display flex
      flex-direction column
      align-items center
      .input
        width 20em
      .btn-login
        width 10em
</style>

<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      showPw: false
    }
  }
}
</script>
