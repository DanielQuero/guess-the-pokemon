import { inject, injectable } from 'inversify-props'
import { POKEMON_TYPES } from '@/application/types/PokemonTypes'
import { PokemonRepository } from '@/domain/repositories/pokemonRepository'
import type { PokemonModel } from '@/domain/models/pokemon/pokemon.model'

@injectable()
export class GetOthersRandomPokemon {
	constructor(@inject(POKEMON_TYPES.POKEMON_REPOSITORY) private pokemonRepository: PokemonRepository) {}

	async execute(selectedPokemonId: number): Promise<PokemonModel[]> {
		const excludedNumbers: number[] = [selectedPokemonId]
		const pokemonList: PokemonModel[] = []

		for (let index = 0; index < 3; index++) {
			const randomDifferentPokemonId = this.getRandomNumberWithExclusions(1, 152, excludedNumbers)
			const randomPokemon = await this.pokemonRepository.getPokemon(randomDifferentPokemonId)

			pokemonList.push(randomPokemon)
			excludedNumbers.push(randomPokemon.id)
		}

		return pokemonList
	}

	getRandomNumberWithExclusions(min: number, max: number, exclusions: number[]): number {
		const exclusionsSet = new Set(exclusions)

		while (true) {
			const randomNumber: number = Math.floor(Math.random() * (max - min + 1)) + min

			if (!exclusionsSet.has(randomNumber)) {
				return randomNumber
			}
		}
	}
}
