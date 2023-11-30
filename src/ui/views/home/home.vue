<template lang="pug">
#who-is-that-pokemon(class="min-h-screen flex flex-col md:grid md:grid-cols-2")
  .order-2(class="flex-grow-2 md:order-1 md:col-span-1 md:row-span-2 flex items-center justify-center")
    .guess-the-pokemon.flex.items-center.justify-center(class="grow hover:grow md:basis-1/2")
      .pokemon-box.flex.items-center.justify-center.w-full(class="min-w-[320px]")
        img.pokemon-silhouette(:src="selectedPokemon?.image" :class="{ unfiltered: showPokemon }")
  .order-1(class="md:order-2 md:row-span-1 flex px-4 justify-center")
    .title.flex.items-center.justify-center.self-end.mt-5
      img(class="w-4/5" src="/pokemon.png")
      img(class="w-1/5" src="/question_mark.png")
  .order-3.flex.flex-col.items-center(class="md:order-3 md:row-span-1 px-4")
    .pokemon-name-options.my-4.grid.gap-4.w-full(
      class="xs:grid-cols-1 md:grid-cols-2 md:my-14"
      v-if="!loading"
    )
      button.capitalize.text-black.font-bold.py-1.rounded(
        class="hover:bg-blue hover:text-white disabled:pointer-events-none md:py-4"
        :class="getButtonBgColor(pokemonOption)"
        type="button"
        v-for="pokemonOption in pokemonOptionList"
        :key="pokemonOption.name"
        @click="markPokemon(pokemonOption)"
        :disabled="hasAnOptionBeingSelected"
      ) {{ pokemonOption.name }}
    .h-14.w-full
      #progress-bar.w-full.h-3.relative.rounded-full.overflow-hidden(v-show="showProgressBar")
        div(class="w-full h-full bg-gray-200 absolute")
        #bar(ref="waitingForNextPokemonBar" class="transition-all ease-linear duration-2000 h-full bg-green-500 relative w-0")
      .flex.justify-center.mt-3
        button(v-show="showRetry" @click="getPokemon")
          svg.w-12(xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 452.64")
            path(d="M368.35 161.02c-33.05-59.34-90.64-98.27-164.75-89.98-69.06 7.72-131.91 57.64-147.19 131.68-12.78 61.99 10.79 121.11 52.63 161.1 48.87 46.7 122.66 67.32 192.61 36.01 35.84-16.05 60.23-36.5 78.47-62.84 1.86-2.46 4.36-6.41 7.83-9 10.07-7.53 23.32 1.42 21.28 12.44-.43 2.36-1.49 4.88-3.36 7.53-15 23.71-31.64 41.83-53.38 58.4-49.84 37.98-114.27 55.13-178.91 41.8-60.24-12.42-109.19-48.92-139.52-97.8C-18.98 264.9-6.89 162.04 48.32 89.93c34.29-44.79 85.22-77.72 147.5-87.26 105.15-16.11 210.71 42.27 244.52 135.32l42.51-13.6c11.78-3.73 24.36 2.79 28.1 14.57a22.33 22.33 0 0 1-.9 15.89l-48.64 108.53c-5.04 11.3-18.29 16.36-29.59 11.32l-1.65-.82-.02.03-106.62-58.85c-10.86-5.96-14.83-19.6-8.87-30.46 3.15-5.74 8.44-9.55 14.34-11l39.35-12.58z")
</template>

<script lang="ts" src="./home.ts"/>
<style lang="sass" scoped src="./home.sass"/>