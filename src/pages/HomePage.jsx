import React from 'react';
import Hero from '../components/Hero';
import ProductList from '../components/ProductList';
import HowItWorks from '../components/HowItWorks';
import About from '../components/About';
import Footer from '../components/Footer';

function HomePage() {
  return (
    <div className="bg-white">
      <Hero />
      <About />
      <HowItWorks />
      <ProductList />
      <Footer />
    </div>
  );
}

export default HomePage;
