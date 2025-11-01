import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// Constants
const COLORS = {
  background: '#d4a373', // Main background color (updated)
  primary: '#2C1810', // Dark brown for text and buttons
  secondary: '#8B7355', // Softer brown for secondary text
  white: '#FFFFFF', // White for cards
  card: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white for cards
  textLight: '#6B635B', // Light brown for subtle text
  accent: '#2C1810', // Dark brown for accents
};

// Data
const menu = [
  { id: 'espresso', title: 'Espresso', desc: 'Single origin, pulled to order.', price: 'Rp 25.000', img: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=80' },
  { id: 'avocado', title: 'Avocado Toast', desc: 'Sourdough, smashed avocado, chili flakes.', price: 'Rp 55.000', img: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=80' },
  { id: 'cake', title: 'Signature Cake', desc: "Daily-baked, ask our counter for today's flavor.", price: 'Rp 45.000', img: 'https://picsum.photos/id/1080/1200/900' },
];

const cabins = [
  { id: 'forest', title: 'Forest Cabin', desc: 'Cozy cabin tucked among tall trees.', img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80' },
  { id: 'lake', title: 'Lakeside Cabin', desc: 'Deck with lake view and sunrise exposure.', img: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80' },
  { id: 'tiny', title: 'Hillside Tiny House', desc: 'Minimal comforts, maximum view.', img: 'https://picsum.photos/id/1018/1200/800' },
];

const gallery = [
  'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1595475038705-1af15f928681?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80',
];

function App() {
  const [route, setRoute] = useState('home');
  const [galleryOpen, setGalleryOpen] = useState({ open: false, idx: 0 });
  const [isAtTop, setIsAtTop] = useState(true);
  const backgroundRef = useRef(null);

  // Handle scroll for header transparency and parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Smooth parallax effect
    let currentPos = window.scrollY;
    const smoothing = 0.1;
    let animationFrameId;

    const smoothParallax = () => {
      let targetPos = window.scrollY;
      currentPos += (targetPos - currentPos) * smoothing;

      if (backgroundRef.current) {
        backgroundRef.current.style.backgroundPositionY = `${currentPos * 0.5}px`;
      }
      animationFrameId = requestAnimationFrame(smoothParallax);
    };
    smoothParallax();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      setRoute(hash);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash.replace('#', '') || 'home');
    window.addEventListener('hashchange', onHash);
    onHash();
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  function nav(to) {
    // Update URL without page reload
    window.history.pushState(null, '', `#${to}`);
    setRoute(to);
    
    // Smooth scroll to section with header offset
    const section = document.getElementById(to);
    if (section) {
      const headerOffset = 80; // Height of the fixed header
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: to === 'home' ? 0 : offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  const pageBg = {
    backgroundColor: COLORS.background,
    backgroundImage:
      'radial-gradient(circle at 10% 10%, rgba(255, 255, 255, 0.5), transparent 20%), radial-gradient(circle at 80% 90%, rgba(255, 255, 255, 0.5), transparent 20%)',
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Main background with blur */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1511920170033-f8396924c348)',
          minHeight: '100%',
          height: '100%',
          zIndex: -2,
          willChange: 'background-position',
        }}
      />
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          minHeight: '100%',
          height: '100%',
          zIndex: -1,
          // semi-transparent overlay so background image remains visible
          backgroundColor: 'rgba(212,163,115,0.6)'
        }}
      />
      {/* Header - transparent when on hero */}
      <header className={`fixed w-full z-40 transition-all duration-300 ${isAtTop ? 'bg-transparent' : 'bg-white/80 backdrop-blur-sm shadow-sm'}`}>
        <div className="max-w-5xl mx-auto flex items-center justify-between py-6 px-6">
          <div className={`flex items-baseline gap-4 transition-colors duration-300 ${isAtTop ? 'text-primary' : 'text-primary'}`}>
            <h1 className="text-2xl font-serif font-medium" style={{ letterSpacing: '0.02em', color: COLORS.primary }}>Flavored</h1>
            <div className={`text-sm ${isAtTop ? 'opacity-85' : ''}`} style={{ color: COLORS.textLight }}>Coffee Shop</div>
          </div>

          <nav className={`hidden md:flex items-center gap-6 text-sm transition-colors duration-300`} style={{ color: COLORS.primary }}>
            <NavLink active={route === 'home'} onClick={() => nav('home')}>Home</NavLink>
            <NavLink active={route === 'menu'} onClick={() => nav('menu')}>Menu</NavLink>
            <NavLink active={route === 'cabins'} onClick={() => nav('cabins')}>Cabins</NavLink>
            <NavLink active={route === 'gallery'} onClick={() => nav('gallery')}>Gallery</NavLink>
            <NavLink active={route === 'contact'} onClick={() => nav('contact')}>Contact</NavLink>
            <button onClick={() => nav('contact')} className="ml-4 px-4 py-2 rounded" style={{ backgroundColor: COLORS.orange, color: '#fff' }}>Reserve</button>
          </nav>

          {/* mobile menu */}
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

      <main className="max-w-5xl mx-auto px-6 scroll-mt-20">
  <div id="content-area" className="w-full rounded-2xl overflow-hidden" style={{ backgroundColor: 'rgba(243,215,184,0.8)', padding: '35px' }}>
        {/* Hero Section */}
        <section id="home" className="h-screen flex items-center">
          <div className="relative h-[70vh] md:h-[72vh] w-full overflow-hidden">
            <img src="https://images.unsplash.com/photo-1615324606695-afaaf3a8554e" alt="Hero espresso" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-transparent" />

            <div className="absolute inset-0 max-w-5xl mx-auto px-6 flex items-center">
              <div className="md:w-1/2 text-white">
                <h2 className="font-serif text-5xl font-semibold leading-tight" style={{ color: '#f0da9cff' }}>Coffee<br/>The Best For You</h2>
                <p className="mt-4 text-lg max-w-md" style={{ color: 'rgba(255, 240, 200, 1)' }}>Make up to something special. Experience the perfect blend of artisanal coffee crafted just for you.</p>
                <div className="mt-6 flex gap-3">
            <button onClick={() => nav('menu')} className="px-6 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all" style={{ backgroundColor: '#4aadb2', color: '#fff' }}>View Menu</button>
            <button onClick={() => nav('contact')} className="px-6 py-2.5 rounded-full border hover:shadow-sm transition-all" style={{ borderColor: COLORS.primary, color: COLORS.primary }}>Reserve</button>
                </div>
                <div className="mt-6 text-sm text-white/90">
                  <div>Open: Mon–Sun • 08:00 — 21:00</div>
                  <div className="mt-1">Jl. Nuansa No.9, Bandung</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Menu Section */}
        <section id="menu" className="py-16">
          <h3 className="font-serif text-3xl font-semibold mb-8" style={{ color: COLORS.primary }}>Featured Coffee</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {menu.map((m) => (
              <article key={m.id} className="rounded-2xl p-6 transform transition-all hover:-translate-y-1 hover:shadow-lg bg-white/90 backdrop-blur-md shadow-sm" style={{ backgroundColor: COLORS.card }}>
                <div className="h-44 overflow-hidden rounded-[10px] mb-3 relative" style={{ background: '#f7f5f2' }}>
                  <img src={m.img} alt={m.title} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/6 to-transparent" />
                </div>
                  <div className="bg-white/95 rounded-xl p-4 shadow-sm">
                    <div className="relative">
                      <div className="h-44 overflow-hidden rounded-lg mb-4">
                        <img src={m.img} alt={m.title} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <h4 className="font-serif font-medium text-xl" style={{ color: COLORS.primary }}>{m.title}</h4>
                      <p className="text-sm mt-2" style={{ color: COLORS.textLight }}>{m.desc}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="text-sm font-semibold" style={{ color: COLORS.primary }}>{m.price}</div>
                        <button className="text-sm px-4 py-1.5 rounded-full hover:shadow-sm transition-all" style={{ backgroundColor: COLORS.primary, color: '#fff' }} onClick={() => alert(`${m.title} added to order (placeholder)`)}>Add to Cart</button>
                      </div>
                    </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Cabins Section */}
        <section id="cabins" className="py-16">
          <h3 className="font-serif text-2xl font-semibold mb-4">Cabins & Glampings</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cabins.map((c) => (
              <figure key={c.id} className="bg-white rounded-[12px] shadow-sm overflow-hidden transform transition-all hover:-translate-y-1 hover:shadow-md">
                <img src={c.img} alt={c.title} className="w-full h-48 object-cover" loading="lazy" />
                <figcaption className="p-4">
                  <h4 className="font-serif font-medium text-lg">{c.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{c.desc}</p>
                  <button className="mt-3 text-sm text-[#ef8354]" onClick={() => alert('View details (placeholder)')}>View details</button>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="py-16">
          <h3 className="font-serif text-2xl font-semibold mb-4">Gallery</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {gallery.map((g, i) => (
              <button key={g} onClick={() => setGalleryOpen({ open: true, idx: i })} className="block overflow-hidden rounded shadow-sm bg-white">
                <img src={g} alt={`Gallery ${i + 1}`} className="w-full h-36 object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16">
          <h3 className="font-serif text-2xl font-semibold mb-4">Contact & Booking</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <form onSubmit={(e) => { e.preventDefault(); alert('Request sent (placeholder)'); }} className="bg-white p-6 rounded-[12px] shadow-sm">
              <label className="block text-sm mb-2">Name</label>
              <input required className="w-full border p-2 rounded mb-4" />

              <label className="block text-sm mb-2">Email</label>
              <input type="email" required className="w-full border p-2 rounded mb-4" />

              <label className="block text-sm mb-2">Message</label>
              <textarea required className="w-full border p-2 rounded mb-4" rows={4} />

              <button type="submit" className="px-4 py-2 rounded" style={{ backgroundColor: COLORS.green, color: '#fff' }}>Send Request</button>
            </form>

            <div className="bg-white p-6 rounded-[12px] shadow-sm">
              <div className="text-sm text-gray-700 mb-3">Our Location</div>
              <iframe title="Nuansa Cafe map" src="https://www.google.com/maps?q=Bandung+Indonesia&output=embed" className="w-full h-64 border-0" />
              <div className="mt-4 text-sm text-gray-600">
                <div>Jl. Nuansa No.9, Bandung</div>
                <div className="mt-1">Phone: +62 812 3456 7890</div>
              </div>
            </div>
          </div>
        </section>
        </div>
      </main>

      <footer className="border-t py-6" style={{ borderColor: '#e6e0da' }}>
        <div className="max-w-5xl mx-auto px-6 text-sm text-gray-600 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} Nuansa Cafe — All rights reserved.</div>
          <div className="flex gap-4">
            <a href="#" aria-label="Instagram">Instagram</a>
            <a href="#" aria-label="Facebook">Facebook</a>
          </div>
        </div>
      </footer>

      {/* Lightbox */}
      {galleryOpen.open && (
        <Lightbox images={gallery} idx={galleryOpen.idx} onClose={() => setGalleryOpen({ open: false, idx: 0 })} />
      )}
    </div>
  );
}

// Navigation Link Component
function NavLink({ children, active, onClick }) {
  return (
    <button onClick={onClick} className={`text-sm ${active ? 'underline' : 'opacity-80'}`} aria-current={active ? 'page' : undefined}>
      {children}
    </button>
  );
}

// Lightbox Component
function Lightbox({ images, idx = 0, onClose }) {
  const [i, setI] = useState(idx);

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setI((v) => (v + 1) % images.length);
      if (e.key === 'ArrowLeft') setI((v) => (v - 1 + images.length) % images.length);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [images.length, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" role="dialog" aria-modal="true">
      <div className="relative max-w-3xl w-full p-6 bg-white rounded-[12px] shadow-lg">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-700 bg-white/80 rounded px-2 py-1">Close</button>
        <img src={images[i]} alt={`Large ${i + 1}`} className="w-full h-[70vh] object-contain bg-black rounded" />
        <div className="flex justify-between mt-2">
          <button onClick={() => setI((v) => (v - 1 + images.length) % images.length)} className="px-3 py-2 bg-white/90 rounded">Prev</button>
          <button onClick={() => setI((v) => (v + 1) % images.length)} className="px-3 py-2 bg-white/90 rounded">Next</button>
        </div>
      </div>
    </div>
  );
}

export default App;