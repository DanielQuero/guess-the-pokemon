import { injectable } from 'inversify-props'
import { usePokemonStore } from '@/application/stores/pokemon/pokemon'

interface PokemonGenerationRange {
	start: number
	end: number
}

@injectable()
export class GeneratePokemonForQuiz {
	constructor() {}

	async execute(pokemonGenerations: number[]): Promise<void> {
		const pokemonStore = usePokemonStore()
		pokemonStore.resetAll()
		pokemonStore.setGenerations(pokemonGenerations)

		const pokemonIdsList: number[] = this.getPokemonIdsForGenerations(pokemonGenerations)
		pokemonStore.setFullSelectedGenerationsPokemonIds(pokemonIdsList)
		pokemonStore.shufflePokemonIds()
		pokemonStore.setPokemonIds(pokemonStore.fullSelectedGenerationsPokemonIds)
	}

	POKEMON_GENERATION_RANGES: Record<number, PokemonGenerationRange> = {
		1: { start: 1, end: 151 },
		2: { start: 152, end: 251 },
		3: { start: 252, end: 386 },
		4: { start: 387, end: 493 },
		5: { start: 494, end: 649 },
		6: { start: 650, end: 721 },
		7: { start: 722, end: 809 },
		8: { start: 810, end: 905 },
		9: { start: 906, end: 1017 },
	}

	getPokemonIdsForGenerations(generations: number[]): number[] {
		const allPokemonIds: number[] = []

		for (const generationNumber of generations) {
			const generationRange = this.POKEMON_GENERATION_RANGES[generationNumber]

			if (generationRange) {
				for (let i = generationRange.start; i <= generationRange.end; i++) {
					allPokemonIds.push(i)
				}
			}
		}

		return allPokemonIds
	}
}
