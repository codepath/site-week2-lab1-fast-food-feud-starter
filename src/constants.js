// don't move this!
export const appInfo = {
  title: `Fast Food Feud 🍔!`,
  tagline: `Folks' Favorite Friendly Fuel Finder For Food Facts`,
  description: `Finding healthy food is hard. Sometimes we just settle for what's available. That doesn't mean we shouldn't know what's going into our bodies! Fast Food Feud is here to arm the public with all the nutritional facts needed to make informed decisions about fast food consumption.`,
  dataSource: `All data pulled from the MenuStat.org interactive online database.`,
  instructions: {
    start: `Start by clicking on a food category on the left and a fast food joint from the list above. Afterwards, you'll be able to choose from a list of menu items and see their nutritional content.`,
    onlyCategory: `Now select a fast food restaurant from the list above!`,
    onlyRestaurant: `Now select a category from the list on the left!`,
    noSelectedItem: `Almost there! Choose a menu item and you'll have the fast food facts right at your fingertips!`,
    allSelected: `Great choice! Amazing what a little knowledge can do!`,
  },
}
// or this!
export const nutritionFacts = [
  { id: 1, label: "Description", attribute: "item_description" },
  { id: 2, label: "Calories", attribute: "calories" },
  { id: 3, label: "Cholesterol", attribute: "cholesterol" },
  { id: 4, label: "Fiber", attribute: "fiber" },
  { id: 5, label: "Sodium", attribute: "sodium" },
  { id: 6, label: "Sugar", attribute: "sugar" },
  { id: 7, label: "Total Fat", attribute: "total_fat" },
  { id: 8, label: "Saturated Fat", attribute: "saturated_fat" },
  { id: 9, label: "Trans Fat", attribute: "trans_fat" },
]
