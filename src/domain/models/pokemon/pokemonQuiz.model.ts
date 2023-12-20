import type { PokemonModel } from './pokemon.model'

export interface PokemonQuizModel {
	pokemon: PokemonModel | null
	pokemonQuizOptions: PokemonOptions[]
}

export interface PokemonOptions {
	id: number
	name: string
	selected: boolean
}
