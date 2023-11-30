export interface PokemonEntity {
	abilities: Ability[]
	base_experience: number
	forms: Species[]
	game_indices: GameIndex[]
	height: number
	held_items: HeldItem[]
	id: number
	is_default: boolean
	location_area_encounters: string
	moves: Move[]
	name: string
	order: number
	past_types: any[]
	species: Species
	sprites: Sprites
	stats: Stat[]
	types: Type[]
	weight: number
}

export interface Ability {
	ability: Species
	is_hidden: boolean
	slot: number
}

export interface Species {
	name: string
	url: string
}

export interface GameIndex {
	game_index: number
	version: Species
}

export interface HeldItem {
	item: Species
	version_details: VersionDetail[]
}

export interface VersionDetail {
	rarity: number
	version: Species
}

export interface Move {
	move: Species
	version_group_details: VersionGroupDetail[]
}

export interface VersionGroupDetail {
	level_learned_at: number
	move_learn_method: Species
	version_group: Species
}

export interface Versions {
	[version: string]: GenerationSprite
}

export interface GenerationSprite {
	[generation: string]: Sprites
}

export interface Sprites {
	front_default: string
	front_shiny?: string
	front_female?: string | null
	front_shiny_female?: string
	front_gray?: string
	back_default?: string
	back_shiny?: string
	back_female?: string
	back_shiny_female?: string
	back_gray?: string
	other?: Other
	versions?: Versions
	animated?: Sprites
	front_transparent?: string
	back_shiny_transparent?: string
	back_transparent?: string
	front_shiny_transparent?: string
}

export interface OfficialArtwork {
	front_default: string
	front_shiny: string
}

export interface Home {
	front_default: string
	front_female: string
	front_shiny: string
	front_shiny_female: string
}

export interface DreamWorld {
	front_default: string
	front_female: null | string
}

export interface Other {
	dream_world: DreamWorld
	home: Home
	'official-artwork': OfficialArtwork
}

export interface Stat {
	base_stat: number
	effort: number
	stat: Species
}

export interface Type {
	slot: number
	type: Species
}
