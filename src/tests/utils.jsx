import * as React from "react"
import * as sinon from "sinon"
import { configureSpecSuite } from "instant-noodles"

const getTestInstancesForRoot = (
  { RootComponent, singleComponentNames = [], multiComponentNames = [] } = {},
  specSuite,
  ctx
) => {
  const { assert, reactTestRenderer } = specSuite
  let testRenderer, testInstanceRoot, results, propAssertions

  try {
    ctx.sandbox.restore()

    try {
      testRenderer = reactTestRenderer.create(<RootComponent />)
      testInstanceRoot = testRenderer.root
    } catch (e) {
      console.log({ e })
      return {}
    }

    const getTestInstances = (rootInstance) => {
      const result = { root: rootInstance }

      for (const componentName of singleComponentNames ?? []) {
        try {
          result[`${componentName}`] = rootInstance.find(
            (node) => node?.type?.name === componentName || node?.type?.displayName === componentName
          )
        } catch (e) {
          // console.log({ e, componentName })
        }
      }

      for (const multiComponentName of multiComponentNames ?? []) {
        try {
          result[`${multiComponentName}`] = rootInstance.findAll(
            (node) => node?.type?.name === multiComponentName || node?.type?.displayName === multiComponentName
          )
        } catch (e) {
          // console.log({ e, multiComponentName })
        }
      }

      return result
    }

    results = getTestInstances(testInstanceRoot)
    /*=================================
    SINGLE/MULTI COMPONENT ASSERTIONS
    ==================================*/
    const assertComponentExistsAndHasProps = (componentName) => {
      const componentOrComponentArray = results[componentName]
      // Many instances of this component rendered
      if (Array.isArray(componentOrComponentArray)) {
        assert.ok(
          componentOrComponentArray.some((component) => component?.props),
          `The \`${componentName}\` component should exist and have a valid \`props\` object.`
        )
        return
      }

      // One instance of this component rendered
      assert.ok(
        componentOrComponentArray?.props,
        `The \`${componentName}\` component should exist and have a valid \`props\` object.`
      )
    }

    const assertComponentExistsAndHasValueInProps = (componentName, propName) => {
      const componentOrComponentArray = results[componentName]
      if (Array.isArray(componentOrComponentArray)) {
        assert.ok(
          componentOrComponentArray.some((component) => propName in (component?.props ?? {})),
          `The \`${componentName}\` component should exist and have a valid \`props\` object.`
        )
        return
      }

      assert.ok(
        propName in (componentOrComponentArray?.props ?? {}),
        `The \`${componentName}\` component should exist and have a valid \`${propName}\` prop.`
      )
    }

    const assertComponentExistsAndHasPropOfType = (componentName, propName, propType) => {
      const componentOrComponentArray = results[componentName]
      if (Array.isArray(componentOrComponentArray)) {
        const arrayOfComponentProps = componentOrComponentArray.map((component) => component?.props?.[propName])

        // This isn't great, but it's good enough
        assert.ok(
          arrayOfComponentProps.some((prop) => typeof prop === propType),
          `The \`${componentName}\` component should have a \`${propName}\` prop that is a ${propType}. None found.`
        )

        return
      }

      const prop = componentOrComponentArray?.props?.[propName]
      assert.type(
        prop,
        propType,
        `The \`${componentName}\` component should have a \`${propName}\` prop that is a ${propType}. [ACTUAL: ${typeof prop}]`
      )
    }

    const assertComponentExistsAndHasPropWithValue = (componentName, propName, propValue) => {
      const componentOrComponentArray = results[componentName]
      if (Array.isArray(componentOrComponentArray)) {
        const arrayOfComponentProps = componentOrComponentArray.map((component) => component?.props?.[propName])

        // This isn't great, but it's good enough
        assert.ok(
          arrayOfComponentProps.some((prop) => prop === propValue),
          `The \`${componentName}\` component should have a \`${propName}\` prop with a value of ${propValue}. None found.`
        )

        return
      }

      const prop = componentOrComponentArray?.props?.[propName]
      assert.equal(
        prop,
        propValue,
        `The \`${componentName}\` component should have a \`${propName}\` prop with a value of ${propValue}. [ACTUAL: ${prop}]`
      )
    }

    const assertComponentExistsAndHasPropWithAttributeOfType = ({
      componentName,
      propName,
      attributeName,
      attributeType,
    }) => {
      const componentOrComponentArray = results[componentName]

      if (Array.isArray(componentOrComponentArray)) {
        const arrayOfComponentPropAttributes = componentOrComponentArray.map(
          (component) => component?.props?.[propName]?.[attributeName]
        )

        assert.ok(
          arrayOfComponentPropAttributes.some((attr) =>
            parseUtils.isValid(attr)
          )`The \`${componentName}\` component should have a \`${propName}\` prop with a \`${attributeName}\` attribute. None found.`
        )

        // This isn't great, but it's good enough
        assert.ok(
          arrayOfComponentPropAttributes.some((attr) => typeof attr === attributeType),
          `The \`${componentName}\` component should have a \`${propName}\` prop` +
            ` containing the \`${attributeName}\` attribute of type ${attributeType}. None found.`
        )

        return
      }

      const props = componentOrComponentArray?.props
      const prop = props?.[propName]
      assert.ok(
        attributeName in prop,
        `The \`${componentName}\` component should have a \`${propName}\` prop with a \`${attributeName}\` attribute. [ACTUAL: ${props}]`
      )

      const attr = prop[attributeName]
      assert.type(
        attr,
        attributeType,
        `The \`${componentName}\` component should have a \`${propName}\` prop` +
          ` containing the \`${attributeName}\` attribute of type ${attributeType}. [ACTUAL: ${typeof attr}]`
      )
    }

    /*=================================
        SINGLE COMPONENT ASSERTIONS
    ==================================*/

    /*=================================
        MULTI COMPONENT ASSERTIONS
    ==================================*/

    propAssertions = {
      assertComponentExistsAndHasProps,
      assertComponentExistsAndHasValueInProps,
      assertComponentExistsAndHasPropOfType,
      assertComponentExistsAndHasPropWithValue,
      assertComponentExistsAndHasPropWithAttributeOfType,
    }
  } catch (e) {
    console.log({ e })
  } finally {
    ctx.sandbox.reset()
  }

  return { results, propAssertions }
}

export function configureSpecSuiteWithUtils(App) {
  const specSuite = configureSpecSuite()

  const {
    assert,
    suite,
    render,
    componentTree,
    fireEvent,
    // queryHelpers,
    parseUtils,
    // buildQueries,
    reactTestRenderer,
    within,
    waitFor,
  } = specSuite

  const bootstrapTestSuiteContext = (ctx) => {
    ctx.sandbox = sinon.createSandbox()

    ctx.getTestInstancesForRoot = (props) => getTestInstancesForRoot(props, specSuite, ctx)
  }

  const customQueries = {
    // ...whatever custom queries might work here
    getMenuItemsDiv: (container) => container.querySelector(".menu-items"),
    getNutritionalLabel: (container) => container.querySelector("div.nutritional-label"),
  }

  const advancedCustomQueries = {
    // ...whatever advanced queries might work here
    ...customQueries,
    getNutritionalLabelFactList: (container) =>
      customQueries.getNutritionalLabel(container).querySelector(".fact-list"),
  }

  return {
    assert,
    suite,
    render,
    componentTree,
    fireEvent,
    customQueries: advancedCustomQueries,
    bootstrapTestSuiteContext,
    parseUtils,
    reactTestRenderer,
    within,
    waitFor,
  }
}
