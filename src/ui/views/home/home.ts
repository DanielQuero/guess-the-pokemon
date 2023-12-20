import { inject } from 'inversify-props'
import { Component, Vue } from 'vue-facing-decorator'
import { POKEMON_TYPES } from '@/application/types/PokemonTypes'
import { GeneratePokemonForQuiz } from '@/domain/usecases/pokemon/generatePokemonForQuiz.usecase'
import LoadingOverlay from '@/ui/components/loadingOverlay/LoadingOverlay.vue'

@Component({
	components: {
		LoadingOverlay,
	},
})
export default class HomeView extends Vue {
	@inject(POKEMON_TYPES.GENERATE_POKEMON_FOR_QUIZ) private readonly generatePokemonForQuiz!: GeneratePokemonForQuiz

	loading = true
	pokemonGenerations = [
		{ label: 'Generation I', value: 1, image: `${import.meta.env.BASE_URL}generations/gen1.png` },
		{ label: 'Generation II', value: 2, image: `${import.meta.env.BASE_URL}generations/gen2.png` },
		{ label: 'Generation III', value: 3, image: `${import.meta.env.BASE_URL}generations/gen3.png` },
		{ label: 'Generation IV', value: 4, image: `${import.meta.env.BASE_URL}generations/gen4.png` },
		{ label: 'Generation V', value: 5, image: `${import.meta.env.BASE_URL}generations/gen5.png` },
		{ label: 'Generation VI', value: 6, image: `${import.meta.env.BASE_URL}generations/gen6.png` },
		{ label: 'Generation VII', value: 7, image: `${import.meta.env.BASE_URL}generations/gen7.png` },
		{ label: 'Generation VIII', value: 8, image: `${import.meta.env.BASE_URL}generations/gen8.png` },
		{ label: 'Generation IX', value: 9, image: `${import.meta.env.BASE_URL}generations/gen9.png` },
	]
	selectedGenerations: number[] = []

	startQuiz() {
		this.generatePokemonForQuiz.execute(this.selectedGenerations)

		this.$router.push({ name: 'Quiz' })
	}

	mounted() {
		this.loading = false
	}

	isGenerationSelected(generationNumber: number) {
		return this.selectedGenerations.find((gen) => gen === generationNumber)
	}

	get hasAnyGenerationBeingSelected(): boolean {
		return this.selectedGenerations.length > 0
	}
}
