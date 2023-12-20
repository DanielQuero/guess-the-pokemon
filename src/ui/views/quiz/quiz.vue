<template lang="pug">
loading-overlay(:loading="loading")
  #who-is-that-pokemon(class="min-h-screen flex flex-col md:grid md:grid-cols-2")
    .order-2(class="flex-grow-2 md:order-1 md:col-span-1 md:row-span-2 flex items-center justify-center")
      .guess-the-pokemon.flex.items-center.justify-center(class="grow hover:grow md:basis-1/2")
        .pokemon-box.flex.items-center.justify-center.w-full(class="min-w-[320px]")
          img.pokemon-silhouette(:src="pokemonQuizData.pokemon?.image" :class="{ unfiltered: showPokemon }")
    .order-1(class="md:order-2 md:row-span-1 flex px-4 justify-center")
      .title.flex.items-center.justify-center.self-end.mt-5
        img(class="w-4/5" src="/pokemon.png")
    .order-3.flex.flex-col.items-center(class="md:order-3 md:row-span-1 px-4")
      .pokemon-name-options.my-4.grid.gap-4.w-full(
        class="xs:grid-cols-1 md:grid-cols-2 md:my-14"
        v-if="!loading"
      )
        button.capitalize.text-black.font-bold.py-1.rounded(
          class="not-hover-on-phones:hover:bg-blue not-hover-on-phones:hover:text-white disabled:pointer-events-none md:py-4"
          :class="getButtonBgColor(pokemonOption)"
          type="button"
          v-for="pokemonOption in pokemonQuizData.pokemonQuizOptions"
          :key="pokemonOption.name"
          @click="markPokemon(pokemonOption)"
          :disabled="hasAnOptionBeingSelected"
        ) {{ pokemonOption.name }}
      .h-14.w-full
        div(v-show="showCongratsMessage")
          div Congrats!
          div You catch them all!!
        #progress-bar.w-full.h-3.relative.rounded-full.overflow-hidden(v-show="showProgressBar && !showCongratsMessage")
          div(class="w-full h-full bg-gray-200 absolute")
          #bar(ref="waitingForNextPokemonBar" class="transition-all ease-linear duration-2000 h-full bg-green-500 relative w-0")
        .flex.justify-evenly.items-center.mt-3
          button(v-show="showRetry" @click="backHome")
            img.w-12(src="/icons/back-arrow.svg")
          button(v-show="showRetry" @click="retryQuiz")
            img.w-12(src="/icons/retry-arrow.svg")
</template>

<script lang="ts" src="./quiz.ts"/>
<style lang="sass" scoped src="./quiz.sass"/>