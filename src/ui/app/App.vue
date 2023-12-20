<template lang="pug">
main.container.2xl.text-xs(class="md:text-sm lg:text-base")
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