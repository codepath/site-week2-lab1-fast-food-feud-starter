import * as React from "react"
// IMPORT ANY NEEDED COMPONENTS HERE
import {Header} from "./components/Header/Header"
import {Instructions} from "./components/Instructions/Instructions"
import {Chip} from "./components/Chip/Chip"
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
  const [selectedCategory, setSelectedCategory] = React.useState(null)
  const selectCategory = (category) => {
      setSelectedCategory(category)
  }

  const [selectedRestaurant, setSelectedRestaurant] = React.useState(null)
  const selectRestaurant = (restaurant) => {
      setSelectedRestaurant(restaurant)
  }

  const [selectedMenuItem, setSelectedMenuItem] = React.useState(null)
  const selectMenuItem = (menuItem) => {
    setSelectedMenuItem(menuItem)
  }

  var currentMenuItems = data.filter(menuItem => {
      menuItem.food_category === selectedCategory &&
      menuItem.restaurant === selectedRestaurant
  })


/*let currentMenuItems = data.filter(menuItem => menuItem.food_category === selectCategory && menuItem.restaurant === selectedRestaurant)*/

 /* menu item ----> pass as prop to nutritionLabels -----> pass down as prop an additional level to nutritionlabelfacts*/


  return (
    <main className="App">
      {/* CATEGORIES COLUMN */}
      <div className="CategoriesColumn col">
        <div className="categories options">
          <h2 className="title">Categories</h2>
          {/* ADD CODE HERE*/}
          {categories.map((category) => (
              <Chip key={category}
                    label={category}
                    isActive = {selectedCategory === category}
                    onClick = {() => selectCategory(category)}/>
          ))}
        </div>
      </div>

      {/* MAIN COLUMN */}
      <div className="container">
        {/* HEADER GOES HERE */}
        <Header title = {appInfo.title} 
                tagline = {appInfo.tagline}
                description = {appInfo.description}/>

        {/* RESTAURANTS ROW */}
        <div className="RestaurantsRow">
          <h2 className="title">Restaurants</h2>
          <div className="restaurants options">
            {/* ADD CODE HERE*/}
          {restaurants.map((restaurant) => (
              <Chip key={restaurant}
                    label={restaurant}
                    isActive = {selectedRestaurant === restaurant}
                    onClick = {() => selectRestaurant(restaurant)}/>
          ))} 
          </div>
        </div>

        {/* INSTRUCTIONS GO HERE */}
        <Instructions instructions= {appInfo.instructions.start}/>

        {/* MENU DISPLAY */}
        <div className="MenuDisplay display">
          <div className="MenuItemButtons menu-items">
            <h2 className="title">Menu Items</h2>
            {/* YOUR CODE HERE */}
            {currentMenuItems.map((menuItem) => (
              <Chip key={menuItem}
                    label={menuItem}
                    isActive = {selectedMenuItem === menuItem}
                    onClick = {() => selectMenuItem(menuItem)}/>
          ))}
          </div>

          {/* NUTRITION FACTS */}
          <div className="NutritionFacts nutrition-facts">{/* YOUR CODE HERE */}</div>
        </div>

        <div className="data-sources">
          <p>{appInfo.dataSource}</p>
        </div>
      </div>
    </main>
  )
}

export default App
