import { fetchJSON } from "../include/fetchJSON.js";
import { GeoCoord } from "./fetchGeoCoord.js";

export interface TemperatureReading {
  time: string[];
  temperature_2m: number[];
}

interface Forcast {
  hourly: TemperatureReading | undefined;
}

export function fetchCurrentTemperature(coords: GeoCoord): Promise<TemperatureReading> {
  const urlLink = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&hourly=temperature_2m&temperature_unit=fahrenheit`;

  return fetchJSON(urlLink).then((info: Forcast) => {
    const hourlyData = info.hourly;
    if (hourlyData === undefined || hourlyData.time.length === 0) {
      return Promise.resolve({
        time: [],
        temperature_2m: [],
      } as TemperatureReading);
    }
    return Promise.resolve({
      time: hourlyData.time,
      temperature_2m: hourlyData.temperature_2m,
    } as TemperatureReading);
  });
}
