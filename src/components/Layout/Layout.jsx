import React from 'react'

export const Layout = ({children}) => {
  return (
    <div>
        <main>{children}</main>
    </div>
  )
}

//Header, sidebar como nav con clic y renderize el children, installar axios, mostrar lista en dashboard