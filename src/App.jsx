import * as React from "react";
import Header from "./components/Header/Header";
import Chip from "./components/Chip/Chip";
import Instructions from "./components/Instructions/Instructions";
import NutritionalLabel from "./components/NutritionalLabel/NutritionalLabel";
import { createDataSet } from "./data/dataset";
import "./App.css";

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
};
// or this!
const { data, categories, restaurants } = createDataSet();

export function App() {
    const [activeCategory, setCategory] = React.useState("");
    const [activeRestaurant, setRestaurant] = React.useState("");
    const [activeMenuItem, setMenuItem] = React.useState("");
    const NutritionContent = activeMenuItem != "" ? data.find((item) => item['item_name'] === activeMenuItem) : null;
    return (
        <main className="App">
            {/*Categories sidebar goes here*/}
            <div className="CategoriesColumn col">
                <div className="categories options">
                    <h2 className="title">Categories</h2>
                    {categories.map((category, index) => (
                        <Chip
                            label={category}
                            key={`category` + index}
                            isActive={category === activeCategory}
                            onClick={() => {
                                setCategory(category);
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* MAIN COLUMN */}
            <div className="container">
                {/* HEADER GOES HERE */}
                <Header info={appInfo} />

                {/* RESTAURANTS ROW */}
                <div className="RestaurantsRow">
                    <h2 className="title">Restaurants</h2>
                    <div className="restaurants options">
                        {restaurants.map((restaurant, index) => (
                            <Chip label={restaurant} key={`category` + index} isActive={restaurant === activeRestaurant} onClick={() => (
                              setRestaurant(restaurant)
                            )}/>
                        ))}
                    </div>
                </div>

                {<Instructions instructions={appInfo.instructions.start} />}

                {/* MENU DISPLAY */}
                <div className="MenuDisplay display">
                    <div className="MenuItemButtons menu-items">
                        <h2 className="title">Menu Items</h2>
                        {data
                            .filter((item) => item['food_category'] === activeCategory && item['restaurant'] === activeRestaurant)
                            .map((item, index) => (<Chip label={item['item_name']} key={`menu_item` + index} 
                            isActive={item['item_name'] === activeMenuItem} onClick={
                              () => (
                                setMenuItem(item['item_name'])
                              )
                            }/>))}
                    </div>

                    {/* NUTRITION FACTS */}
                    <div className="NutritionFacts nutrition-facts">
                      <NutritionalLabel item={NutritionContent} />
                    </div>
                </div>

                <div className="data-sources">
                    <p>{appInfo.dataSource}</p>
                </div>
            </div>
        </main>
    );
}

export default App;
