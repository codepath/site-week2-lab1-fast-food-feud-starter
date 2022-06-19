import * as React from "react"
import "./Header.css"

export function Header(prop) {
  return (
    <header className="header">
      <h1 className="title">{prop.title}</h1>
      <h4 className="tagline">{prop.tagline}</h4>
      <p className="description">{prop.description}</p>
    </header>
  )
}

export default Header
