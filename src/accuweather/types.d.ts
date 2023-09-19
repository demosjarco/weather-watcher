export interface geoPositionSearchJsonResult {
	Version: number;
	Key: string;
	Type: string;
	Rank: number;
	LocalizedName: string;
	EnglishName: string;
	PrimaryPostalCode: string;
	Region: {
		ID: string;
		LocalizedName: string;
		EnglishName: string;
	};
	Country: {
		ID: string;
		LocalizedName: string;
		EnglishName: string;
	};
	AdministrativeArea: {
		ID: string;
		LocalizedName: string;
		EnglishName: string;
		Level: number | null;
		LocalizedType: string;
		EnglishType: string;
		CountryID: string;
	};
	TimeZone: {
		Code: string;
		Name: string;
		GmtOffset: number;
		IsDaylightSaving: boolean;
		NextOffsetChange: string | null;
	};
	GeoPosition: {
		Latitude: number;
		Longitude: number;
		Elevation: {
			Metric: {
				Value: number | null;
				Unit: string;
				UnitType: number;
			};
			Imperial: {
				Value: number | null;
				Unit: string;
				UnitType: number;
			};
		};
	};
	IsAlias: boolean;
	ParentCity?: {
		Key: string;
		LocalizedName: string;
		EnglishName: string;
	};
	SupplementalAdminAreas?: {
		Level: number | null;
		LocalizedName: string;
		EnglishName: string;
	}[];
	DataSets: string[];
	Details: {
		Key: string;
		StationCode: string;
		StationGmtOffset: number | null;
		BandMap: string;
		Climo: string;
		LocalRadar: string;
		MediaRegion: string;
		Metar: string;
		NXMetro: string;
		NXState: string;
		Population: number | null;
		PrimaryWarningCountyCode: string;
		PrimaryWarningZoneCode: string;
		Satellite: string;
		Synoptic: string;
		MarineStation: string;
		MarineStationGMTOffset: number | null;
		VideoCode: string;
		PartnerID: number | null;
		DMA: {
			ID: string;
			EnglishName: string;
		};
		Sources: {
			DataType: string;
			Source: string;
			SourceId: number;
		}[];
		CanonicalPostalCode: string | null;
		CanonicalLocationKey: string | null;
		LocationStem: string;
	};
}

interface TemperatureDetails {
	Value: number | null;
	Unit: string;
	UnitType: number;
}

interface MeasurementDetails {
	Metric: TemperatureDetails;
	Imperial: TemperatureDetails;
}

interface TemperatureSummaryRange {
	Minimum: MeasurementDetails;
	Maximum: MeasurementDetails;
}

export interface currentWeatherConditionsJsonResult {
	LocalObservationDateTime: string;
	EpochTime: number;
	WeatherText: string;
	WeatherIcon?: number | null;
	LocalSource?: {
		Id?: number;
		Name?: string;
		WeatherCode?: string;
	};
	IsDayTime: boolean;
	Temperature: MeasurementDetails;
	RealFeelTemperature: MeasurementDetails;
	RealFeelTemperatureShade: MeasurementDetails;
	RelativeHumidity?: number | null;
	DewPoint: object;
	Wind: {
		Direction: {
			Degrees?: number | null;
			English: string;
			Localized: string;
		};
		Speed: MeasurementDetails;
	};
	WindGust: {
		Speed: MeasurementDetails;
	};
	UVIndex?: number | null;
	UVIndexText: string;
	Visibility: object;
	ObstructionsToVisibility: string;
	CloudCover?: number | null;
	Ceiling: object;
	Pressure: object;
	PressureTendency: {
		LocalizedText: string;
		Code: string;
	};
	Past24HourTemperatureDeparture: object;
	ApparentTemperature: object;
	WindChillTemperature: object;
	WetBulbTemperature: object;
	Precip1hr: object;
	PrecipitationSummary: {
		Precipitation?: object;
		PastHour: MeasurementDetails;
		Past3Hours: MeasurementDetails;
		Past6Hours: MeasurementDetails;
		Past9Hours: MeasurementDetails;
		Past12Hours: MeasurementDetails;
		Past18Hours: MeasurementDetails;
		Past24Hours: MeasurementDetails;
	};
	TemperatureSummary: {
		Past6HourRange: TemperatureSummaryRange;
		Past12HourRange: TemperatureSummaryRange;
		Past24HourRange: TemperatureSummaryRange;
	};
	MobileLink: string;
	Link: string;
	HasPrecipitation: boolean;
	PrecipitationType?: string | null;
	IndoorRelativeHumidity: boolean;
}
