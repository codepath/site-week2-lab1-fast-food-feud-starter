import React from 'react'
import Chip from './Chip/Chip';

export const CategoryColumn = ({setCategory, category, categories}) => {
  return (
    <div className="CategoriesColumn col">
        <div className="categories options">
          <h2 className="title">Categories</h2>
          {categories.map((cat, idx) => (<Chip key={idx} label={cat} onCloseClick={(e) => {
            e.stopPropagation();
            setCategory('')}} onClick={() => setCategory(cat)} isActive={cat === category ? true : false}/>))}
        </div>
      </div>
  )
}
