import { inject } from 'inversify-props'
import { Component, Ref, Vue } from 'vue-facing-decorator'
import { POKEMON_TYPES } from '@/application/types/PokemonTypes'
import type { PokemonModel } from '@/domain/models/pokemon/pokemon.model'
import LoadingOverlay from '@/ui/components/loadingOverlay/LoadingOverlay.vue'
import { GetPokemonQuizData } from '@/domain/usecases/pokemon/getPokemonQuizData.usecase'
import type { PokemonQuizModel } from '@/domain/models/pokemon/pokemonQuiz.model'
import { SaveCorrectPokemon } from '@/domain/usecases/pokemon/saveCorrectPokemon.usecase'
import { ResetCorrectPokemon } from '@/domain/usecases/pokemon/resetCorrectPokemon.usecase'
import { usePokemonStore } from '@/application/stores/pokemon/pokemon'

@Component({
	components: {
		LoadingOverlay,
	},
})
export default class QuizView extends Vue {
	@inject(POKEMON_TYPES.GET_POKEMON_QUIZ_DATA) private readonly getPokemonQuizData!: GetPokemonQuizData
	@inject(POKEMON_TYPES.SAVE_CORRECT_POKEMON) private readonly saveCorrectPokemon!: SaveCorrectPokemon
	@inject(POKEMON_TYPES.RESET_CORRECT_POKEMON) private readonly resetCorrectPokemon!: ResetCorrectPokemon
	@Ref() waitingForNextPokemonBar!: HTMLElement

	loading: boolean = true
	selectedPokemon: PokemonModel | null = null
	otherPokemonList: PokemonModel[] = []
	showPokemon: boolean = false
	showProgressBar: boolean = false
	showRetry: boolean = false
	showCongratsMessage: boolean = false

	pokemonStore: any

	pokemonQuizData: PokemonQuizModel = {
		pokemon: null,
		pokemonQuizOptions: [],
	}

	created() {
		this.pokemonStore = usePokemonStore()

		this.checkIfQuizIsGenerated()
		this.getPokemon()
	}

	checkIfQuizIsGenerated() {
		if (!this.pokemonStore.isQuizGenerated || this.isQuizFinished()) {
			this.$router.push({ name: 'Home' })
		}
	}
	isQuizFinished() {
		return this.pokemonStore.isQuizFinished
	}

	unvailPokemon() {
		this.showPokemon = true
	}

	async getPokemon() {
		this.resetVariables()

		this.pokemonQuizData = await this.getPokemonQuizData.execute()
		this.showPokemon = false

		this.loading = false
	}

	resetVariables() {
		this.loading = true
		this.showProgressBar = false
		this.showRetry = false
	}

	markPokemon(pkmOption: any) {
		pkmOption.selected = true

		if (this.isCorrectResponse(pkmOption)) {
			this.fullfillProgressBar()

			if (this.pokemonQuizData.pokemon) this.saveCorrectPokemon.execute(this.pokemonQuizData.pokemon.id)
			if (this.isQuizFinished()) {
				this.showCongratsMessage = true
			} else {
				setTimeout(() => {
					this.getPokemon()
					this.resetProgressBar()
				}, 2000)
			}
		} else {
			this.resetCorrectPokemon.execute()
			this.showRetry = true
		}

		this.unvailPokemon()
	}

	fullfillProgressBar() {
		this.showProgressBar = true

		setTimeout(() => {
			this.waitingForNextPokemonBar.classList.remove('w-0')
			this.waitingForNextPokemonBar.classList.add('w-full')
		}, 100)
	}

	resetProgressBar() {
		this.showProgressBar = false

		this.waitingForNextPokemonBar.classList.remove('duration-2000')
		this.waitingForNextPokemonBar.classList.remove('w-full')
		this.waitingForNextPokemonBar.classList.add('w-0')
		this.waitingForNextPokemonBar.classList.add('duration-2000')
	}

	isCorrectResponse(pkmOption: any): boolean {
		return this.hasAnOptionBeingSelected && pkmOption.name === this.pokemonQuizData.pokemon?.name
	}

	getButtonBgColor(pkmOption: any): string {
		let bgClass = 'bg-white'

		if (this.hasAnOptionBeingSelected) {
			if (pkmOption.selected && pkmOption.name !== this.pokemonQuizData.pokemon?.name) {
				bgClass = 'bg-negative'
			} else if (pkmOption.name == this.pokemonQuizData.pokemon?.name) {
				bgClass = 'bg-positive'
			}
		}

		return bgClass
	}

	get hasAnOptionBeingSelected(): boolean {
		return Boolean(this.pokemonQuizData.pokemonQuizOptions.find((value: any) => value.selected == true))
	}

	backHome() {
		this.$router.push({ name: 'Home' })
	}

	retryQuiz() {
		this.pokemonStore.shufflePokemonIds()
		this.pokemonStore.setPokemonIds(this.pokemonStore.getFullSelectedGenerationsPokemonIds)

		this.getPokemon()
	}
}
