import * as React from "react"
import "./Chip.css"

export function Chip({ label = "", isActive = false, onClick, onCloseClick}) {

  var buttonClassName = "chip";
  if (isActive == true) {
    buttonClassName = "chip active"
  }

  return (
    <button className={buttonClassName} onClick={onClick} >
      <p className="label" >{label}</p>
      <span className="close" role="button" onClick={onCloseClick}>{`X`}</span>
    </button>
  )
}

export default Chip
