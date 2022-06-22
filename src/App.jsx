import * as React from "react"
// IMPORT ANY NEEDED COMPONENTS HERE
import Header from "./components/Header/Header"
import Instructions from "./components/Instructions/Instructions"
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

export function App() {
  const [category, setCategory] = useState('')
  const [restaurant, setRestauraunt] = useState('')
  const [item, setItem] = useState('')

  const isEmptyString = (str) => {
    return str === ''
  }

  const isNotEmptyString = (str) => {
    return str !== ''
  }

  var instructions = appInfo.instructions.start
  
  var currentMenuItems = [];
  if (isNotEmptyString(category) && isEmptyString(restaurant)) {
    instructions = appInfo.instructions.onlyCategory
  }
  if (isNotEmptyString(restaurant) && isEmptyString(category)) {
    instructions = appInfo.instructions.onlyRestaurant
  }
  if (isNotEmptyString(category) && isNotEmptyString(restaurant)) {
    instructions = appInfo.instructions.noSelectedItem
    
    if (isNotEmptyString(item)) {
      instructions = appInfo.instructions.allSelected
    }
  }
  
  if (isNotEmptyString(category) && isNotEmptyString(restaurant)) {
    currentMenuItems = data.filter((food) => {
      return food.food_category === category && food.restaurant === restaurant
    })
  }

  return (
    <main className="App">
      <CategoryColumn setCategory={setCategory} category={category} categories={categories}/>

      <div className="container">
        <Header title={appInfo.title} tagline={appInfo.tagline} description={appInfo.description}/>
        <RestaurantsRow setRestauraunt={setRestauraunt} restaurant={restaurant} restaurants={restaurants}/>
        <Instructions instructions={instructions}/>
        <MenuDisplay setItem={setItem} item={item} currentMenuItems={currentMenuItems}/>
        <DataSource appInfo={appInfo}/>
      </div>
    </main>
  )
}

export default App
