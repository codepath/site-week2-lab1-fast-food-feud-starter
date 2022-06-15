import * as React from "react"
import Chip from "../components/Chip/Chip"

export function RestaurantRow(props) {
    return(
        <div className="RestaurantsRow">
          <h2 className="title">Restaurants</h2>
          <div className="restaurants options">
            {/* ADD CODE HERE*/}
          {props.restaurants.map((restaurant) => (
              <Chip key={restaurant}
                    label={restaurant}
                    isActive = {props.selectedRestaurant === restaurant}
                    onClick = {() => props.setSelectedRestaurant(restaurant)}
                    onClose = {(evt) => {
                      evt.stopPropagation();
                      props.setSelectedRestaurant(0);
                    }}/>
          ))} 
          </div>
        </div>
    )
}
  
  export default RestaurantRow