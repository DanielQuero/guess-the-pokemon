export interface QuizStateRepository {
	resetAll(): void
	setGenerations(generations: number[]): void
	setFullSelectedGenerationsPokemonIds(pokemonIds: number[]): void
	shufflePokemonIds(): void
	setPokemonIds(pokemonIds: number[]): void
	getFullSelectedGenerationsPokemonIds(): number[]
	getNextPokemonId(): number
	addCorrectPokemon(pokemonId: number): void
	removeIdFromPokemonIdsLeft(pokemonId: number): void
	resetPokemonLeft(): void
}
