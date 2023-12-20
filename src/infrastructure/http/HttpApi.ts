import { injectable, inject } from 'inversify'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import type { IHttpApi } from '@/domain/http/HttpApi'
import type { IUrlBuilder } from '@/domain/http/UrlBuilder'
import { CONFIG_TYPES } from '@/application/types/ConfigTypes'
import type { HttpParams } from '@/domain/http/HttpParams'

@injectable()
export class HttpApi implements IHttpApi {
	private readonly axiosInstance: AxiosInstance

	constructor(@inject(CONFIG_TYPES.URL_BUILDER) private readonly urlBuilder: IUrlBuilder) {
		this.axiosInstance = axios.create()
	}

	private buildUrl(url: string, params: HttpParams = {}): string {
		return this.urlBuilder.setPath(url).setQueryParams(params).build()
	}

	async get(url: string, params?: HttpParams, config?: AxiosRequestConfig): Promise<any> {
		const builtUrl = this.buildUrl(url, params)
		const response: AxiosResponse = await this.axiosInstance.get(builtUrl, config)

		return response.data
	}

	async post(url: string, params?: HttpParams, config?: AxiosRequestConfig): Promise<any> {
		const builtUrl = this.buildUrl(url)
		const response: AxiosResponse = await this.axiosInstance.post(builtUrl, params, config)

		return response.data
	}

	async put(url: string, params?: HttpParams, config?: AxiosRequestConfig): Promise<any> {
		const builtUrl = this.buildUrl(url)
		const response: AxiosResponse = await this.axiosInstance.put(builtUrl, params, config)

		return response.data
	}

	async patch(url: string, params?: HttpParams, config?: AxiosRequestConfig): Promise<any> {
		const builtUrl = this.buildUrl(url, params)
		const response: AxiosResponse = await this.axiosInstance.patch(builtUrl, params, config)

		return response.data
	}

	async delete(url: string, params?: HttpParams, config?: AxiosRequestConfig): Promise<any> {
		const builtUrl = this.buildUrl(url, params)
		const response: AxiosResponse = await this.axiosInstance.delete(builtUrl, config)

		return response.data
	}
}
