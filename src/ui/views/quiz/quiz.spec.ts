import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { container } from '@/diContainer'
import { POKEMON_TYPES } from '@/application/types/PokemonTypes'
import { usePokemonStore } from '@/application/stores/pokemon/pokemon'
import QuizView from './quiz.vue'

describe('QuizView.vue', () => {
	const mockRouter = {
		push: vi.fn(),
	}

	const mockRoute = {
		name: 'Quiz',
	}

	const mockGetPokemonQuizData = {
		execute: vi.fn().mockImplementation(() =>
			Promise.resolve({
				pokemon: { id: 25, name: 'pikachu', image: 'pikachu.png' },
				pokemonQuizOptions: [
					{ id: 25, name: 'pikachu', selected: false },
					{ id: 4, name: 'charmander', selected: false },
					{ id: 7, name: 'squirtle', selected: false },
					{ id: 1, name: 'bulbasaur', selected: false },
				],
			}),
		),
	}

	const mockSaveCorrectPokemon = {
		execute: vi.fn().mockResolvedValue(undefined),
	}

	const mockResetCorrectPokemon = {
		execute: vi.fn().mockResolvedValue(undefined),
	}

	beforeEach(() => {
		vi.useFakeTimers()
		vi.clearAllMocks()
		setActivePinia(createPinia())

		container.rebind(POKEMON_TYPES.GET_POKEMON_QUIZ_DATA).toConstantValue(mockGetPokemonQuizData as any)
		container.rebind(POKEMON_TYPES.SAVE_CORRECT_POKEMON).toConstantValue(mockSaveCorrectPokemon as any)
		container.rebind(POKEMON_TYPES.RESET_CORRECT_POKEMON).toConstantValue(mockResetCorrectPokemon as any)
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	const setupStoreForQuiz = () => {
		const store = usePokemonStore()
		store.setFullSelectedGenerationsPokemonIds([25, 4, 7])
		store.setPokemonIds([25, 4, 7])
	}

	it('should redirect to home if quiz is not generated', () => {
		// Store is empty initially, so isQuizGenerated is false
		mount(QuizView, {
			global: {
				mocks: {
					$router: mockRouter,
					$route: mockRoute,
				},
			},
		})

		expect(mockRouter.push).toHaveBeenCalledWith({ name: 'Home' })
	})

	it('should fetch and display quiz data', async () => {
		setupStoreForQuiz()

		const wrapper = mount(QuizView, {
			global: {
				mocks: {
					$router: mockRouter,
					$route: mockRoute,
				},
			},
		})

		// Wait for usecase promise to resolve
		await wrapper.vm.$nextTick()
		await vi.runAllTimersAsync()
		await wrapper.vm.$nextTick()

		expect(mockGetPokemonQuizData.execute).toHaveBeenCalled()
		expect(wrapper.vm.loading).toBe(false)

		// Assert options are displayed
		const buttons = wrapper.findAll('.pokemon-name-options button')
		expect(buttons.length).toBe(4)
		expect(buttons[0].text()).toBe('pikachu')
		expect(buttons[1].text()).toBe('charmander')

		// Silhouette is shown
		const img = wrapper.find('.pokemon-silhouette')
		expect(img.attributes('src')).toBe('pikachu.png')
	})

	it('should handle correct option click', async () => {
		setupStoreForQuiz()

		const wrapper = mount(QuizView, {
			global: {
				mocks: {
					$router: mockRouter,
					$route: mockRoute,
				},
			},
		})

		await wrapper.vm.$nextTick()
		await vi.runAllTimersAsync()
		await wrapper.vm.$nextTick()

		// Click pikachu (correct option)
		const buttons = wrapper.findAll('.pokemon-name-options button')
		const pikachuButton = buttons.find((b) => b.text() === 'pikachu')
		expect(pikachuButton).toBeDefined()

		await pikachuButton!.trigger('click')

		// Should call SaveCorrectPokemon
		expect(mockSaveCorrectPokemon.execute).toHaveBeenCalledWith(25)

		// Button bg color should be bg-positive
		expect(pikachuButton!.classes()).toContain('bg-positive')

		// Silhouette should show (unveil)
		expect(wrapper.vm.showPokemon).toBe(true)

		// Progress bar should be visible and start animate
		expect(wrapper.vm.showProgressBar).toBe(true)

		// Advance timers for the fulfillment and subsequent next pokemon loading
		vi.advanceTimersByTime(100)
		expect(wrapper.vm.waitingForNextPokemonBar.classList.contains('w-full')).toBe(true)

		vi.advanceTimersByTime(2000)
		await wrapper.vm.$nextTick()
		expect(mockGetPokemonQuizData.execute).toHaveBeenCalledTimes(2)
	})

	it('should handle incorrect option click', async () => {
		setupStoreForQuiz()

		const wrapper = mount(QuizView, {
			global: {
				mocks: {
					$router: mockRouter,
					$route: mockRoute,
				},
			},
		})

		await wrapper.vm.$nextTick()
		await vi.runAllTimersAsync()
		await wrapper.vm.$nextTick()

		// Click charmander (incorrect option)
		const buttons = wrapper.findAll('.pokemon-name-options button')
		const charmanderButton = buttons.find((b) => b.text() === 'charmander')
		const pikachuButton = buttons.find((b) => b.text() === 'pikachu')
		expect(charmanderButton).toBeDefined()

		await charmanderButton!.trigger('click')
		await wrapper.vm.$nextTick()

		// Should NOT call SaveCorrectPokemon
		expect(mockSaveCorrectPokemon.execute).not.toHaveBeenCalled()

		// Selected incorrect option has bg-negative
		expect(charmanderButton!.classes()).toContain('bg-negative')
		// Correct option has bg-positive
		expect(pikachuButton!.classes()).toContain('bg-positive')

		// Should show retry arrow
		expect(wrapper.vm.showRetry).toBe(true)
	})

	it('should render congrats screen when finished', async () => {
		// Mock store state as finished (fullSelectedGenerations exists, pokemonIdsLeft is empty)
		const store = usePokemonStore()
		store.setFullSelectedGenerationsPokemonIds([25])
		store.setPokemonIds([])

		const wrapper = mount(QuizView, {
			global: {
				mocks: {
					$router: mockRouter,
					$route: mockRoute,
				},
			},
		})

		await wrapper.vm.$nextTick()
		await vi.runAllTimersAsync()
		await wrapper.vm.$nextTick()

		// Since isQuizFinished() is true inside created(), it'll redirect back to Home
		expect(mockRouter.push).toHaveBeenCalledWith({ name: 'Home' })

		// Now let's simulate the scenario where we have 1 left, and we click the correct one, making it finished
		mockRouter.push.mockClear()
		store.setFullSelectedGenerationsPokemonIds([25])
		store.setPokemonIds([25])

		const wrapper2 = mount(QuizView, {
			global: {
				mocks: {
					$router: mockRouter,
					$route: mockRoute,
				},
			},
		})

		await wrapper2.vm.$nextTick()
		await vi.runAllTimersAsync()
		await wrapper2.vm.$nextTick()

		// Simulate correct click
		const buttons = wrapper2.findAll('.pokemon-name-options button')
		const pikachuButton = buttons.find((b) => b.text() === 'pikachu')

		// Update store to say it's finished (pokemonIdsLeft empty)
		store.setPokemonIds([])

		await pikachuButton!.trigger('click')

		await wrapper2.vm.$nextTick()
		expect(wrapper2.vm.showCongratsMessage).toBe(true)
		expect(wrapper2.text()).toContain('Congrats!')
		expect(wrapper2.text()).toContain('You catch them all!!')
	})

	it('should handle quiz retries', async () => {
		setupStoreForQuiz()

		const wrapper = mount(QuizView, {
			global: {
				mocks: {
					$router: mockRouter,
					$route: mockRoute,
				},
			},
		})

		await wrapper.vm.$nextTick()
		await vi.runAllTimersAsync()
		await wrapper.vm.$nextTick()

		const store = usePokemonStore()
		const shuffleSpy = vi.spyOn(store, 'shufflePokemonIds')

		await wrapper.vm.retryQuiz()

		expect(shuffleSpy).toHaveBeenCalled()
		expect(mockResetCorrectPokemon.execute).toHaveBeenCalled()
		expect(wrapper.vm.showCongratsMessage).toBe(false)
		expect(mockGetPokemonQuizData.execute).toHaveBeenCalled()
	})
})
