import * as React from "react"
import Chip from "../components/Chip/Chip"
import NutritionalLabel from "../components/NutritionalLabel/NutritionalLabel"


export function MenuDisplay(props) {
    return(
        <div className="MenuDisplay display">
            <div className="MenuItemButtons menu-items">
            <h2 className="title">Menu Items</h2>
            {/* YOUR CODE HERE */}
            {props.currentMenuItems.map((menuItem, index) => (
                <Chip key={index}
                    label={menuItem.item_name}
                    isActive = {props.selectedMenuItem === menuItem}
                    onClick = {() => props.setSelectedMenuItem(menuItem)}
                    onClose = {(evt) => {
                        evt.stopPropagation();
                        props.setSelectedMenuItem(0);
                    }}/>
            ))}
            </div>
            {/* NUTRITION FACTS */}
            <div className="NutritionFacts nutrition-facts"> 
                {/* YOUR CODE HERE */}
                <NutritionalLabel item={props.selectedMenuItem}/> 
            </div>
        </div>
    )
}
  
  export default MenuDisplay