import { defineStore } from 'pinia'

interface PokemonStoreState {
	selectedGenerations: number[]
	fullSelectedGenerationsPokemonIds: number[]
	pokemonIdsLeft: number[]
	correctPokemonIds: number[]
}

export const usePokemonStore = defineStore({
	id: `pkmn_quiz`,
	state: (): PokemonStoreState => ({
		selectedGenerations: [],
		fullSelectedGenerationsPokemonIds: [],
		pokemonIdsLeft: [],
		correctPokemonIds: [],
	}),
	getters: {
		getSelectedGenerations: (state) => state.selectedGenerations,
		getFullSelectedGenerationsPokemonIds: (state) => state.fullSelectedGenerationsPokemonIds,
		getCorrectPokemonIds: (state) => state.correctPokemonIds,
		getPokemonIdsLeft: (state) => state.pokemonIdsLeft,
		countPokemonIdsLeft: (state) => state.pokemonIdsLeft.length,
		getNextPokemonId: (state) => (state.pokemonIdsLeft.length ? state.pokemonIdsLeft[0] : 0),
		isQuizGenerated: (state) => state.fullSelectedGenerationsPokemonIds.length > 0,
		isQuizFinished: (state) => state.fullSelectedGenerationsPokemonIds.length > 0 && state.pokemonIdsLeft.length === 0,
	},
	actions: {
		setGenerations(generations: number[]) {
			this.selectedGenerations = generations
		},
		setPokemonIds(pokemonIds: number[]) {
			this.pokemonIdsLeft = pokemonIds
		},
		setFullSelectedGenerationsPokemonIds(pokemonIds: number[]) {
			this.fullSelectedGenerationsPokemonIds = pokemonIds
		},
		addCorrectPokemon(pokemonId: number) {
			this.correctPokemonIds.push(pokemonId)
		},
		removeIdFromPokemonIdsLeft(pokemonId: number) {
			this.pokemonIdsLeft = this.pokemonIdsLeft.filter((num) => num !== pokemonId)
		},
		resetAll() {
			this.selectedGenerations = []
			this.fullSelectedGenerationsPokemonIds = []
			this.correctPokemonIds = []
			this.pokemonIdsLeft = []
		},
		resetPokemonLeft() {
			this.pokemonIdsLeft = this.getFullSelectedGenerationsPokemonIds
			this.correctPokemonIds = []
		},
		shufflePokemonIds() {
			const shuffledNumbers = this.fullSelectedGenerationsPokemonIds

			for (let i = shuffledNumbers.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1))
				;[shuffledNumbers[i], shuffledNumbers[j]] = [shuffledNumbers[j], shuffledNumbers[i]]
			}

			this.fullSelectedGenerationsPokemonIds = shuffledNumbers
		},
	},
	persist: true,
})
