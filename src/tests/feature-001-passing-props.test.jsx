import * as React from "react"
import { configureSpecSuiteWithUtils } from "./utils"
import { appInfo } from "../App"

export function testPassingProps(App) {
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

  const FeatureTestSuite = suite(`FEATURE 001: The \`Header\` component`)

  FeatureTestSuite.before((ctx) => {
    bootstrapTestSuiteContext(ctx)
    const { results, propAssertions } = ctx.getTestInstancesForRoot({
      RootComponent: App,
      singleComponentNames: [
        "Header",
        "Instructions",
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
    cleanup()
  })

  FeatureTestSuite.after((ctx) => {
    ctx.sandbox.restore()
  })

  FeatureTestSuite.test("`Header` component receives the correct props", async (ctx) => {
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

  FeatureTestSuite.test("`Header` component renders the appropriate site title", async () => {
    const { container, findByText } = render(<App />)

    const Header = customQueries.getHeaderElement(container)

    assert.ok(
      Header,
      `The \`Header\` component should be rendered to the screen and should return JSX inside a native HTML \`header\` element.`
    )

    assert.ok(
      await findByText(appInfo.title, { exact: false, selector: "h1" }),
      "Couldn't find the site title rendered by the `Header` component in an `h1` tag"
    )
    assert.ok(
      within(Header).getByText(appInfo.title, { exact: false, selector: "h1" }),
      "Couldn't find the site title rendered by the `Header` component in an `h1` tag"
    )
  })

  FeatureTestSuite.test("`Header` component renders the appropriate tagline", async () => {
    const { container, findByText } = render(<App />)

    const Header = customQueries.getHeaderElement(container)

    assert.ok(
      Header,
      `The \`Header\` component should be rendered to the screen and should return JSX inside a native HTML \`header\` element.`
    )

    assert.ok(
      await findByText(appInfo.tagline, { exact: true, selector: "h4" }),
      "Couldn't find the site tagline rendered by the `Header` component in an `h4` tag"
    )
    assert.ok(
      within(Header).getByText(appInfo.tagline, { exact: true, selector: "h4" }),
      "Couldn't find the site tagline rendered by the `Header` component in an `h4` tag"
    )
  })

  FeatureTestSuite.test("`Header` component renders the appropriate site description prop", async () => {
    const { container, findByText } = render(<App />)

    const Header = customQueries.getHeaderElement(container)

    assert.ok(
      Header,
      `The \`Header\` component should be rendered to the screen and should return JSX inside a native HTML \`header\` element.`
    )

    assert.ok(
      await findByText("is here to arm the public", { exact: false, selector: "p" }),
      "Couldn't find the site description rendered by the `Header` component inside a `p` tag"
    )
    assert.ok(
      within(Header).getByText(appInfo.description, { exact: true, selector: "p" }),
      "Couldn't find the site description rendered by the `Header` component inside a `p` tag"
    )
  })

  FeatureTestSuite.test("`Instructions` component receives the correct props", async (ctx) => {
    ctx.propAssertions.assertComponentExistsAndHasProps("Instructions")
    ctx.propAssertions.assertComponentExistsAndHasValueInProps("Instructions", "instructions")
    ctx.propAssertions.assertComponentExistsAndHasPropOfType("Instructions", "instructions", "string")
    ctx.propAssertions.assertComponentExistsAndHasPropWithValue(
      "Instructions",
      "instructions",
      appInfo.instructions.start
    )
  })

  FeatureTestSuite.test(
    "`Instructions` component receives props and renders the appropriate instruction",
    async (ctx) => {
      const { container, findByText } = render(<App />)

      const Instructions = customQueries.getInstructionsAside(container)

      assert.ok(
        Instructions,
        `The \`Instructions\` component should be rendered to the screen and ` +
          `should return JSX inside a native HTML \`aside\` element with a className of \`instructions\`.`
      )

      assert.ok(
        within(Instructions).getByText(appInfo.instructions.start, { exact: true, selector: "p" }),
        "Couldn't find the start instructions rendered by the `Instructions` component inside a `p` tag"
      )

      assert.ok(
        await findByText(appInfo.instructions.start, { exact: true, selector: "p" }),
        "Couldn't find the start instructions rendered by the `Instructions` component inside a `p` tag"
      )
    }
  )

  return FeatureTestSuite.run()
}
