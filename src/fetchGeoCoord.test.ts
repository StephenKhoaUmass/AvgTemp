import assert from "assert";
import { fetchGeoCoord, getUrl } from "./fetchGeoCoord.js";

describe("fetchGeoCoord", () => {
  it("follows type specification", () => {
    const promise = fetchGeoCoord("University of Massachusetts Amherst");

    return promise.then(result => {
      assert(typeof result === "object"); //  Assert the result is an object
      assert(typeof result.lon === "number"); // Assert that the lon value is a number
      assert(typeof result.lat === "number"); // Assert that the lat value is a number
      assert(Object.keys(result).length === 2); // Assert there are only two keys in the object
    });
  });

  it("returns the correct lat and lon", () => {
    const promise = fetchGeoCoord("amherst");

    return promise.then(result => {
      assert(result.lon === -72.505714);
      assert(result.lat === 42.3685658);
    });
  });

  it("returns the correct lon and lat", () => {
    const promise = fetchGeoCoord("ho chi minh");

    return promise.then(result => {
      assert(result.lon === 106.7017555);
      assert(result.lat === 10.7758439);
    });
  });
});

describe("getUrl", () => {
  it("follows type specification", () => {
    const newURL = getUrl("https://geocode.maps.co/search", "New York City");

    assert(typeof newURL === "string");
  });
});
