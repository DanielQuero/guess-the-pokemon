import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { container } from '@/diContainer'
import { POKEMON_TYPES } from '@/application/types/PokemonTypes'
import type { QuizStateRepository } from '@/domain/repositories/pokemon/quizStateRepository'
import { usePokemonStore } from '@/application/stores/pokemon/pokemon'

describe('PiniaQuizStateRepository Integration', () => {
	let repository: QuizStateRepository
	let store: ReturnType<typeof usePokemonStore>

	beforeEach(() => {
		setActivePinia(createPinia())
		repository = container.get<QuizStateRepository>(POKEMON_TYPES.QUIZ_STATE_REPOSITORY)
		store = usePokemonStore()
	})

	it('should set and get generations correctly through store', () => {
		repository.setGenerations([1, 3])
		expect(store.selectedGenerations).toEqual([1, 3])
	})

	it('should set and get fullSelectedGenerationsPokemonIds correctly', () => {
		repository.setFullSelectedGenerationsPokemonIds([10, 20, 30])
		expect(store.fullSelectedGenerationsPokemonIds).toEqual([10, 20, 30])
		expect(repository.getFullSelectedGenerationsPokemonIds()).toEqual([10, 20, 30])
	})

	it('should set pokemon ids left correctly', () => {
		repository.setPokemonIds([5, 10])
		expect(store.pokemonIdsLeft).toEqual([5, 10])
	})

	it('should get next pokemon id correctly', () => {
		store.setPokemonIds([42, 43])
		expect(repository.getNextPokemonId()).toBe(42)
	})

	it('should add correct pokemon correctly', () => {
		repository.addCorrectPokemon(25)
		expect(store.correctPokemonIds).toEqual([25])
	})

	it('should remove id from pokemon ids left correctly', () => {
		store.setPokemonIds([1, 2, 3])
		repository.removeIdFromPokemonIdsLeft(2)
		expect(store.pokemonIdsLeft).toEqual([1, 3])
	})

	it('should reset all correctly', () => {
		store.setGenerations([1])
		store.setFullSelectedGenerationsPokemonIds([1, 2])
		store.setPokemonIds([1, 2])
		store.addCorrectPokemon(1)

		repository.resetAll()

		expect(store.selectedGenerations).toEqual([])
		expect(store.fullSelectedGenerationsPokemonIds).toEqual([])
		expect(store.pokemonIdsLeft).toEqual([])
		expect(store.correctPokemonIds).toEqual([])
	})

	it('should reset pokemon left correctly', () => {
		store.setFullSelectedGenerationsPokemonIds([1, 2, 3])
		store.setPokemonIds([3])
		store.addCorrectPokemon(1)

		repository.resetPokemonLeft()

		expect(store.pokemonIdsLeft).toEqual([1, 2, 3])
		expect(store.correctPokemonIds).toEqual([])
	})

	it('should shuffle pokemon ids correctly', () => {
		const originalIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
		store.setFullSelectedGenerationsPokemonIds([...originalIds])

		repository.shufflePokemonIds()

		expect(store.fullSelectedGenerationsPokemonIds).toHaveLength(10)
		expect(store.fullSelectedGenerationsPokemonIds).toContain(1)
		expect(store.fullSelectedGenerationsPokemonIds).toContain(10)
	})
})
