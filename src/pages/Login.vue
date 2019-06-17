<template>
  <q-layout>
    <q-page-container>
      <q-page class="q-pa-md">
        <div class="row justify-center">
          <div class="col-xs-12 col-sm-8 col-md-6">
            <q-card class="q-pa-lg">
              <div class="row justify-center">
                <q-card-section>
                  <div class="text-center text-h5 ">Login</div>
                </q-card-section>
                <q-card-section class="q-gutter-md">
                  <q-input
                    label="Username"
                    v-model="username"
                    outlined
                  />
                  <q-input
                    label="Password"
                    v-model="password"
                    outlined
                  />
                </q-card-section>

                <q-card-actions>
                  <q-btn
                    color="green"
                  >
                    Login
                  </q-btn>
                </q-card-actions>
              </div>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style lang="stylus">
  .fundo
    background-color green
</style>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  }
}
</script>
