import data from "./normalized-fast-food-feud.json"

export const Dataset = {
  getUniqueCategories: (d) => [...new Set(d.map((row) => row.food_category))],
  getUniqueRestaurants: (d) => [...new Set(d.map((row) => row.restaurant))],
  createDataSet: () => {
    return {
      data,
      restaurants: Dataset.getUniqueRestaurants(data),
      categories: Dataset.getUniqueCategories(data),
    }
  },
}
