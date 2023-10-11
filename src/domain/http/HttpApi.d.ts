import { AxiosRequestConfig } from 'axios'

export interface IHttpApi {
	get(url: string, params?: HttpParams, config?: AxiosRequestConfig): Promise<any>
	post(url: string, params?: HttpParams, config?: AxiosRequestConfig): Promise<any>
	put(url: string, params?: HttpParams, config?: AxiosRequestConfig): Promise<any>
	patch(url: string, params?: HttpParams, config?: AxiosRequestConfig): Promise<any>
	delete(url: string, params?: HttpParams, config?: AxiosRequestConfig): Promise<any>
}
