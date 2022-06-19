import * as React from "react"
// IMPORT ANY NEEDED COMPONENTS HERE
import Header from "./components/Header/Header"
import Instructions from "./components/Instructions/Instructions"
import Chip from "./components/Chip/Chip"
import NutritionalLabel from "./components/NutritionalLabel/NutritionalLabel"
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
  const [categ, setCat] = useState('')
  const [res, setRest] = useState('')
  const [item, setItem] = useState('')

  var instructions = appInfo.instructions.start
  
  var currentMenuItems = [];
  if (categ !== '' && res === ''){
    instructions = appInfo.instructions.onlyCategory
  }
  if (res !== '' && categ === ''){
    instructions = appInfo.instructions.onlyRestaurant
  }
  if (categ !== '' && res !== ''){
    instructions = appInfo.instructions.noSelectedItem
    
    if (item !== ''){
      instructions = appInfo.instructions.allSelected
    }
  }
  
  
  if (categ !== '' && res !== ''){
    currentMenuItems = data.filter((food) => {
      return food.food_category === categ && food.restaurant === res
    })
  }
  return (
    <main className="App">
      {/* CATEGORIES COLUMN */}
      <div className="CategoriesColumn col">
        <div className="categories options">
          <h2 className="title">Categories</h2>
          {categories.map((cat, idx) => (<Chip key={idx} label={cat} onClick={() => setCat(cat)} isActive={cat === categ ? true : false}/>))}
        </div>
      </div>

      {/* MAIN COLUMN */}
      <div className="container">
        <Header title={appInfo.title} tagline={appInfo.tagline} description={appInfo.description}/>

        {/* RESTAURANTS ROW */}
        <div className="RestaurantsRow">
          <h2 className="title">Restaurants</h2>
          <div className="restaurants options">{restaurants.map((rest, idx) => (
            <Chip key={idx} label={rest} onClick={() => setRest(rest)} isActive={rest === res ? true : false}/>))}</div>
        </div>

        <Instructions instructions={instructions}/>

        {/* MENU DISPLAY */}
        <div className="MenuDisplay display">
          <div className="MenuItemButtons menu-items">
            <h2 className="title">Menu Items</h2>
            {currentMenuItems.length != 0 ? currentMenuItems.map((menu, idx) => <Chip key={idx} onClick={() => setItem(menu)} label={menu.item_name} isActive={menu === item ? true : false}/>): null}
          </div>

          {/* NUTRITION FACTS */}
          <div className="NutritionFacts nutrition-facts">{item != '' ? <NutritionalLabel item={item}/> : null}</div>
        </div>

        <div className="data-sources">
          <p>{appInfo.dataSource}</p>
        </div>
      </div>
    </main>
  )
}

export default App
