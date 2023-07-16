/**
 * A simple example of using TypeScript to fetch and filter recipe data from the Edamam API.
 *
 * This program defines three interfaces - `Root`, `Hit`, and `Recipe` - that describe the structure of the data
 * returned by the Edamam API. It also defines a `getRecipes` function that takes three parameters - `query`,
 * `restriction`, and `calories` - and returns a promise that resolves to an array of recipe objects that match the
 * provided parameters.
 *
 * The `getRecipes` function uses the `fetchJSON` function to fetch data from the Edamam API and filter the results
 * based on the provided parameters. It returns a promise that resolves to an array of recipe objects that match the
 * provided parameters.
 *
 * This program is useful for developers who want to build applications that involve searching for recipes based on
 * specific criteria. By using TypeScript, developers can ensure that their code is type-safe and easier to maintain.
 * Additionally, the use of interfaces in this program helps to ensure that the data returned from the Edamam API is
 * formatted correctly and can be used by other parts of the application without errors.
 */

import { fetchJSON } from "../include/fetchJSON.js";

export interface Root {
  hits: Hit[];
}
export interface Hit {
  recipe?: Recipe;
}
export interface Recipe {
  healthLabels?: string[];
  ingredientLines?: string[];
  calories?: number;
}

/**
 * Fetches and filters recipe data from the Edamam API.
 *
 * @param query The search term for the recipe.
 * @param restriction A dietary restriction to filter the results.
 * @param calories The maximum number of calories for the recipes returned.
 *
 * @returns A Promise that resolves to an array of recipe objects that match the provided parameters.
 */

function getRecipes(query: string, restriction: string, calories: number) {
  const urlEd = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=30aac44c&app_key=%2098c5b0bfe5feb54f0d830eba36fe0351`;
  return fetchJSON(urlEd)
    .then((info: Root) =>
      Array.isArray(info.hits) && info.hits.length > 0
        ? Promise.resolve(info.hits)
        : Promise.reject(new Error("No results found for query."))
    )
    .then(x => {
      let filteredRecip = x.filter(recipe => {
        if (
          recipe.recipe !== undefined &&
          recipe.recipe?.healthLabels !== undefined &&
          recipe.recipe?.calories !== undefined
        ) {
          return recipe.recipe.healthLabels.includes(restriction) && recipe.recipe.calories <= calories;
        }
        return false;
      });
      return filteredRecip;
    })
    .then(x => {
      console.log("There are " + x.length + " recipes that match your requests: ");
      console.log(x);
    });
}

const type = getRecipes("chicken", "Peanut-Free", 1500);
