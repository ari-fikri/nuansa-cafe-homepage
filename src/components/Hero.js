import React from 'react';

const COLORS = {
  primary: '#2C1810',
};

function Hero({ nav }) {
  return (
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
            </div>
            <div className="mt-6 text-sm text-white/90">
              <div>Open: Mon–Sun • 10:00 — 21:00</div>
              <div className="mt-1">Jl. Raya Ciwidey - Patengan No.199, Alamendah, Kec. Rancabali, Kabupaten Bandung, Jawa Barat 40973</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;