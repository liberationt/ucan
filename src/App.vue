<template>
  <div id="app">
    <router-view />
    <Spinner></Spinner>
  </div>
</template>

<script>
import Spinner from '@/components/Spinner'
export default {
  name: 'App',
  components: {
    Spinner
  }
}
</script>

<style>

</style>
