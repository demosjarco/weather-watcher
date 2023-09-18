export interface Bindings extends Record<string, any> {
	GIT_HASH?: string;
	NODE_ENV: string;

	ACCUWEATHER_API_KEY: string;

	HISTORICAL_WEATHER_COMFORT?: AnalyticsEngineDataset;
	DISCORD_WEATHER_WATCHER_INFO: D1Database;
}
