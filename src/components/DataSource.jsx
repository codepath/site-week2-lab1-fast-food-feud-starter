import React from 'react'

export const DataSource = ({appInfo}) => {
  return (
    <div className="data-sources">
        <p>{appInfo.dataSource}</p>
    </div>
  )
}
