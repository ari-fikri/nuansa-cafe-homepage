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

          <label className="block text-sm mb-2">Mobile Number</label>
          <input type="tel" required className="w-full border p-2 rounded mb-4" />

          <label className="block text-sm mb-2">Message</label>
          <textarea required className="w-full border p-2 rounded mb-4" rows={4} />

          <button type="submit" className="px-4 py-2 rounded" style={{ backgroundColor: COLORS.green, color: '#fff' }}>Send Request</button>
        </form>

        <div className="bg-white p-[10px] md:p-6 rounded-[12px] shadow-sm">
          <div className="text-sm text-gray-700 mb-3">Our Location</div>
          <div className="relative h-0 overflow-hidden" style={{ paddingBottom: '75%' }}>
            <iframe
              title="Nuansa Suites GMap Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.999375214368!2d107.41758907582125!3d-7.126067092877741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e688ce5f978533f%3A0xab30f1bde73d7559!2sNuansa%20suites%20datarpuspa%20alamendah!5e0!3m2!1sen!2sid!4v1761999939978!5m2!1sen!2sid"
              className="absolute top-0 left-0 w-full h-full"
              allowFullScreen=""
              loading="lazy">
            </iframe>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <div>Jl. Raya Ciwidey - Patengan No.199, Alamendah, Kec. Rancabali, Kabupaten Bandung, Jawa Barat 40973</div>
            <div className="mt-1">Phone: +62 852 1144 1718</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;