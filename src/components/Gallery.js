import React from 'react';

function Gallery({ gallery, setGalleryOpen }) {
  return (
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
  );
}

export default Gallery;