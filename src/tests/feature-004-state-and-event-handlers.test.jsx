import * as React from "react"
import Chip from "../components/Chip/Chip"
import { configureSpecSuiteWithUtils } from "./utils"
import { Dataset } from "../data/dataset"

export function testStateAndEventHandlers(App) {
  const {
    assert,
    suite,
    render,
    fireEvent,
    cleanup,
    bootstrapTestSuiteContext,
    //
  } = configureSpecSuiteWithUtils(App)

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

  FeatureTestSuite.test(
    "Each `Chip` component passes its `onClick` prop to the `button` element inside of it.",
    async (ctx) => {
      const spy = ctx.sandbox.spy()

      const { container } = render(
        <main>
          <Chip label="Chippy Chip" onClick={spy} />
        </main>
      )

      const chipButton = container.querySelector("button.chip")

      assert.ok(chipButton, `The Chip component doesn't have a \`button\` element with the className of \`chip\`.`)

      fireEvent.click(chipButton)

      assert.ok(
        spy.calledOnce,
        `The Chip component doesn't have pass its \`onClick\` prop to the  \`button\` element as its \`onClick\` prop.`
      )
    }
  )

  FeatureTestSuite.test(
    "Clicking on a 'categories' `Chip` triggers its `onClick` handler and updates state with the correct value. " +
      "That value is then used to determine which categories `Chip` component is active.",
    async (ctx) => {
      const { queryByText } = render(<App />)

      for (const category of categories) {
        let chipParagraph = queryByText(category)
        let chip = chipParagraph?.parentElement

        const classesBefore = Array.from(chip?.classList ?? [])

        assert.not.ok(classesBefore.includes("active"), `Chip: ${category} should be not active before being clicked.`)

        fireEvent.click(chip ?? chipParagraph)

        chipParagraph = queryByText(category)
        chip = chipParagraph?.parentElement

        const classesAfter = Array.from(chip?.classList ?? [])

        assert.ok(classesAfter.includes("active"), `Chip: ${category} should be active after being clicked.`)
      }
    }
  )

  FeatureTestSuite.test(
    "Clicking on a 'restaurants' `Chip` triggers its `onClick` handler and updates state with the correct value. " +
      "That value is then used to determine which restaurant `Chip` component is active.",
    async (ctx) => {
      const { queryByText } = render(<App />)

      for (const restaurant of restaurants) {
        let chipParagraph = queryByText(restaurant)
        let chip = chipParagraph?.parentElement

        const classesBefore = Array.from(chip?.classList ?? [])

        assert.not.ok(
          classesBefore.includes("active"),
          `Chip: ${restaurant} should be not active before being clicked.`
        )

        fireEvent.click(chip ?? chipParagraph)

        chipParagraph = queryByText(restaurant)
        chip = chipParagraph?.parentElement

        const classesAfter = Array.from(chip?.classList ?? [])

        assert.ok(classesAfter.includes("active"), `Chip: ${restaurant} should be active after being clicked.`)
      }
    }
  )

  return FeatureTestSuite.run()
}
