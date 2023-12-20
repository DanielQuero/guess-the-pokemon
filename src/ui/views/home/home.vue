<template lang="pug">
loading-overlay(:loading="loading")
  .flex.items-center.justify-center.my-2(class="md:mt-6 ")
    .flex.items-center.justify-center(class="w-1/2 lg:w-1/3")
      img(class="w-4/5" src="/pokemon.png")
      img.hidden(class="w-1/5" src="/question_mark.png")
  h2.text-md.text-white.font-bold(class="md:text-lg") Choose generation(s):
  .flex.flex-wrap.justify-center
    template(v-for="generation in pokemonGenerations")
      label.flex.items-center.flex-col-reverse.group.p-1.cursor-pointer(
        class="w-1/2 sm:w-1/3 lg:w-1/4 sm:p-2"
      )
        input.hidden(v-model="selectedGenerations" type="checkbox" :value="generation.value")
        .generation-title.text-center.w-full.border-white.border.rounded-sm.transition.duration-300.leading-4.font-bold.py-1(
          class="lg:py-2"
          :class="isGenerationSelected(generation.value) ? 'bg-white' : 'bg-black not-hover-on-phones:group-hover:text-white'"
        ) {{ generation.label }}
        img.pokemon-silhouette(:src="generation.image" :class="{ unfiltered: isGenerationSelected(generation.value) }")

  .text-center.pt-4(class="md:pt-8")
    button.capitalize.text-black.font-bold.py-2.rounded.bg-white.w-60(
      class="not-hover-on-phones:hover:bg-blue not-hover-on-phones:hover:text-white disabled:pointer-events-none sm:py-4 disabled:opacity-50"
      type="button"
      :disabled="!hasAnyGenerationBeingSelected"
      @click="startQuiz"
    ) Start Quiz
</template>

<script lang="ts" src="./home.ts"/>
<style lang="sass" scoped src="./home.sass"/>