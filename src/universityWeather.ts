import { fetchGeoCoord } from "../src/fetchGeoCoord.js";
import { fetchCurrentTemperature } from "../src/fetchCurrentTemperature.js";
import { fetchUniversities } from "../src/fetchUniversities.js";

interface AverageTemperatureResults {
  totalAverage: number;
  [key: string]: number;
}

export function fetchUniversityWeather(
  universityQuery: string,
  transformName?: (s: string) => string
): Promise<AverageTemperatureResults> {
  function averageTemp(arr: number[]): number {
    const totalTemp = arr.reduce((acc, e) => acc + e, 0);
    return totalTemp / arr.length;
  }
  const arrUniversities = fetchUniversities(universityQuery);
  let arrName: string[] = [];
  const transformUni = arrUniversities.then(arr => {
    if (arr.length === 0) {
      return Promise.reject(new Error("No results found for query."));
    } else {
      arrName = arr;
      return Promise.all(
        arr.map(x =>
          fetchGeoCoord(transformName !== undefined ? transformName(x) : x).then(z => fetchCurrentTemperature(z))
        )
      );
    }
  });

  return transformUni.then(x => {
    const eachUniAvg = x.map(a => averageTemp(a.temperature_2m));
    const totAverage = averageTemp(eachUniAvg);
    const objAvgTemp: AverageTemperatureResults = { totalAverage: totAverage };
    for (let i = 0; i < arrName.length; i++) {
      objAvgTemp[arrName[i]] = eachUniAvg[i];
    }
    return objAvgTemp;
  });
}

export function fetchUMassWeather(): Promise<AverageTemperatureResults> {
  return fetchUniversityWeather("University of Massachusetts", (name: string) => {
    return name.replace("at ", "");
  });
}

export function fetchUCalWeather(): Promise<AverageTemperatureResults> {
  return fetchUniversityWeather("University of California");
}
