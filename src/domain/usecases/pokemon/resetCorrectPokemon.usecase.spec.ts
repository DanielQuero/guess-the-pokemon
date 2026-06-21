import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { container } from '@/diContainer'
import { POKEMON_TYPES } from '@/application/types/PokemonTypes'
import { ResetCorrectPokemon } from './resetCorrectPokemon.usecase'
import type { QuizStateRepository } from '@/domain/repositories/pokemon/quizStateRepository'

describe('ResetCorrectPokemon UseCase', () => {
	beforeEach(() => {
		container.snapshot()
	})

	afterEach(() => {
		container.restore()
	})

	it('should execute resetting of correct pokemon and call resetPokemonLeft on the repository', async () => {
		const mockQuizStateRepository: QuizStateRepository = {
			resetAll: vi.fn(),
			setGenerations: vi.fn(),
			setFullSelectedGenerationsPokemonIds: vi.fn(),
			shufflePokemonIds: vi.fn(),
			setPokemonIds: vi.fn(),
			getFullSelectedGenerationsPokemonIds: vi.fn(),
			getNextPokemonId: vi.fn(),
			addCorrectPokemon: vi.fn(),
			removeIdFromPokemonIdsLeft: vi.fn(),
			resetPokemonLeft: vi.fn(),
		}

		container.rebind<QuizStateRepository>(POKEMON_TYPES.QUIZ_STATE_REPOSITORY).toConstantValue(mockQuizStateRepository)

		const usecase = container.get<ResetCorrectPokemon>(POKEMON_TYPES.RESET_CORRECT_POKEMON)

		await usecase.execute()

		expect(mockQuizStateRepository.resetPokemonLeft).toHaveBeenCalled()
	})
})
