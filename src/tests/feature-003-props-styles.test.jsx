import * as React from "react"
import Chip from "../components/Chip/Chip"
import { configureSpecSuiteWithUtils } from "./utils"
import { createDataSet } from "../data/dataset"

const { categories, restaurants } = createDataSet()

export function testPropsAndStyles(App) {
  const { assert, suite, render, fireEvent, customQueries, bootstrapTestSuiteContext } =
    configureSpecSuiteWithUtils(App)

  const FeatureTestSuite = suite("FEATURE 003: The `Chip` component and using props to customize styles")

  FeatureTestSuite.before((ctx) => {
    bootstrapTestSuiteContext(ctx)
    const { results, propAssertions } = ctx.getTestInstancesForRoot({
      RootComponent: App,
      singleComponentNames: ["Header", "Instructions"],
      multiComponentNames: ["Chip"],
    })
    ctx.results = results
    ctx.propAssertions = propAssertions

    const categoryChips = results.Chip.filter((chip) => chip.parent.props.className.split(" ").includes("categories"))
    const restaurantChips = results.Chip.filter((chip) =>
      chip.parent.props.className.split(" ").includes("restaurants")
    )

    ctx.results.categoryChips = categoryChips
    ctx.results.restaurantChips = restaurantChips
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

  FeatureTestSuite.test("Categories are iterated over and a Chip is rendered for each one.", (ctx) => {
    const { categoryChips } = ctx.results
    for (const category of categories) {
      assert.ok(
        categoryChips.find((chip) => chip.props.label === category),
        `Couldn't find a Chip component for the category ${category}`
      )
    }
  })

  FeatureTestSuite.test("Restaurants are iterated over and a Chip is rendered for each one.", (ctx) => {
    const { restaurantChips } = ctx.results
    for (const restaurant of restaurants) {
      assert.ok(
        restaurantChips.find((chip) => chip.props.label === restaurant),
        `Couldn't find a Chip component for the restaurant ${restaurant}`
      )
    }
  })

  FeatureTestSuite.test("Chips have a working `isActive` prop that updates the chip styling.", async (ctx) => {
    const { categoryChips, restaurantChips } = ctx.results

    const chips = [...categoryChips, ...restaurantChips]

    // either all chips should be active by default
    const allChipsHaveIsActive = chips.every((chip) => (chip?.props?.className?.split?.(" ") ?? "").includes("active"))

    const { findByText, rerender } = render(<Chip label="Chippy Chip" isActive={false} />)
    const chipParagraph = await findByText("Chippy Chip")
    const chip = chipParagraph?.parentElement

    const classesBefore = Array.from(chip?.classList ?? [])

    rerender(<Chip label="Chippy Chip" isActive={true} />)

    const classesAfter = Array.from(chip?.classList ?? [])

    const chipHasActiveClassWhenIsActiveProp = classesAfter.includes("active") && !classesBefore.includes("active")

    assert.ok(
      allChipsHaveIsActive || chipHasActiveClassWhenIsActiveProp,
      `Either the Chip component doesn't have the \`isActive\` prop defaulted to \`true\`, ` +
        `or Chip component doesn't use the \`isActive\` prop to update its "className".`
    )
  })

  return FeatureTestSuite.run()
}
