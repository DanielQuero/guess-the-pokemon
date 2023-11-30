import { inject } from 'inversify-props'
import { Component, Ref, Vue } from 'vue-facing-decorator'
import { GetRandomPokemon } from '@/domain/usecases/pokemon/getRandomPokemon.usecase'
import { POKEMON_TYPES } from '@/application/types/PokemonTypes'
import type { PokemonModel } from '@/domain/models/pokemon/pokemon.model'
import { GetOthersRandomPokemon } from '@/domain/usecases/pokemon/getOthersRandomPokemon.usecase'

@Component
export default class HomeView extends Vue {
	@inject(POKEMON_TYPES.GET_RANDOM_POKEMON) private readonly getRandomPokemon!: GetRandomPokemon
	@inject(POKEMON_TYPES.GET_OTHERS_RANDOM_POKEMON) private readonly getOthersRandomPokemon!: GetOthersRandomPokemon
	@Ref() waitingForNextPokemonBar!: HTMLElement

	loading: boolean = true
	selectedPokemon: PokemonModel | null = null
	otherPokemonList: PokemonModel[] = []
	showPokemon: boolean = false
	showProgressBar: boolean = false
	showRetry: boolean = false
	pokemonOptionList: any = []

	created() {
		this.getPokemon()
	}

	unvailPokemon() {
		this.showPokemon = true
	}

	async getPokemon() {
		this.loading = true
		this.showPokemon = false
		this.showProgressBar = false
		this.showRetry = false
		this.selectedPokemon = await this.getRandomPokemon.execute()
		this.otherPokemonList = await this.getOthersRandomPokemon.execute(this.selectedPokemon.id)

		this.generatePokemonList()
		this.loading = false
	}

	generatePokemonList() {
		if (this.selectedPokemon) {
			this.pokemonOptionList = [...this.otherPokemonList, this.selectedPokemon]
				.map((pokemon: PokemonModel) => {
					return { name: pokemon?.name, selected: false }
				})
				.sort((a, b) => a.name.localeCompare(b.name))
		}
	}

	markPokemon(pkmOption: any) {
		pkmOption.selected = true

		if (this.isCorrectResponse(pkmOption)) {
			this.showProgressBar = true
			this.fullfillProgressBar()

			setTimeout(() => {
				this.getPokemon()
				this.resetProgressBar()
			}, 2000)
		} else {
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
		return this.hasAnOptionBeingSelected && pkmOption.name === this.selectedPokemon?.name
	}

	isSelectedButWrong(pkmOption: any): boolean {
		return this.hasAnOptionBeingSelected && pkmOption.name !== this.selectedPokemon?.name
	}

	getButtonBgColor(pkmOption: any): string {
		let bgClass = 'bg-white'

		if (this.hasAnOptionBeingSelected) {
			if (pkmOption.selected && pkmOption.name !== this.selectedPokemon?.name) {
				bgClass = 'bg-negative'
			} else if (pkmOption.name == this.selectedPokemon?.name) {
				bgClass = 'bg-positive'
			}
		}

		return bgClass
	}

	get hasAnOptionBeingSelected(): boolean {
		return Boolean(this.pokemonOptionList.find((value: any) => value.selected == true))
	}
}
