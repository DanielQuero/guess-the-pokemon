import { container } from 'inversify-props'
import { CONFIG_TYPES } from './application/types/ConfigTypes'
import type { IHttpApi } from './domain/http/HttpApi'
import type { IUrlBuilder } from './domain/http/UrlBuilder'
import { HttpApi } from './infrastructure/http/HttpApi'
import { UrlBuilder } from './infrastructure/http/UrlBuilder'

export class DiContainer {
	constructor() {
		this.bindHttpDependencies()
	}

	// This function exists so it looks like a plugin for vue and now can be instancied in main.js
	// eslint-disable-next-line
	install(app: any): void {}

	private bindHttpDependencies() {
		container.bind<IHttpApi>(CONFIG_TYPES.HTTP_API).to(HttpApi).inSingletonScope()
		container.bind<IUrlBuilder>(CONFIG_TYPES.URL_BUILDER).to(UrlBuilder).inSingletonScope()
	}
}
