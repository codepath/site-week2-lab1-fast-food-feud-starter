import * as React from "react"
import "./Chip.css"

export function Chip({ label = "", isActive = false }) {
  return (
    <button className={"chip" + (isActive ? " active": "")}>
      <p className="label">{label}</p>
      <span className="close" role="button">{`X`}</span>
    </button>
  )
}

export default Chip
