import * as React from "react"
import { configureSpecSuiteWithUtils } from "./utils"
import { appInfo } from "../App"

export function testPassingProps(App) {
  const { assert, suite, render, fireEvent, customQueries, bootstrapTestSuiteContext } =
    configureSpecSuiteWithUtils(App)

  const FeatureTestSuite = suite(`FEATURE 001: The \`Header\` component`)

  FeatureTestSuite.before((ctx) => {
    bootstrapTestSuiteContext(ctx)
    const { results, propAssertions } = ctx.getTestInstancesForRoot({
      RootComponent: App,
      singleComponentNames: [
        "Header",
        "Instructions",
        // "NutritionLabel",
      ],
      multiComponentNames: ["Chip"],
    })
    ctx.results = results
    ctx.propAssertions = propAssertions
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

  FeatureTestSuite.test("Header component renders the appropriate site Title", async () => {
    const { getByText, findByText } = render(<App />)

    assert.ok(getByText("Fast Food Feud", { exact: false, selector: "h1" }), "Couldn't find the site title")
    assert.ok(await findByText("Fast Food Feud", { exact: false, selector: "h1" }), "Couldn't find the site title")
  })

  FeatureTestSuite.test("Header component renders the appropriate tagline", async () => {
    const { getByText, findByText } = render(<App />)

    assert.ok(getByText("Fast Food Feud", { exact: false, selector: "h1" }), "Couldn't find the site title")

    assert.equal(
      Boolean(await findByText("Folks' Favorite Friendly Fuel Finder For Food Facts", { selector: "h4" })),
      true,
      "Couldn't find the proper tagline"
    )
    assert.ok(
      await findByText("Folks' Favorite Friendly Fuel Finder For Food Facts", { selector: "h4" }),
      "Couldn't find the proper tagline"
    )
  })

  FeatureTestSuite.test("Header component renders the appropriate site description prop", async () => {
    const { getByText, findByText } = render(<App />)

    assert.ok(
      getByText("is here to arm the public", { exact: false, selector: "p" }),
      "Site description doesn't exist on the page."
    )

    assert.ok(
      await findByText("is here to arm the public", { exact: false, selector: "p" }),
      "Site description doesn't exist on the page."
    )
  })

  FeatureTestSuite.test("Header component receives the correct props", async (ctx) => {
    ctx.propAssertions.assertComponentExistsAndHasProps("Header")

    ctx.propAssertions.assertComponentExistsAndHasValueInProps("Header", "title")
    ctx.propAssertions.assertComponentExistsAndHasValueInProps("Header", "tagline")
    ctx.propAssertions.assertComponentExistsAndHasValueInProps("Header", "description")

    ctx.propAssertions.assertComponentExistsAndHasPropOfType("Header", "title", "string")
    ctx.propAssertions.assertComponentExistsAndHasPropOfType("Header", "tagline", "string")
    ctx.propAssertions.assertComponentExistsAndHasPropOfType("Header", "description", "string")

    ctx.propAssertions.assertComponentExistsAndHasPropWithValue("Header", "title", appInfo.title)
    ctx.propAssertions.assertComponentExistsAndHasPropWithValue("Header", "tagline", appInfo.tagline)
    ctx.propAssertions.assertComponentExistsAndHasPropWithValue("Header", "description", appInfo.description)
  })

  FeatureTestSuite.test(
    "Instructions component receives props and renders the appropriate instruction",
    async (ctx) => {
      const { getByText, findByText } = render(<App />)

      assert.ok(
        await findByText(
          "Start by clicking on a food category on the left and a fast food joint from the list above. Afterwards, you'll be able to choose from a list of menu items and see their nutritional content."
        ),
        "Couldn't find the proper instructions"
      )

      assert.ok(
        getByText("clicking on a food category on the left", { exact: false }),
        "Couldn't find the proper instructions"
      )
    }
  )

  FeatureTestSuite.test("Instructions component receives the correct props", async (ctx) => {
    ctx.propAssertions.assertComponentExistsAndHasProps("Instructions")
    ctx.propAssertions.assertComponentExistsAndHasValueInProps("Instructions", "instructions")
    ctx.propAssertions.assertComponentExistsAndHasPropOfType("Instructions", "instructions", "string")
    ctx.propAssertions.assertComponentExistsAndHasPropWithValue(
      "Instructions",
      "instructions",
      appInfo.instructions.start
    )
  })

  return FeatureTestSuite.run()
}
