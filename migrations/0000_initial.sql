-- Migration number: 0000 	 2023-09-18T20:33:36.124Z

DROP TABLE IF EXISTS locations;

CREATE TABLE locations (
	'location_key' TEXT PRIMARY KEY,
	'latitude' REAL NOT NULL,
	'longitude' REAL NOT NULL,
	UNIQUE('latitude', 'longitude')
);