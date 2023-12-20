import { injectable } from 'inversify-props'
import { usePokemonStore } from '@/application/stores/pokemon/pokemon'

@injectable()
export class SaveCorrectPokemon {
	constructor() {}

	async execute(pokemonId: number): Promise<void> {
		const pokemonStore = usePokemonStore()

		pokemonStore.addCorrectPokemon(pokemonId)
		pokemonStore.removeIdFromPokemonIdsLeft(pokemonId)
	}
}
