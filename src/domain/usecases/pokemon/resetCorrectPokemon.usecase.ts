import { injectable } from 'inversify-props'
import { usePokemonStore } from '@/application/stores/pokemon/pokemon'

@injectable()
export class ResetCorrectPokemon {
	constructor() {}

	async execute(): Promise<void> {
		const pokemonStore = usePokemonStore()

		pokemonStore.resetPokemonLeft()
	}
}
