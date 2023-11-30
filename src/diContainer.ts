import { container } from 'inversify-props'
import { CONFIG_TYPES } from './application/types/ConfigTypes'
import { POKEMON_TYPES } from './application/types/PokemonTypes'
import type { IHttpApi } from './domain/http/HttpApi'
import type { IUrlBuilder } from './domain/http/UrlBuilder'
import { PokemonRepository } from './domain/repositories/pokemonRepository'
import { GetOthersRandomPokemon } from './domain/usecases/pokemon/getOthersRandomPokemon.usecase'
import { GetRandomPokemon } from './domain/usecases/pokemon/getRandomPokemon.usecase'
import { HttpApi } from './infrastructure/http/HttpApi'
import { UrlBuilder } from './infrastructure/http/UrlBuilder'
import { PokemonRemoteRepository } from './infrastructure/repositories/pokemon/PokemonRemoteRepository'

export class DiContainer {
	constructor() {
		this.bindHttpDependencies()
		this.bindPokemonDependencies()
	}

	// This function exists so it looks like a plugin for vue and now can be instancied in main.js
	// eslint-disable-next-line
	install(app: any): void {}

	private bindHttpDependencies() {
		container.bind<IHttpApi>(CONFIG_TYPES.HTTP_API).to(HttpApi).inSingletonScope()
		container.bind<IUrlBuilder>(CONFIG_TYPES.URL_BUILDER).to(UrlBuilder).inSingletonScope()
	}

	private bindPokemonDependencies() {
		container.bind<PokemonRepository>(POKEMON_TYPES.POKEMON_REPOSITORY).to(PokemonRemoteRepository).inSingletonScope()

		container.bind(POKEMON_TYPES.GET_RANDOM_POKEMON).to(GetRandomPokemon).inTransientScope()
		container.bind(POKEMON_TYPES.GET_OTHERS_RANDOM_POKEMON).to(GetOthersRandomPokemon).inTransientScope()
	}
}
