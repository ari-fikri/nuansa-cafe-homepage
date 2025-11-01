import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Cabins from './components/Cabins';
import Gallery from './components/Gallery';
import Contact from './components/Contact';

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
    let lastKnownScrollPosition = 0;
    let ticking = false;

    const handleScroll = () => {
      lastKnownScrollPosition = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsAtTop(lastKnownScrollPosition < 50);
          if (backgroundRef.current) {
            backgroundRef.current.style.backgroundPositionY = `${lastKnownScrollPosition * -0.3}px`;
          }
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
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
      
      <Header route={route} nav={nav} isAtTop={isAtTop} />

      <main className="max-w-5xl mx-auto px-6 scroll-mt-20">
        <div id="content-area" className="w-full rounded-2xl overflow-hidden" style={{ backgroundColor: 'rgba(243,215,184,0.8)', padding: '35px', marginTop: '80px' }}>
          <Hero nav={nav} />
          <Menu menu={menu} />
          <Cabins cabins={cabins} />
          <Gallery gallery={gallery} setGalleryOpen={setGalleryOpen} />
          <Contact />
        </div>
      </main>

      <footer className="border-t py-6" style={{ borderColor: '#e6e0da' }}>
        <div className="max-w-5xl mx-auto px-6 text-sm text-gray-600 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} Nuansa Cafe — All rights reserved.</div>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/nuansa_suites/" aria-label="Instagram">Instagram</a>
            <a href="https://www.tiktok.com/@nuansa.suites" aria-label="Tiktok">Tiktok</a>
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