import * as React from "react"
import { configureSpecSuiteWithUtils } from "./utils"
import { Dataset } from "../data/dataset"

export function testIteration(App) {
  const {
    assert,
    suite,
    render,
    cleanup,
    customQueries,
    bootstrapTestSuiteContext,
    within,
    //
  } = configureSpecSuiteWithUtils(App)

  const FeatureTestSuite = suite(`FEATURE 002: Iteration in JSX`)

  FeatureTestSuite.before((ctx) => {
    bootstrapTestSuiteContext(ctx)
    const { results, propAssertions } = ctx.getTestInstancesForRoot({
      RootComponent: App,
      singleComponentNames: ["Header", "Instructions"],
      multiComponentNames: ["Chip"],
    })
    ctx.results = results
    ctx.propAssertions = propAssertions

    const isPTag = (node) => node.type === "p"
    const nodeHasCategoriesClass = (node) => node.parent.props.className.split(" ").includes("categories")
    const nodeHasRestaurantsClass = (node) => node.parent.props.className.split(" ").includes("restaurants")

    const categoryParagraphs = results.root?.findAll((node) => isPTag(node) && nodeHasCategoriesClass(node)) ?? []
    const categoryChips = results.Chip?.filter((chip) => nodeHasCategoriesClass(chip)) ?? []
    const restaurantParagraphs = results.root?.findAll((node) => isPTag(node) && nodeHasRestaurantsClass(node)) ?? []
    const restaurantChips = results.Chip?.filter((chip) => nodeHasRestaurantsClass(chip)) ?? []

    ctx.results.categoryParagraphs = categoryParagraphs
    ctx.results.restaurantParagraphs = restaurantParagraphs
    ctx.results.categoryChips = categoryChips
    ctx.results.restaurantChips = restaurantChips
  })

  FeatureTestSuite.before.each((ctx) => {
    ctx.sandbox.restore()
  })

  FeatureTestSuite.after.each((ctx) => {
    ctx.sandbox.restore()
    cleanup()
  })

  FeatureTestSuite.after((ctx) => {
    ctx.sandbox.restore()
  })

  /*================================
   =          CONSTANTS            =
   =================================*/
  const { categories, restaurants } = Dataset.createDataSet()

  FeatureTestSuite.test("Categories are iterated over and a paragraph tag is rendered for each one.", (ctx) => {
    const { categoryChips, categoryParagraphs } = ctx.results
    for (const category of categories) {
      assert.ok(
        categoryChips.find((chip) => chip.props.label === category) ??
          categoryParagraphs.find((p) => p.props.children === category),
        `Couldn't find an item for the category ${category}`
      )
    }
  })

  FeatureTestSuite.test("Restaurants are iterated over and a paragraph tag is rendered for each one.", (ctx) => {
    const { restaurantChips, restaurantParagraphs } = ctx.results
    for (const restaurant of restaurants) {
      assert.ok(
        restaurantChips.find((chip) => chip.props.label === restaurant) ??
          restaurantParagraphs.find((p) => p.props.children === restaurant),
        `Couldn't find an item for the restaurant ${restaurant}`
      )
    }
  })

  FeatureTestSuite.test(
    "The `categories` and `restaurants` arrays are being iterated over properly and not hardcoded in.",
    (ctx) => {
      let getUniqueCategoriesStub, getUniqueRestaurantsStub
      const otherCategories = ["Other Category", "Stuff", "Things"]
      const otherRestaurants = ["Other Restaurant", "Food Place", "Buffet"]
      const customCategories = [...categories.slice(0, 2), ...otherCategories]
      const customRestaurants = [...restaurants.slice(0, 2), ...otherRestaurants]
      const excludedCategories = categories.slice(3, 5)
      const excludedRestaurants = restaurants.slice(3, 5)

      try {
        getUniqueCategoriesStub = ctx.sandbox
          .stub(Dataset, "getUniqueCategories")
          .callsFake(() => [...customCategories])
        getUniqueRestaurantsStub = ctx.sandbox
          .stub(Dataset, "getUniqueRestaurants")
          .callsFake(() => [...customRestaurants])

        const { container } = render(<App />)

        const chipButtons = customQueries.getAllChipButtons(container)
        const categoryParagraphs = container.querySelectorAll(".categories p")
        const restaurantParagraphs = container.querySelectorAll(".restaurants p")

        // make sure all custom items are rendered
        for (let i = 0; i < customCategories.length; i++) {
          const customCategory = customCategories[i]
          const customRestaurant = customRestaurants[i]

          let otherCategoryFound = Array.from(chipButtons).some((chip) => within(chip).queryByText(customCategory))
          let otherRestaurantFound = Array.from(chipButtons).some((chip) => within(chip).queryByText(customRestaurant))
          if (!otherCategoryFound) {
            otherCategoryFound = Array.from(categoryParagraphs).some((p) => within(p).queryByText(customCategory))
          }
          if (!otherRestaurantFound) {
            otherRestaurantFound = Array.from(restaurantParagraphs).some((chip) =>
              within(chip).queryByText(customRestaurant)
            )
          }
          assert.ok(
            otherCategoryFound,
            "Make sure to iterate over the `categories` array returned by the `Dataset.createDataset()` function" +
              " and render an element for each one." +
              " Don't add them individually."
          )
          assert.ok(
            otherRestaurantFound,
            "Make sure to iterate over the `restaurants` array returned by the `Dataset.createDataset()` function" +
              " and render an element for each one." +
              " Don't add them individually."
          )
        }

        // make sure no excluded items are rendered
        for (let i = 0; i < excludedCategories.length; i++) {
          const excludedCategory = excludedCategories[i]
          const excludedRestaurant = excludedRestaurants[i]

          let excludedCategoryFound = Array.from(chipButtons).some((chip) => within(chip).queryByText(excludedCategory))
          let excludedRestaurantFound = Array.from(chipButtons).some((chip) =>
            within(chip).queryByText(excludedRestaurant)
          )
          if (!excludedCategoryFound) {
            excludedCategoryFound = Array.from(categoryParagraphs).some((p) => within(p).queryByText(excludedCategory))
          }
          if (!excludedRestaurantFound) {
            excludedRestaurantFound = Array.from(restaurantParagraphs).some((chip) =>
              within(chip).queryByText(excludedRestaurant)
            )
          }
          assert.not.ok(
            excludedCategoryFound,
            "Make sure to iterate over the `categories` array returned by the `Dataset.createDataset()` function" +
              " and render an element for each one." +
              " Don't add them individually."
          )
          assert.not.ok(
            excludedRestaurantFound,
            "Make sure to iterate over the `restaurants` array returned by the `Dataset.createDataset()` function" +
              " and render an element for each one." +
              " Don't add them individually."
          )
        }
      } catch (e) {
        throw e
      } finally {
        getUniqueCategoriesStub?.restore?.()
        getUniqueRestaurantsStub?.restore?.()
      }
    }
  )

  return FeatureTestSuite.run()
}
