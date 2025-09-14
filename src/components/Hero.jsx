import React from 'react';
import { Search } from 'lucide-react';

function Hero() {
  return (
    <section className="hero-section relative text-white">
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative container mx-auto px-4 flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-wider mb-4">
          Snap It
        </h1>
        <p className="max-w-3xl text-lg md:text-xl font-light mb-8">
          Your life, simplified. Get fresh groceries and essentials delivered to your doorstep, on time and at the best price. Convenience shouldn’t cost extra.
        </p>
        <div className="w-full max-w-2xl">
          <div className="relative">
            <input
              type="search"
              placeholder="Search for products..."
              className="w-full p-4 pl-12 text-lg text-gray-800 rounded-full border-2 border-transparent focus:ring-4 focus:ring-secondary focus:border-secondary outline-none transition"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
