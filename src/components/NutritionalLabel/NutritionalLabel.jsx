import * as React from "react"
import { nutritionFacts } from "../../constants"
import "./NutritionalLabel.css"

export function NutritionalLabel(prop) {
  return (
    <div className="nutritional-label">
      <h3 className="title">Nutrition Facts</h3>

      <h4 className="item-name">{prop.item.item_name}</h4>

      <ul className="fact-list">{nutritionFacts.map(({id, label, attribute}) => (<NutritionalLabelFact key={id} attribute={attribute} label={label} item={prop.item}/>))}</ul>
    </div>
  )
}

export function NutritionalLabelFact({attribute, label, item}) {
  return (
    <li className="nutrition-fact">
      <span className="fact-label">{label}</span>{" "}
      <span className="fact-value">{item[attribute]}</span>
    </li>
  )
}

export default NutritionalLabel
