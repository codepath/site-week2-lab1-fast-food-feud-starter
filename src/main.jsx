import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { InstantNoodles, updateConfig } from "instant-noodles"
import "./globals.css"

import { testPassingProps } from "./tests/feature-001-passing-props.test"
import { testIteration } from "./tests/feature-002-iteration-in-jsx.test"
import { testPropsAndStyles } from "./tests/feature-003-props-styles.test"
import { testStateAndEventHandlers } from "./tests/feature-004-state-and-event-handlers.test"
import { testRenderStateValues } from "./tests/feature-005-render-state-values.test"

const tests = {
  passingProps: testPassingProps,
  iteration: testIteration,
  propsAndStyles: testPropsAndStyles,
  stateAndEventHandlers: testStateAndEventHandlers,
  renderStateValues: testRenderStateValues,
}

const config = { verbose: true, debug: true }

updateConfig(config)

ReactDOM.render(
  <React.StrictMode>
    <App />
    {/* Leave this here for live test environment */}
    <InstantNoodles RootComponent={App} tests={tests} config={config} />
  </React.StrictMode>,
  document.getElementById("root")
)
