import assert from "assert";
import { fetchUniversities } from "./fetchUniversities.js";

describe("fetchUniversities", () => {
  it("follows type specification", () => {
    const promise = fetchUniversities("University of Massachusetts at Amherst");

    return promise.then(result => {
      assert(Array.isArray(result)); // Assert the result in an array
      assert(result.every(x => typeof x === "string")); // Assert each element in the array is a string
    });
  });
  it("returns correct number of output", () => {
    const promise = fetchUniversities("University of California");
    return promise.then(result => {
      assert(Array.isArray(result)); // Assert the result in an array
      assert(result.length === 11); // Assert each element in the array is a string
    });
  });
  it("returns 0 for no valid uni", () => {
    const promise = fetchUniversities("Invalid");
    return promise.then(result => {
      assert(Array.isArray(result)); // Assert the result in an array
      assert(result.length === 0); // Assert each element in the array is a string
    });
  });
});
