import { useNavigate, useLocation } from 'react-router-dom'

const tabs = [
  { id: 'map', icon: 'map', label: 'Map', route: '/' },
  { id: 'learn', icon: 'menu_book', label: 'Learn', route: '/learn' },
  { id: 'shop', icon: 'shopping_bag', label: 'Shop', route: '/shop' },
  { id: 'friends', icon: 'group', label: 'Friends', route: '/friends' },
] as const

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <nav className="bottom-nav">
      {tabs.map(tab => {
        const active = location.pathname === tab.route
        return (
          <button
            key={tab.id}
            onClick={() => navigate(tab.route)}
            className={`bottom-nav__tab ${active ? 'bottom-nav__tab--active' : ''}`}
          >
            <span className="material-symbols-outlined">{tab.icon}</span>
            <span className="bottom-nav__label">{tab.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
