import data from "./normalized-fast-food-feud.json"

export const getUniqueCategories = (d) => [...new Set(d.map((row) => row.food_category))]
export const getUniqueRestaurants = (d) => [...new Set(d.map((row) => row.restaurant))]

export const createDataSet = () => {
  return {
    data,
    restaurants: getUniqueRestaurants(data),
    categories: getUniqueCategories(data),
  }
}
