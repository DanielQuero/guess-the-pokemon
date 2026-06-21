import { inject, injectable } from 'inversify'
import { POKEMON_TYPES } from '@/application/types/PokemonTypes'
import type { QuizStateRepository } from '@/domain/repositories/pokemon/quizStateRepository'

@injectable()
export class ResetCorrectPokemon {
	constructor(
		@inject(POKEMON_TYPES.QUIZ_STATE_REPOSITORY)
		private readonly quizStateRepository: QuizStateRepository,
	) {}

	async execute(): Promise<void> {
		this.quizStateRepository.resetPokemonLeft()
	}
}
