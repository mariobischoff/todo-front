<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Todo <q-icon name="done" color="green" style="font-size: 30px"/>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
    <class class="header">
      <q-avatar size="80px">
        <img src="https://forum.edencraft.com.br/download/file.php?avatar=6926_1514724632.jpg" />
      </q-avatar>
      <h1>Mario</h1>
      <p>mariobischoff@gmail.com</p>
    </class>
      <q-list>
        <q-item clickable to="/">
          <q-item-section avatar>
            <q-icon name="list" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Tasks</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/checked">
          <q-item-section avatar>
            <q-icon name="done" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Done</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/trash">
          <q-item-section avatar>
            <q-icon name="delete" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Trash</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL
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
