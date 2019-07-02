<template>
  <q-layout class="container">
    <q-page-container>
      <transition name="slide-fade">
        <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<style lang="stylus" scoped>
  .container
    background $primary
    display flex
    justify-content center
    align-items center
  .slide-fade-enter-active
    transform translateY(20px)
    opacity 0
  .slide-fade-leave-active
    transition all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0)
  .slide-fade-enter, .slide-fade-leave-to
    opacity 0
</style>

<script>
export default {

  data () {
    return {
      leftDrawer: true
    }
  }
}
</script>
