import type { PokemonModel } from '@/domain/models/pokemon/pokemon.model'
import type { PokemonEntity } from '../entities/pokemon.entity'

export function mapPokemonEntityToModel(pokemon: PokemonEntity): PokemonModel {
	return {
		id: pokemon.id,
		height: pokemon.height,
		name: pokemon.name,
		image: pokemon.sprites?.other?.['official-artwork']?.front_default || '',
		weight: pokemon.weight,
	}
}
