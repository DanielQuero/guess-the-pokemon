import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePokemonStore } from './pokemon'

describe('Pokemon Pinia Store', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
	})

	it('should initialize with default state', () => {
		const store = usePokemonStore()
		expect(store.selectedGenerations).toEqual([])
		expect(store.fullSelectedGenerationsPokemonIds).toEqual([])
		expect(store.pokemonIdsLeft).toEqual([])
		expect(store.correctPokemonIds).toEqual([])
		expect(store.isQuizGenerated).toBe(false)
		expect(store.isQuizFinished).toBe(false)
	})

	it('should set generations', () => {
		const store = usePokemonStore()
		store.setGenerations([1, 2])
		expect(store.selectedGenerations).toEqual([1, 2])
		expect(store.getSelectedGenerations).toEqual([1, 2])
	})

	it('should set pokemon ids left', () => {
		const store = usePokemonStore()
		store.setPokemonIds([1, 2, 3])
		expect(store.pokemonIdsLeft).toEqual([1, 2, 3])
		expect(store.getPokemonIdsLeft).toEqual([1, 2, 3])
	})

	it('should set full selected generations pokemon ids', () => {
		const store = usePokemonStore()
		store.setFullSelectedGenerationsPokemonIds([10, 20, 30])
		expect(store.fullSelectedGenerationsPokemonIds).toEqual([10, 20, 30])
		expect(store.getFullSelectedGenerationsPokemonIds).toEqual([10, 20, 30])
	})

	it('should compute isQuizGenerated correctly', () => {
		const store = usePokemonStore()
		expect(store.isQuizGenerated).toBe(false)
		store.setFullSelectedGenerationsPokemonIds([1, 2])
		expect(store.isQuizGenerated).toBe(true)
	})

	it('should compute isQuizFinished correctly', () => {
		const store = usePokemonStore()
		expect(store.isQuizFinished).toBe(false)

		store.setFullSelectedGenerationsPokemonIds([1, 2])
		store.setPokemonIds([1, 2])
		expect(store.isQuizFinished).toBe(false)

		store.setPokemonIds([])
		expect(store.isQuizFinished).toBe(true)
	})

	it('should return correct counts', () => {
		const store = usePokemonStore()
		expect(store.countPokemonIdsCorrect).toBe(0)
		expect(store.countPokemonIdsTotal).toBe(0)

		store.setFullSelectedGenerationsPokemonIds([1, 2, 3, 4])
		store.addCorrectPokemon(1)
		store.addCorrectPokemon(2)

		expect(store.countPokemonIdsCorrect).toBe(2)
		expect(store.countPokemonIdsTotal).toBe(4)
	})

	it('should add correct pokemon ID', () => {
		const store = usePokemonStore()
		store.addCorrectPokemon(151)
		expect(store.correctPokemonIds).toEqual([151])
		expect(store.getCorrectPokemonIds).toEqual([151])
	})

	it('should remove id from pokemon ids left', () => {
		const store = usePokemonStore()
		store.setPokemonIds([5, 10, 15])
		store.removeIdFromPokemonIdsLeft(10)
		expect(store.pokemonIdsLeft).toEqual([5, 15])
	})

	it('should reset all', () => {
		const store = usePokemonStore()
		store.setGenerations([1])
		store.setFullSelectedGenerationsPokemonIds([1, 2])
		store.setPokemonIds([1, 2])
		store.addCorrectPokemon(1)

		store.resetAll()

		expect(store.selectedGenerations).toEqual([])
		expect(store.fullSelectedGenerationsPokemonIds).toEqual([])
		expect(store.pokemonIdsLeft).toEqual([])
		expect(store.correctPokemonIds).toEqual([])
	})

	it('should reset pokemon left to fullSelectedGenerationsPokemonIds and clear correctPokemonIds', () => {
		const store = usePokemonStore()
		store.setFullSelectedGenerationsPokemonIds([1, 2, 3])
		store.setPokemonIds([3])
		store.addCorrectPokemon(1)
		store.addCorrectPokemon(2)

		store.resetPokemonLeft()

		expect(store.pokemonIdsLeft).toEqual([1, 2, 3])
		expect(store.correctPokemonIds).toEqual([])
	})

	it('should shuffle pokemon ids', () => {
		const store = usePokemonStore()
		// Setup enough numbers to reliably shuffle differently (or at least check that the method runs)
		const ids = Array.from({ length: 50 }, (_, i) => i + 1)
		store.setFullSelectedGenerationsPokemonIds([...ids])

		store.shufflePokemonIds()

		expect(store.fullSelectedGenerationsPokemonIds).toHaveLength(50)
		expect(store.fullSelectedGenerationsPokemonIds).toContain(1)
		expect(store.fullSelectedGenerationsPokemonIds).toContain(50)
	})
})
