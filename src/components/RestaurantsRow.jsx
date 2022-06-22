import React from 'react'
import Chip from './Chip/Chip'

export const RestaurantsRow = ({setRestauraunt, restaurant, restaurants}) => {
  return (
    <div className="RestaurantsRow">
        <h2 className="title">Restaurants</h2>
        <div className="restaurants options">{restaurants.map((rest, idx) => (
        <Chip key={idx} label={rest} onCloseClick={(e) =>{
        e.stopPropagation()
        setRestauraunt('')}} onClick={() => setRestauraunt(rest)} isActive={rest === restaurant ? true : false}/>))}</div>
    </div>
  )
}
