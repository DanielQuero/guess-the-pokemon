export interface IUrlBuilder {
	setPath(path: string): IUrlBuilder
	setQueryParams(params: HttpParams): IUrlBuilder
	build(): string
}
