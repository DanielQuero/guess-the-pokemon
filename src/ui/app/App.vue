<template lang="pug">
main
  RouterView
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator'

@Component
export default class HomeView extends Vue {
}
</script>

<style lang="sass">
main
  max-width: 1600px
</style>