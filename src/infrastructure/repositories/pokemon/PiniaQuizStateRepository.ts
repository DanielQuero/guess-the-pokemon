import { injectable } from 'inversify'
import { usePokemonStore } from '@/application/stores/pokemon/pokemon'
import type { QuizStateRepository } from '@/domain/repositories/pokemon/quizStateRepository'

@injectable()
export class PiniaQuizStateRepository implements QuizStateRepository {
	private get store() {
		return usePokemonStore()
	}

	resetAll(): void {
		this.store.resetAll()
	}

	setGenerations(generations: number[]): void {
		this.store.setGenerations(generations)
	}

	setFullSelectedGenerationsPokemonIds(pokemonIds: number[]): void {
		this.store.setFullSelectedGenerationsPokemonIds(pokemonIds)
	}

	shufflePokemonIds(): void {
		this.store.shufflePokemonIds()
	}

	setPokemonIds(pokemonIds: number[]): void {
		this.store.setPokemonIds(pokemonIds)
	}

	getFullSelectedGenerationsPokemonIds(): number[] {
		return this.store.getFullSelectedGenerationsPokemonIds
	}

	getNextPokemonId(): number {
		return this.store.getNextPokemonId
	}

	addCorrectPokemon(pokemonId: number): void {
		this.store.addCorrectPokemon(pokemonId)
	}

	removeIdFromPokemonIdsLeft(pokemonId: number): void {
		this.store.removeIdFromPokemonIdsLeft(pokemonId)
	}

	resetPokemonLeft(): void {
		this.store.resetPokemonLeft()
	}
}
