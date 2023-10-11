import type { HttpParams } from '@/domain/http/HttpParams'
import type { IUrlBuilder } from '@/domain/http/UrlBuilder'
import { injectable } from 'inversify'

@injectable()
export class UrlBuilder implements IUrlBuilder {
	private path: string
	private queryParams: HttpParams

	constructor() {
		this.path = ''
		this.queryParams = {}
	}

	setPath(path: string): IUrlBuilder {
		this.path = path
		return this
	}

	setQueryParams(params: HttpParams): IUrlBuilder {
		this.queryParams = params
		return this
	}

	build(): string {
		const queryString = Object.keys(this.queryParams)
			.map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(this.queryParams[key])}`)
			.join('&')

		return `${this.path}${queryString ? `?${queryString}` : ''}`
	}
}
