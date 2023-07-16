import { fetchJSON } from "../include/fetchJSON.js";
import { getUrl } from "./fetchGeoCoord.js";

export function fetchUniversities(query: string): Promise<string[]> {
  // TODO
  const stringURL = getUrl("http://universities.hipolabs.com/search", query);
  return fetchJSON(stringURL).then((data: Array<{ name: string }>) => {
    if (Array.isArray(data) && data.length > 0) {
      const universities = data.filter(university => university.name.toLowerCase().startsWith(query.toLowerCase()));
      return Promise.resolve(universities.map(university => university.name));
    } else {
      return Promise.resolve([]);
    }
  });
}

// export function fetchUniversities(query: string): Promise<string[]> {
//   const url = new URL("http://universities.hipolabs.com/search");
//   url.searchParams.append("q", query);
//   const stringURL = url.toString();
//   return fetchJSON(stringURL)
//     .then(data => {
//       if (Array.isArray(data) && data.length > 0) {
//         Promise.resolve(data.map((university: any) => university.name));
//       } else {
//         Promise.resolve([]);
//       }
//     })
// }
