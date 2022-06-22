import React from 'react'
import Chip from './Chip/Chip'
import NutritionalLabel from './NutritionalLabel/NutritionalLabel'

export const MenuDisplay = ({setItem, item, currentMenuItems}) => {
  return (
    <div className="MenuDisplay display">
        <div className="MenuItemButtons menu-items">
        <h2 className="title">Menu Items</h2>
        {currentMenuItems.length != 0 ? currentMenuItems.map((menu, idx) => <Chip key={idx} onCloseClick={(e) => {
            e.stopPropagation()
            setItem('')}} onClick={() => setItem(menu)} label={menu.item_name} isActive={menu === item ? true : false}/>): null}
        </div>

        {/* NUTRITION FACTS */}
        <div className="NutritionFacts nutrition-facts">{item != '' ? <NutritionalLabel item={item}/> : null}</div>
    </div>
  )
}
