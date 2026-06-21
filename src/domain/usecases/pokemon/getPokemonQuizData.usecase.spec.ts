import { describe, it, expect, vi } from 'vitest'
import { container } from '@/diContainer'
import { POKEMON_TYPES } from '@/application/types/PokemonTypes'
import { GetPokemonQuizData } from './getPokemonQuizData.usecase'
import { PokemonRepository } from '@/domain/repositories/pokemonRepository'
import type { QuizStateRepository } from '@/domain/repositories/pokemon/quizStateRepository'

describe('GetPokemonQuizData UseCase', () => {
	it('should resolve use case and fetch pokemon quiz data correctly with mocked repositories', async () => {
		// Define mock implementations
		const mockPokemonRepository = {
			getPokemon: vi.fn().mockImplementation((id: number) => {
				return Promise.resolve({
					id,
					height: 10,
					name: `pokemon-${id}`,
					image: `image-${id}`,
					weight: 100,
				})
			}),
		}

		const mockQuizStateRepository: QuizStateRepository = {
			resetAll: vi.fn(),
			setGenerations: vi.fn(),
			setFullSelectedGenerationsPokemonIds: vi.fn(),
			shufflePokemonIds: vi.fn(),
			setPokemonIds: vi.fn(),
			getFullSelectedGenerationsPokemonIds: vi.fn().mockReturnValue([1, 2, 3, 4]),
			getNextPokemonId: vi.fn().mockReturnValue(1),
			addCorrectPokemon: vi.fn(),
			removeIdFromPokemonIdsLeft: vi.fn(),
			resetPokemonLeft: vi.fn(),
		}

		// Rebind dependencies inside container
		container.rebind<PokemonRepository>(POKEMON_TYPES.POKEMON_REPOSITORY).toConstantValue(mockPokemonRepository as any)
		container.rebind<QuizStateRepository>(POKEMON_TYPES.QUIZ_STATE_REPOSITORY).toConstantValue(mockQuizStateRepository)

		const usecase = container.get<GetPokemonQuizData>(POKEMON_TYPES.GET_POKEMON_QUIZ_DATA)

		const result = await usecase.execute()

		// Assert correct pokemon was fetched
		expect(mockQuizStateRepository.getNextPokemonId).toHaveBeenCalled()
		expect(mockPokemonRepository.getPokemon).toHaveBeenCalledWith(1)

		// Assert options are resolved
		expect(result.pokemon).not.toBeNull()
		expect(result.pokemon?.id).toBe(1)
		expect(result.pokemonQuizOptions.length).toBe(4)
		expect(result.pokemonQuizOptions.some((opt) => opt.id === 1)).toBe(true)
	})
})
