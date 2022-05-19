import * as React from "react"
import { configureSpecSuiteWithUtils } from "./utils"
import { createDataSet } from "../data/dataset"

const { categories, restaurants } = createDataSet()

export function testIteration(App) {
  const { assert, suite, render, fireEvent, customQueries, bootstrapTestSuiteContext } =
    configureSpecSuiteWithUtils(App)

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

    const categoryParagraphs = results.root.findAll(
      (node) => node.type === "p" && node.parent.props.className.split(" ").includes("categories")
    )
    const categoryChips = results.Chip.filter((chip) => chip.parent.props.className.split(" ").includes("categories"))
    const restaurantParagraphs = results.root.findAll(
      (node) => node.type === "p" && node.parent.props.className.split(" ").includes("restaurants")
    )
    const restaurantChips = results.Chip.filter((chip) =>
      chip.parent.props.className.split(" ").includes("restaurants")
    )

    ctx.results.p = { categoryParagraphs, restaurantParagraphs }
    ctx.results.categoryChips = categoryChips
    ctx.results.restaurantChips = restaurantChips

    // const inputFiber = results.root.find(
    //   (node) =>
    //     node?.type === "input" && node?.parent?.type === "div" && node?.parent?.parent?.type?.name === "FilterInput"
    // )
  })

  FeatureTestSuite.before.each((ctx) => {
    ctx.sandbox.restore()
  })

  FeatureTestSuite.after.each((ctx) => {
    ctx.sandbox.restore()
  })

  FeatureTestSuite.after((ctx) => {
    ctx.sandbox.restore()
  })

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

  // TODO: Write a test that uses sinon to stub the datasets function and ensure they're not hardcoding the values

  return FeatureTestSuite.run()
}
