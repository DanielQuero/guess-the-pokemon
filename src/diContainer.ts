import { container } from 'inversify-props'
import { CONFIG_TYPES } from './application/types/ConfigTypes'
import { POKEMON_TYPES } from './application/types/PokemonTypes'
import type { IHttpApi } from './domain/http/HttpApi'
import type { IUrlBuilder } from './domain/http/UrlBuilder'
import { PokemonRepository } from './domain/repositories/pokemonRepository'
import { GeneratePokemonForQuiz } from './domain/usecases/pokemon/generatePokemonForQuiz.usecase'
import { GetPokemonQuizData } from './domain/usecases/pokemon/getPokemonQuizData.usecase'
import { ResetCorrectPokemon } from './domain/usecases/pokemon/resetCorrectPokemon.usecase'
import { SaveCorrectPokemon } from './domain/usecases/pokemon/saveCorrectPokemon.usecase'
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

		container.bind(POKEMON_TYPES.GENERATE_POKEMON_FOR_QUIZ).to(GeneratePokemonForQuiz).inTransientScope()
		container.bind(POKEMON_TYPES.GET_POKEMON_QUIZ_DATA).to(GetPokemonQuizData).inTransientScope()
		container.bind(POKEMON_TYPES.SAVE_CORRECT_POKEMON).to(SaveCorrectPokemon).inTransientScope()
		container.bind(POKEMON_TYPES.RESET_CORRECT_POKEMON).to(ResetCorrectPokemon).inTransientScope()
	}
}
