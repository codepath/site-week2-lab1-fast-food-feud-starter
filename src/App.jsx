import * as React from "react"
// IMPORT ANY NEEDED COMPONENTS HERE
import {Header} from "./components/Header/Header"
import {Instructions} from "./components/Instructions/Instructions"
//import {Chip} from "./components/Chip/Chip"
//import {NutritionalLabel} from "./components/NutritionalLabel/NutritionalLabel"
import { createDataSet } from "./data/dataset"
import {CategoryColumn} from "./components/CategoryColumn"
import {RestaurantRow} from "./components/RestaurantRow"
import {MenuDisplay} from "./components/MenuDisplay"
import {DataSource} from "./components/DataSource"
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

  //CONSTANTS TO SET CATEGORY, RESTAURANT, AND MENU ITEMS
  const [selectedCategory, setSelectedCategory] = React.useState(0)
 
  const [selectedRestaurant, setSelectedRestaurant] = React.useState(0)

  const [selectedMenuItem, setSelectedMenuItem] = React.useState(0)
 
  //CONDITIONS FOR SWITCHING INSTRUCTIONS
  const getInstructions = () => {
    if((selectedCategory === 0) && (selectedRestaurant === 0))
    {
      return appInfo.instructions.start
    }
    else if(selectedCategory === 0)
    {
      return appInfo.instructions.onlyCategory
    } else if(selectedCategory === 0)
    {
      return appInfo.instructions.onlyRestaurant
    }else if(selectedMenuItem === 0)
    {
      return appInfo.instructions.noSelectedItem
    }else{
      return appInfo.instructions.allSelected
    }
  }

 //CURRENT MENU ITEMS FILTERS
  let currentMenuItems = data.filter(menuItem => {
      return menuItem.food_category === selectedCategory && menuItem.restaurant === selectedRestaurant
  })


  return (
    <main className="App">
      {/* CATEGORIES COLUMN */}
      <CategoryColumn setSelectedCategory={setSelectedCategory}
                      selectedCategory={selectedCategory}
                      categories = {categories}/>

      {/* MAIN COLUMN */}
      <div className="container">
        {/* HEADER GOES HERE */}
        <Header title = {appInfo.title} 
                tagline = {appInfo.tagline}
                description = {appInfo.description}/>

        {/* RESTAURANTS ROW */}
        <RestaurantRow restaurants = {restaurants}
                       selectedRestaurant = {selectedRestaurant}
                       setSelectedRestaurant = {setSelectedRestaurant}/>

        {/* INSTRUCTIONS GO HERE */}
        <Instructions instructions= {getInstructions()}/>

        {/* MENU DISPLAY */}
          <MenuDisplay currentMenuItems = {currentMenuItems}
                       selectedMenuItem = {selectedMenuItem}
                       setSelectedMenuItem = {setSelectedMenuItem}/>

        
        <DataSource dataSource = {appInfo.dataSource}/>
      </div>
    </main>
  )
}

export default App
