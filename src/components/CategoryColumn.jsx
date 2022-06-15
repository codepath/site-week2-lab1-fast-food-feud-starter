import * as React from "react"
import Chip from "../components/Chip/Chip"

export function CategoryColumn(props) {
    return(
        <div className="CategoriesColumn col">
        <div className="categories options">
          <h2 className="title">Categories</h2>
          {/* ADD CODE HERE*/}
           {props.categories.map((category) => (
              <Chip key={category}
                    label={category}
                    isActive = {props.selectedCategory === category}
                    onClick = {() => props.setSelectedCategory(category)}
                    onClose = {(evt) => {
                      evt.stopPropagation();
                      props.setSelectedCategory(0);
                    }}/>
          ))} 
         </div>
      </div>
    )
}
  
  export default CategoryColumn