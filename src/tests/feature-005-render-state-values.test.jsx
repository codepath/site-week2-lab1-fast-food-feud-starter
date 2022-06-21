import * as React from "react"
import NutritionalLabel from "../components/NutritionalLabel/NutritionalLabel"
import { configureSpecSuiteWithUtils } from "./utils"
import { Dataset } from "../data/dataset"
import { nutritionFacts } from "../constants"

export function testRenderStateValues(App) {
  const {
    assert,
    suite,
    render,
    fireEvent,
    cleanup,
    customQueries,
    bootstrapTestSuiteContext,
    within,
    //
  } = configureSpecSuiteWithUtils(App)

  const FeatureTestSuite = suite(`FEATURE 005: Rendering values with state`)

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
  const { data, categories, restaurants } = Dataset.createDataSet()
  const doubleDoubleMenuItem = `Double Double Burger w/ Onion`
  const burgersCategory = categories[8]
  const inNOutRestaurant = restaurants[6]

  /*================================
   =            Helpers            =  
   =================================*/
  const currentMenuItems = data.filter((item) => {
    return item.food_category === burgersCategory && item.restaurant === inNOutRestaurant
  })
  const doubleDoubleMenuItemData = currentMenuItems.find((item) => item.item_name === doubleDoubleMenuItem)

  function setupMenuItems() {
    const renderQueries = render(<App />)

    let menuItemChipParagraph = renderQueries.queryByText(doubleDoubleMenuItem)
    let menuItemChip = menuItemChipParagraph?.parentElement

    assert.not.ok(menuItemChip, `Menu item Chips should not be rendered before a category and restaurant are selected`)

    const categoryChipParagraph = renderQueries.queryByText(burgersCategory)
    const categoryChip = categoryChipParagraph?.parentElement

    const restaurantChipParagraph = renderQueries.queryByText(inNOutRestaurant)
    const restaurantChip = restaurantChipParagraph?.parentElement

    assert.ok(categoryChip, `Category Chip for ${burgersCategory} could not be found`)
    assert.ok(restaurantChip, `Restaurant Chip for ${inNOutRestaurant} could not be found`)

    // click both chips
    fireEvent.click(categoryChip)
    fireEvent.click(restaurantChip)

    return renderQueries
  }

  async function getDoubleDoubleMenuItem(container) {
    const menuItemsDiv = customQueries.getMenuItemsDiv(container)
    const childNodes = Array.from(menuItemsDiv?.childNodes ?? [])
    const chipChildNodes = childNodes.filter((node) => node.nodeName === "BUTTON")

    assert.equal(
      chipChildNodes.length,
      9,
      `Clicking the ${burgersCategory} and ${inNOutRestaurant} Chips should be render 9 menu item Chips inside the div with a clasname of "menu-items"`
    )

    const p = within(menuItemsDiv).queryByText(doubleDoubleMenuItem)
    const doubleDoubleChip = p.parentElement

    return doubleDoubleChip
  }

  /*================================
   =            TESTS              =
   =================================*/

  FeatureTestSuite.test("Clicking a `category` Chip and a `restaurant` Chip renders `menuItem` Chips", async (ctx) => {
    const { container, queryByText } = render(<App />)

    let menuItemChipParagraph = queryByText(doubleDoubleMenuItem)
    let menuItemChip = menuItemChipParagraph?.parentElement

    assert.not.ok(menuItemChip, `Menu item Chips should not be rendered before a category and restaurant are selected`)

    const categoryChipParagraph = queryByText(burgersCategory)
    const categoryChip = categoryChipParagraph?.parentElement

    const restaurantChipParagraph = queryByText(inNOutRestaurant)
    const restaurantChip = restaurantChipParagraph?.parentElement

    assert.ok(categoryChip, `Category Chip for ${burgersCategory} could not be found`)
    assert.ok(restaurantChip, `Restaurant Chip for ${inNOutRestaurant} could not be found`)

    // click both chips
    fireEvent.click(categoryChip)
    fireEvent.click(restaurantChip)

    assert.ok(
      Array.from(categoryChip?.classList ?? []).includes("active"),
      `Category Chip: ${burgersCategory} should be active after being clicked.`
    )
    assert.ok(
      Array.from(restaurantChip?.classList ?? []).includes("active"),
      `Restaurant Chip: ${inNOutRestaurant} should be active after being clicked.`
    )

    const menuItemsDiv = customQueries.getMenuItemsDiv(container)
    const childNodes = Array.from(menuItemsDiv?.childNodes ?? [])
    const chipChildNodes = childNodes.filter((node) => node.nodeName === "BUTTON")

    assert.equal(
      chipChildNodes.length,
      9,
      `Clicking the ${burgersCategory} and ${inNOutRestaurant} Chips should be render 9 menu item Chips inside the div with a clasname of "menu-items"`
    )

    const p = within(menuItemsDiv).queryByText(doubleDoubleMenuItem)

    const doubleDoubleChip = p.parentElement

    assert.ok(doubleDoubleChip, `Menu Item Chips should be rendered after a category and restaurant are selected.`)
  })

  FeatureTestSuite.test("Clicking on a menu item renders the `NutritionalFacts` component", async (ctx) => {
    const renderQueries = setupMenuItems()
    const doubleDoubleChip = await getDoubleDoubleMenuItem(renderQueries.container)

    assert.ok(doubleDoubleChip, `Menu Item Chip for ${doubleDoubleMenuItem} could not be found`)

    fireEvent.click(doubleDoubleChip)

    // ensure the nutritional facts component is rendered
    const nutritionalFacts = renderQueries.queryByText("Nutrition Facts", { selector: "h3" })
    assert.ok(nutritionalFacts, `NutritionalFacts component should be rendered after clicking on a menu item`)

    // TODO: Determine if this is actually what we want to do here
    const { asFragment } = render(<NutritionalLabel item={doubleDoubleMenuItemData} />)

    const textContentSnapshot = {
      expected: asFragment().textContent?.trim?.(),
      actual: nutritionalFacts?.parentElement?.textContent?.trim?.(),
    }

    assert.snapshot(
      textContentSnapshot.actual,
      textContentSnapshot.expected,
      `NutritionalFacts component should render the correct data for ${doubleDoubleMenuItem}`
    )
  })

  FeatureTestSuite.test(
    "The NutritonalLabel component iterates over the `nutritionFacts` array and renders a `NutritionalLabelFact` component for each item with the correct props",
    async (ctx) => {
      const CustomNutritionLabelComponent = () => <NutritionalLabel item={doubleDoubleMenuItemData} />

      const NutritionLabelResults = ctx.getTestInstancesForRoot({
        RootComponent: CustomNutritionLabelComponent,
        singleComponentNames: ["NutritionalLabel"],
        multiComponentNames: ["NutritionalLabelFact"],
      })

      const NutritionalLabelFacts = NutritionLabelResults.results?.NutritionalLabelFact

      assert.equal(NutritionalLabelFacts?.length, 9, `There should be 9 NutritionalLabelFact components rendered`)
    }
  )

  FeatureTestSuite.test(
    "`NutritionalLabelFact` components properly display nutritional fact data for each item",
    async (ctx) => {
      const CustomNutritionLabelComponent = () => <NutritionalLabel item={doubleDoubleMenuItemData} />
      const { container, queryByText } = render(<CustomNutritionLabelComponent />)

      const itemName = queryByText(doubleDoubleMenuItemData.item_name, { selector: "h4" })
      assert.ok(itemName, `NutritionalLabel component should render the correct item name inside the \`h4\` element`)

      const nutritionalFactData = nutritionFacts.map((fact) => ({
        ...fact,
        value: doubleDoubleMenuItemData?.[fact.attribute],
      }))
      const valueCounts = nutritionalFactData.reduce(
        (acc, curr) => (curr.value ? { ...acc, [curr.value]: (acc?.[curr.value] ?? 0) + 1 } : acc),
        {}
      )
      const nutritionalFactDataWithCounts = nutritionalFactData.map((fact) => ({
        ...fact,
        count: valueCounts[fact.value],
      }))

      const nutritionalLabelEl = customQueries.getNutritionalLabel(container)

      for (const item of nutritionalFactDataWithCounts) {
        // check that the label exists regardless of if there's a value
        const factLabel = within(nutritionalLabelEl).queryByText(item.label, { selector: "span" })
        assert.ok(
          factLabel,
          "NutritionalLabel component should use the `nutritionFacts` array and uses its props to properly render a `NutritionalLabelFact` component for each item." +
            ` Missing item with label: ${item.label}.`
        )

        // check the value exists for any that have a valid value
        if (item.value) {
          const factValues = within(nutritionalLabelEl).queryAllByText(item.value, { selector: "span.fact-value" })
          assert.equal(
            factValues.length,
            item.count,
            `NutritionalLabel component should render the correct nutritional fact data inside the element.` +
              ` Incorrect number of rows: ${factValues.length} having a value of ${item.value}. Looking at item with label: ${item.label}.`
          )
        }
      }
    }
  )

  return FeatureTestSuite.run()
}
