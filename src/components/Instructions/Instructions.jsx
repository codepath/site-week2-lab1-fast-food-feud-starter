import * as React from "react"
import "./Instructions.css"

export function Instructions({instructions}) {
  return (
    <aside className="instructions">
      <p>{instructions}</p>
    </aside>
  )
}

export default Instructions
