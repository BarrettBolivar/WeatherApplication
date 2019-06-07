export declare type TGeneric = TObject | string | TObject[] | string[] | number | number[] | boolean | boolean[] | undefined | undefined[] | null | null[];
export declare type TNonNull = TObject | string | TObject[] | string[] | number | number[] | boolean | boolean[];
export declare type TObject = {
    [key: string]: TGeneric;
};
export type apiCall = {
	coord: {
		lat: number,
		lon: number
	}, 
	weather: [
		{
			id: number,
			main: string,
			description: string,
			icon: TNonNull
		}
	],
	base: string,
	main: {
		temp: number,
		pressure: number,
		humidity: number,
		temp_min: number,
		temp_max: number
	},
	visibility: number,
	wind: {
		speed: number,
    	deg: number
	},
	clouds: {
		all: number
	},
	dt: number,
	sys: object,
	id: number,
	name: string,
	cod: number
}

export type newsAPI = {
	status: string,
	totalResults: 37,
	articles: [
		{
		source: {
			id: string | null,
			name: string
		},
		author: string,
		title: string,
		description: string,
		url: string,
		urlToImage: string,
		publishedAt: string,
		content: string
		}
	]
}