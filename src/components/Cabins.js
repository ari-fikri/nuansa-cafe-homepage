import React from 'react';

function Cabins({ cabins }) {
  return (
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
  );
}

export default Cabins;