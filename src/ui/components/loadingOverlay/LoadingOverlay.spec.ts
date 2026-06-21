import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LoadingOverlay from './LoadingOverlay.vue'

describe('LoadingOverlay.vue', () => {
	it('should render the loading page container', () => {
		const wrapper = mount(LoadingOverlay, {
			props: {
				loading: true,
			},
		})
		expect(wrapper.find('.loading-page').exists()).toBe(true)
	})
})
