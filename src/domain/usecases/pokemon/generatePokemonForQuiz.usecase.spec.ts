import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { container } from '@/diContainer'
import { POKEMON_TYPES } from '@/application/types/PokemonTypes'
import { GeneratePokemonForQuiz } from './generatePokemonForQuiz.usecase'
import type { QuizStateRepository } from '@/domain/repositories/pokemon/quizStateRepository'

describe('GeneratePokemonForQuiz UseCase', () => {
	beforeEach(() => {
		container.snapshot()
	})

	afterEach(() => {
		container.restore()
	})

	it('should execute generation of pokemon quiz and interact with state repository correctly', async () => {
		const mockQuizStateRepository: QuizStateRepository = {
			resetAll: vi.fn(),
			setGenerations: vi.fn(),
			setFullSelectedGenerationsPokemonIds: vi.fn(),
			shufflePokemonIds: vi.fn(),
			setPokemonIds: vi.fn(),
			getFullSelectedGenerationsPokemonIds: vi.fn().mockReturnValue([1, 2, 3]),
			getNextPokemonId: vi.fn(),
			addCorrectPokemon: vi.fn(),
			removeIdFromPokemonIdsLeft: vi.fn(),
			resetPokemonLeft: vi.fn(),
		}

		container.rebind<QuizStateRepository>(POKEMON_TYPES.QUIZ_STATE_REPOSITORY).toConstantValue(mockQuizStateRepository)

		const usecase = container.get<GeneratePokemonForQuiz>(POKEMON_TYPES.GENERATE_POKEMON_FOR_QUIZ)

		await usecase.execute([1])

		expect(mockQuizStateRepository.resetAll).toHaveBeenCalled()
		expect(mockQuizStateRepository.setGenerations).toHaveBeenCalledWith([1])

		// Assert that setFullSelectedGenerationsPokemonIds was called with 151 elements (1 to 151)
		expect(mockQuizStateRepository.setFullSelectedGenerationsPokemonIds).toHaveBeenCalled()
		const calledWithIds = vi.mocked(mockQuizStateRepository.setFullSelectedGenerationsPokemonIds).mock.calls[0][0]
		expect(calledWithIds.length).toBe(151)
		expect(calledWithIds[0]).toBe(1)
		expect(calledWithIds[150]).toBe(151)

		expect(mockQuizStateRepository.shufflePokemonIds).toHaveBeenCalled()
		expect(mockQuizStateRepository.setPokemonIds).toHaveBeenCalledWith([1, 2, 3])
	})
})
