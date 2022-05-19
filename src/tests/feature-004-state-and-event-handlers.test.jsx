import * as React from "react"
import Chip from "../components/Chip/Chip"
import { configureSpecSuiteWithUtils } from "./utils"
import { createDataSet } from "../data/dataset"

const { categories, restaurants } = createDataSet()

export function testStateAndEventHandlers(App) {
  const { assert, suite, render, fireEvent, customQueries, bootstrapTestSuiteContext } =
    configureSpecSuiteWithUtils(App)

  const FeatureTestSuite = suite("FEATURE 004: Using the `onClick` handlers to modify React state")

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

  // TODO: Test that the Chip passes the `button` element the correct props

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
      `Either the Chip component doesn't have the \`isActive\` prop defaulted to \`true\`, or Chip component doesn't use the \`isActive\` prop to update its "className".`
    )
  })

  FeatureTestSuite.test(
    "Each `Chip` component passes its `onClick` prop to the `button` element inside of it.",
    async (ctx) => {
      // TODO: Test that the Chip passes the `button` element the correct props
    }
  )

  FeatureTestSuite.test(
    "Clicking on a 'Categories' Chip triggers its `onClick` handler and updates state with the correct value. That value is then used to determine which Chip component is active.",
    async (ctx) => {
      const { findByText } = render(<App />)

      for (const category of categories) {
        let chipParagraph = await findByText(category)
        let chip = chipParagraph?.parentElement

        const classesBefore = Array.from(chip?.classList ?? [])

        assert.not.ok(classesBefore.includes("active"), `Chip: ${category} should be not active before being clicked.`)

        fireEvent.click(chip ?? chipParagraph)

        chipParagraph = await findByText(category)
        chip = chipParagraph?.parentElement

        const classesAfter = Array.from(chip?.classList ?? [])

        assert.ok(classesAfter.includes("active"), `Chip: ${category} should be active after being clicked.`)
      }
    }
  )

  FeatureTestSuite.test(
    "Clicking on a 'Restaurants' Chip triggers its `onClick` handler and updates state with the correct value. That value is then used to determine which Restaurant component is active.",
    async (ctx) => {
      const { findByText } = render(<App />)

      for (const restaurant of restaurants) {
        let chipParagraph = await findByText(restaurant)
        let chip = chipParagraph?.parentElement

        const classesBefore = Array.from(chip?.classList ?? [])

        assert.not.ok(
          classesBefore.includes("active"),
          `Chip: ${restaurant} should be not active before being clicked.`
        )

        fireEvent.click(chip ?? chipParagraph)

        chipParagraph = await findByText(restaurant)
        chip = chipParagraph?.parentElement

        const classesAfter = Array.from(chip?.classList ?? [])

        assert.ok(classesAfter.includes("active"), `Chip: ${restaurant} should be active after being clicked.`)
      }
    }
  )

  return FeatureTestSuite.run()
}
