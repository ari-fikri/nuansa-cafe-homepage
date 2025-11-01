import React from 'react';

const COLORS = {
  background: '#d4a373',
  primary: '#2C1810',
  secondary: '#8B7355',
  white: '#FFFFFF',
  card: 'rgba(255, 255, 255, 0.9)',
  textLight: '#6B635B',
  accent: '#2C1810',
  orange: '#ef8354',
};

function NavLink({ children, active, onClick }) {
  return (
    <button onClick={onClick} className={`text-sm ${active ? 'underline' : 'opacity-80'}`} aria-current={active ? 'page' : undefined}>
      {children}
    </button>
  );
}

function Header({ route, nav, isAtTop }) {
  return (
    <header className={`fixed w-full z-40 transition-all duration-300 ${isAtTop ? 'bg-transparent' : 'bg-white/80 backdrop-blur-sm shadow-sm'}`}>      <div className="max-w-5xl mx-auto flex items-center justify-between py-6 px-6">
        <div className={`flex items-baseline gap-4 transition-colors duration-300 ${isAtTop ? 'text-primary' : 'text-primary'}`}><h1 className="text-2xl font-serif font-medium" style={{ letterSpacing: '0.02em', color: COLORS.primary }}>Nuansa</h1>
          <div className={`text-sm ${isAtTop ? 'opacity-85' : ''}`} style={{ color: COLORS.textLight }}>Coffee Shop & Glampings</div>
        </div>

        <nav className={`hidden md:flex items-center gap-6 text-sm transition-colors duration-300`} style={{ color: COLORS.primary }}>
          <NavLink active={route === 'home'} onClick={() => nav('home')}>Home</NavLink>
          <NavLink active={route === 'menu'} onClick={() => nav('menu')}>Menu</NavLink>
          <NavLink active={route === 'cabins'} onClick={() => nav('cabins')}>Cabins</NavLink>
          <NavLink active={route === 'gallery'} onClick={() => nav('gallery')}>Gallery</NavLink>
          <NavLink active={route === 'contact'} onClick={() => nav('contact')}>Contact</NavLink>
          <button onClick={() => nav('contact')} className="ml-4 px-4 py-2 rounded" style={{ backgroundColor: COLORS.orange, color: '#fff' }}>Reserve</button>
        </nav>

        <div className="md:hidden">
          <select aria-label="Navigate" value={route} onChange={(e) => nav(e.target.value)} className="border bg-white rounded p-2 text-sm">
            <option value="home">Home</option>
            <option value="menu">Menu</option>
            <option value="cabins">Cabins</option>
            <option value="gallery">Gallery</option>
            <option value="contact">Contact</option>
          </select>
        </div>
      </div>
    </header>
  );
}

export default Header;