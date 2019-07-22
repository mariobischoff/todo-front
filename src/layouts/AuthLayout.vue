<template>
  <q-layout class="container">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style lang="stylus" scoped>
  .container
    background $primary
    display flex
    justify-content center
    align-items center
</style>

<script>
export default {
}
</script>
