import type { PokemonModel } from '../models/pokemon/pokemon.model'

export abstract class PokemonRepository {
	baseUrl?: string

	abstract getPokemon(id: number): Promise<PokemonModel>
}
