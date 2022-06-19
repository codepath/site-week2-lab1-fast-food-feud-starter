import React from 'react'
import Chip from './Chip/Chip'

export const RestaurantsRow = ({setRest, res, restaurants}) => {
  return (
    <div className="RestaurantsRow">
        <h2 className="title">Restaurants</h2>
        <div className="restaurants options">{restaurants.map((rest, idx) => (
        <Chip key={idx} label={rest} onCloseClick={(e) =>{
        e.stopPropagation()
        setRest('')}} onClick={() => setRest(rest)} isActive={rest === res ? true : false}/>))}</div>
    </div>
  )
}
