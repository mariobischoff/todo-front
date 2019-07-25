<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="text-center">
          Todo
        </q-toolbar-title>
        <q-btn
          flat
          dense
          round
          @click="logout"
          aria-label="Menu"
        >
          <q-icon name="exit_to_app" />
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
  name: 'MyLayout',
  data () {
    return {
      user: {
        name: 'Mario',
        email: 'mariobischoff@gmail.com'
      }
    }
  },
  methods: {
    ...mapActions(['user/logout']),
    ...mapMutations(['task/setTasks']),
    logout () {
      this['user/logout']()
        .then(() => {
          this['task/setTasks']('')
          this.$router.push('/auth/login')
        })
    }
  }

}
</script>

<style lang="stylus">
  .header
    background-color $primary
    height 180px
    display flex
    flex-direction column
    align-items center
    justify-content center
    img
      border solid 2px white
    h1, p
      margin 0
      padding 0
      color white
    h1
      margin-top 10px
      font-size 22px
      line-height 22px
      font-font-weight 400
    p
      margin-top 4px
      font-size 14px
      line-height 14px
</style>
