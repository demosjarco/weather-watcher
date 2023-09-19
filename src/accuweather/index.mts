import type { Bindings } from '../types';
import type { currentWeatherConditionsJsonResult, geoPositionSearchJsonResult } from './types';

export class AccuWeather {
	private env: Bindings;
	private ctx: ExecutionContext;

	private cache = caches.default;

	constructor(env: Bindings, ctx: ExecutionContext) {
		this.env = env;
		this.ctx = ctx;
	}

	private cacheFetchPromise(request: Request) {
		return new Promise<Response>((resolve, reject) => {
			this.cache
				.match(request)
				.then((response) => {
					if (response) {
						console.info('Cache hit for:', request.url);

						resolve(response);
					} else {
						reject();
					}
				})
				.catch(reject);
		});
	}

	private externalFetchPromise(request: Request, cacheSeconds = 60 * 60 * 24) {
		console.info('Response for request url:', request.url, 'not present in cache. Fetching and caching request.');

		return new Promise<Response>((resolve, reject) => {
			fetch(request)
				.then(async (response) => {
					if (response.ok) {
						const tempResponse = new Response(response.body, response);

						if (!tempResponse.headers.has('ETag')) {
							// Create a SHA-256 digest stream and pipe the body into it
							const digestStream = new crypto.DigestStream('SHA-512');
							tempResponse.clone().body?.pipeTo(digestStream);
							// Get the final result
							const digest = await digestStream.digest;
							// Turn it into a hex string
							const hexString = [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
							// Set a header with the SHA-256 hash and return the response
							tempResponse.headers.set('ETag', hexString);
						}

						tempResponse.headers.append('Cache-Control', `s-maxage=${cacheSeconds}`);

						this.ctx.waitUntil(this.cache.put(request, tempResponse.clone()));

						resolve(tempResponse);
					} else {
						reject(response.status);
					}
				})
				.catch(reject);
		});
	}

	private cacheableFetch(input: RequestInfo<unknown, CfProperties<unknown>>, init: RequestInit<RequestInitCfProperties> = {}) {
		init = {
			...{
				cf: {
					cacheTtl: 60 * 60 * 24,
					minify: {
						javascript: true,
						css: true,
						html: true,
					},
				},
			},
			...init,
		};

		const apiRequest = new Request(input, init);

		return new Promise<Response>((resolve, reject) => {
			this.cacheFetchPromise(apiRequest)
				.then(resolve)
				.catch((error) =>
					this.externalFetchPromise(apiRequest, init.cf?.cacheTtl)
						.then(resolve)
						.catch(reject),
				);
		});
	}

	public geoPositionSearch(lat: string, lon: string) {
		const apiURL = new URL('http://dataservice.accuweather.com/locations/v1/cities/geoposition/search');
		apiURL.searchParams.set('apikey', this.env.ACCUWEATHER_API_KEY);
		apiURL.searchParams.set('q', [lat, lon].join(','));
		apiURL.searchParams.set('details', true.toString());

		return new Promise<geoPositionSearchJsonResult>(async (resolve, reject) => {
			this.cacheableFetch(apiURL)
				.then((apiResponse) => resolve(apiResponse.json()))
				.catch(reject);
		});
	}

	public currentConditionsSearch(locationKey: string) {
		const apiURL = new URL(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}`);
		apiURL.searchParams.set('apikey', this.env.ACCUWEATHER_API_KEY);
		apiURL.searchParams.set('details', true.toString());

		return new Promise<currentWeatherConditionsJsonResult[]>((resolve, reject) => {
			this.cacheableFetch(apiURL, {
				cf: {
					cacheTtl: (60 * 60 * 24) / 50,
				},
			})
				.then((apiResponse) => resolve(apiResponse.json()))
				.catch(reject);
		});
	}
}
