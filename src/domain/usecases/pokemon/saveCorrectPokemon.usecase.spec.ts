import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { container } from '@/diContainer'
import { POKEMON_TYPES } from '@/application/types/PokemonTypes'
import { SaveCorrectPokemon } from './saveCorrectPokemon.usecase'
import type { QuizStateRepository } from '@/domain/repositories/pokemon/quizStateRepository'

describe('SaveCorrectPokemon UseCase', () => {
	beforeEach(() => {
		container.snapshot()
	})

	afterEach(() => {
		container.restore()
	})

	it('should execute saving correct pokemon and interact with state repository correctly', async () => {
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

		const usecase = container.get<SaveCorrectPokemon>(POKEMON_TYPES.SAVE_CORRECT_POKEMON)

		await usecase.execute(25)

		expect(mockQuizStateRepository.addCorrectPokemon).toHaveBeenCalledWith(25)
		expect(mockQuizStateRepository.removeIdFromPokemonIdsLeft).toHaveBeenCalledWith(25)
	})
})
