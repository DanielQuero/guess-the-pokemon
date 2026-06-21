/// <reference types="vitest" />
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import swc from 'unplugin-swc'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		...(process.env.VITEST ? [
			swc.vite({
				tsconfigFile: './tsconfig.app.json',
				exclude: [/src\/ui/],
				jsc: {
					parser: {
						syntax: 'typescript',
						decorators: true,
					},
					transform: {
						legacyDecorator: true,
						decoratorMetadata: true,
					},
				},
			}),
			swc.vite({
				tsconfigFile: './tsconfig.app.json',
				include: [/src\/ui/],
				jsc: {
					parser: {
						syntax: 'typescript',
						decorators: true,
					},
					transform: {
						legacyDecorator: true,
						decoratorMetadata: false,
					},
				},
			})
		] : [])
	],
	base: '/guess-the-pokemon/',
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	test: {
		globals: true,
		environment: 'happy-dom',
		setupFiles: ['./vitest.setup.ts'],
	}
})
