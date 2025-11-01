import React from 'react';

const COLORS = {
  primary: '#2C1810',
  card: 'rgba(255, 255, 255, 0.9)',
  textLight: '#6B635B',
};

function Menu({ menu }) {
  return (
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
  );
}

export default Menu;