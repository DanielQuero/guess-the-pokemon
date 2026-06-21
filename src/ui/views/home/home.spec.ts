import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { container } from '@/diContainer'
import { POKEMON_TYPES } from '@/application/types/PokemonTypes'
import HomeView from './home.vue'

describe('HomeView.vue', () => {
	const mockRouter = {
		push: vi.fn(),
	}

	const mockGeneratePokemonForQuiz = {
		execute: vi.fn().mockResolvedValue(undefined),
	}

	beforeEach(() => {
		vi.clearAllMocks()
		container.rebind(POKEMON_TYPES.GENERATE_POKEMON_FOR_QUIZ).toConstantValue(mockGeneratePokemonForQuiz as any)
	})

	it('should render generations correctly', () => {
		const wrapper = mount(HomeView, {
			global: {
				mocks: {
					$router: mockRouter,
				},
			},
		})

		// Verify that we render generations (there are 9 generations)
		const labels = wrapper.findAll('label')
		expect(labels.length).toBe(9)
		expect(wrapper.text()).toContain('Generation I')
		expect(wrapper.text()).toContain('Generation IX')
	})

	it('should have start button disabled when no generation is selected', () => {
		const wrapper = mount(HomeView, {
			global: {
				mocks: {
					$router: mockRouter,
				},
			},
		})

		const button = wrapper.find('button')
		expect(button.attributes('disabled')).toBeDefined()
	})

	it('should enable start button when a generation is selected and call GeneratePokemonForQuiz & router on click', async () => {
		const wrapper = mount(HomeView, {
			global: {
				mocks: {
					$router: mockRouter,
				},
			},
		})

		// Verify initially disabled
		const button = wrapper.find('button')
		expect(button.element.disabled).toBe(true)

		// Select Generation I
		wrapper.vm.selectedGenerations = [1]
		await wrapper.vm.$nextTick()

		expect(button.element.disabled).toBe(false)

		// Click start button
		await button.trigger('click')

		// Assert usecase was executed with Gen 1
		expect(mockGeneratePokemonForQuiz.execute).toHaveBeenCalledWith([1])
		// Assert routed to Quiz view
		expect(mockRouter.push).toHaveBeenCalledWith({ name: 'Quiz' })
	})
})
