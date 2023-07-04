import Header from '../Header/Header'
import Navbar from '../Navbar/Navbar'

export const Layout = ({children}) => {
  return (
    <div>
      <Header/>
      <Navbar/>
        <main>{children}</main>
    </div>
  )
}

//Header, sidebar como nav con clic y renderize el children, installar axios, mostrar lista en dashboard