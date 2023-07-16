//I wrote this on my own
import { fetchJSON } from "../include/fetchJSON.js";

export interface GeoCoord {
  lat: number;
  lon: number;
}

export function getUrl(url: string, query: string) {
  const searchURL = new URL(url);
  searchURL.searchParams.append("q", query);
  return searchURL.toString();
}

export function fetchGeoCoord(query: string): Promise<GeoCoord> {
  const searchURL = getUrl("https://geocode.maps.co/search", query);

  return fetchJSON(searchURL)
    .then((json: Array<{ lat: string; lon: string }>) =>
      Array.isArray(json) && json.length > 0
        ? Promise.resolve(json[0])
        : Promise.reject(new Error("No results found for query."))
    )
    .then(arrObj => {
      const placeGeoCoord: GeoCoord = { lat: Number.parseFloat(arrObj.lat), lon: Number.parseFloat(arrObj.lon) };
      return placeGeoCoord;
    });
}
