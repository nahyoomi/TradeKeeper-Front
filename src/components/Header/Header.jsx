import './Header.scss'

const Header = () => {
  const currentPath = window.location.pathname;
  return (
    <div className="header">
      <span>Dashboard</span> {currentPath}
    </div>
  )
}

export default Header
