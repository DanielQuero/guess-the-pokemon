import { inject, injectable } from 'inversify-props'
import { POKEMON_TYPES } from '@/application/types/PokemonTypes'
import { PokemonRepository } from '@/domain/repositories/pokemonRepository'
import type { PokemonModel } from '@/domain/models/pokemon/pokemon.model'

@injectable()
export class GetRandomPokemon {
	constructor(@inject(POKEMON_TYPES.POKEMON_REPOSITORY) private pokemonRepository: PokemonRepository) {}

	async execute(): Promise<PokemonModel> {
		const randomPokemonId = Math.random() * 151 + 1 // for now we will just use the first generation
		const pokedexNum = Math.floor(randomPokemonId)

		return await this.pokemonRepository.getPokemon(pokedexNum)
	}
}
