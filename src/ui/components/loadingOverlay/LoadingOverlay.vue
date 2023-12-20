<template lang="pug">
.loading-page.flex.flex-col.justify-center.items-center.fixed.top-0.left-0(:class="showLoading ? 'z-50' : 'opacity-0 -z-1'")
  .loading-top.w-screen.h-screen-50.bg-main.border-black.border-b-20.flex.justify-center(ref="pokeballTopHalf" @animationend="animationEndHandler")
    .pokeball-circle.bg-white.flex.justify-center.items-center.w-150-px.h-150-px.rounded-full.border-black.border-20.self-end.relative.top-93-px
      .pokeball-inner-circle.w-75-px.h-75-px.border-black.border-6.rounded-full
  .loading-bottom.w-screen.bg-white.h-screen-50.border-black.border-t-20.-z-1(ref="pokeballBottomHalf")
slot
</template>

<script lang="ts" src="./LoadingOverlay.ts"/>
<style lang="sass" scoped src="./LoadingOverlay.sass"/>
