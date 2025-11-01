import React from 'react';

const COLORS = {
  green: '#52b788',
};

function Contact() {
  return (
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
  );
}

export default Contact;