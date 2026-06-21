import { inject, injectable } from 'inversify'
import { POKEMON_TYPES } from '@/application/types/PokemonTypes'
import type { QuizStateRepository } from '@/domain/repositories/pokemon/quizStateRepository'

@injectable()
export class SaveCorrectPokemon {
	constructor(
		@inject(POKEMON_TYPES.QUIZ_STATE_REPOSITORY)
		private readonly quizStateRepository: QuizStateRepository,
	) {}

	async execute(pokemonId: number): Promise<void> {
		this.quizStateRepository.addCorrectPokemon(pokemonId)
		this.quizStateRepository.removeIdFromPokemonIdsLeft(pokemonId)
	}
}
