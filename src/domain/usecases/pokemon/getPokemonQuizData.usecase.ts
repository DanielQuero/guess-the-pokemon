import { inject, injectable } from 'inversify-props'
import { POKEMON_TYPES } from '@/application/types/PokemonTypes'
import { PokemonRepository } from '@/domain/repositories/pokemonRepository'
import { usePokemonStore } from '@/application/stores/pokemon/pokemon'
import type { PokemonOptions, PokemonQuizModel } from '@/domain/models/pokemon/pokemonQuiz.model'
import type { PokemonModel } from '@/domain/models/pokemon/pokemon.model'

@injectable()
export class GetPokemonQuizData {
	constructor(@inject(POKEMON_TYPES.POKEMON_REPOSITORY) private pokemonRepository: PokemonRepository) {}

	async execute(): Promise<PokemonQuizModel> {
		const pokemonStore = usePokemonStore()
		const nextPokemonId = pokemonStore.getNextPokemonId

		const selectedPokemonData: PokemonModel = await this.pokemonRepository.getPokemon(nextPokemonId)

		const otherPokemonOptions = await this.getPokemonQuizOptions(
			selectedPokemonData,
			pokemonStore.getFullSelectedGenerationsPokemonIds,
		)

		return {
			pokemon: selectedPokemonData,
			pokemonQuizOptions: otherPokemonOptions,
		}
	}

	async getPokemonQuizOptions(selectedPokemon: PokemonModel, pokemonIds: number[]): Promise<PokemonOptions[]> {
		const pokemonQuizOptions: PokemonOptions[] = [
			{
				id: selectedPokemon.id,
				name: selectedPokemon.name,
				selected: false,
			},
		]

		const otherRandomPokemonIds = this.getRandomNumbersExcluding(pokemonIds, selectedPokemon.id)

		for (const pokemonId of otherRandomPokemonIds) {
			const pokemonData = await this.pokemonRepository.getPokemon(pokemonId)

			pokemonQuizOptions.push({
				id: pokemonId,
				name: pokemonData.name,
				selected: false,
			})
		}

		return pokemonQuizOptions.sort((a, b) => a.name.localeCompare(b.name))
	}

	getRandomNumbersExcluding(numbersList: number[], excludedNumber: number, count = 3): number[] {
		const filteredArray = numbersList.filter((num) => num !== excludedNumber)
		const randomNumbers: number[] = []

		for (let i = 0; i < count; i++) {
			const randomIndex = Math.floor(Math.random() * filteredArray.length)
			randomNumbers.push(filteredArray[randomIndex])
		}

		return randomNumbers
	}
}
