import { inject, injectable } from 'inversify-props'
import { PokemonRepository } from '@/domain/repositories/pokemonRepository'
import { CONFIG_TYPES } from '@/application/types/ConfigTypes'
import type { IHttpApi } from '@/domain/http/HttpApi'
import type { PokemonModel } from '@/domain/models/pokemon/pokemon.model'
import type { PokemonEntity } from './entities/pokemon.entity'
import { mapPokemonEntityToModel } from './mappers/pokemon.mapper'
import { POKEMON_MOCK } from '@/infrastructure/mocks/pokemon/pokemon.mock'

@injectable()
export class PokemonMockRepository implements PokemonRepository {
	baseUrl: string

	constructor(@inject(CONFIG_TYPES.HTTP_API) private readonly httpApi: IHttpApi) {
		this.baseUrl = `${import.meta.env.VITE_APP_BASE_URL}/${import.meta.env.VITE_APP_API_PREFIX}/${
			import.meta.env.VITE_APP_API_VERSION
		}/pokemon`
	}

	async getPokemon(id: number): Promise<PokemonModel> {
		const response: PokemonEntity = POKEMON_MOCK
		const pokemon: PokemonModel = mapPokemonEntityToModel(response)

		return Promise.resolve(pokemon)
	}
}
