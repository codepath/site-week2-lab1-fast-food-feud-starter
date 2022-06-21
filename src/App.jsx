import * as React from "react"
// IMPORT ANY NEEDED COMPONENTS HERE
import Header from "./components/Header/Header"
import Instructions from "./components/Instructions/Instructions"
import Chip from "./components/Chip/Chip"
import NutritionalLabel from "./components/NutritionalLabel/NutritionalLabel"
import { CategoryColumn } from "./components/CategoryColumn"
import { RestaurantsRow } from "./components/RestaurantsRow"
import { MenuDisplay } from "./components/MenuDisplay"
import { DataSource } from "./components/DataSource"
import {useState} from "react"
import { createDataSet } from "./data/dataset"
import "./App.css"

// don't move this!
export const appInfo = {
  title: `Fast Food Feud 🍔!`,
  tagline: `Folks' Favorite Friendly Fuel Finder For Food Facts`,
  description: `Finding healthy food is hard. Sometimes we just settle for what's available. That doesn't mean we shouldn't know what's going into our bodies! Fast Food Feud is here to arm the public with all the nutritional facts needed to make informed decisions about fast food consumption.`,
  dataSource: `All data pulled from the MenuStat.org interactive online database.`,
  instructions: {
    start: `Start by clicking on a food category on the left and a fast food joint from the list above. Afterwards, you'll be able to choose from a list of menu items and see their nutritional content.`,
    onlyCategory: `Now select a fast food restaurant from the list above!`,
    onlyRestaurant: `Now select a category from the list on the left!`,
    noSelectedItem: `Almost there! Choose a menu item and you'll have the fast food facts right at your fingertips!`,
    allSelected: `Great choice! Amazing what a little knowledge can do!`,
  },
}
// or this!
const { data, categories, restaurants } = createDataSet()

function isStringEmtpy(str) {
  return str === '';
}

export function App() {
  const [categ, setCat] = useState('')
  const [res, setRest] = useState('')
  const [item, setItem] = useState('')

  var instructions = appInfo.instructions.start
  
  var currentMenuItems = [];
  if (isStringEmpty(categ) && isStringEmtpy(res)) {
    instructions = appInfo.instructions.onlyCategory
  }
  if (isStringEmtpy(res) && isStringEmtpy(categ)){
    instructions = appInfo.instructions.onlyRestaurant
  }
  if (isStringEmtpy(categ) && isStringEmtpy(res)){
    instructions = appInfo.instructions.noSelectedItem
    
    if (isStringEmtpy(item)){
      instructions = appInfo.instructions.allSelected
    }
  }
  
  if (isStringEmtpy(categ) && isStringEmtpy(res)){
    currentMenuItems = data.filter((food) => {
      return food.food_category === categ && food.restaurant === res
    })
  }

  return (
    <main className="App">
      <CategoryColumn setCat={setCat} categ={categ} categories={categories}/>

      <div className="container">
        <Header title={appInfo.title} tagline={appInfo.tagline} description={appInfo.description}/>
        <RestaurantsRow setRest={setRest} res={res} restaurants={restaurants}/>
        <Instructions instructions={instructions}/>
        <MenuDisplay setItem={setItem} item={item} currentMenuItems={currentMenuItems}/>
        <DataSource appInfo={appInfo}/>
      </div>
    </main>
  )
}

export default App
