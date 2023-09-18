export interface geoPositionSearch {
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
