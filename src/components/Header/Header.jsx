import * as React from "react"
import "./Header.css"

export function Header({info}) {
  return (
    <header className="header">
      <h1 className="title">{info.title}</h1>
      <h4 className="tagline">{info.tagline}</h4>
      <p className="description">{info.description}</p>
    </header>
  )
}

export default Header
