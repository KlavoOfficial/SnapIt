import React from 'react';
import { ShoppingCart, Search, Truck } from 'lucide-react';

const steps = [
  {
    icon: <Search size={48} className="text-primary" />,
    title: '1. Browse & Select',
    description: 'Explore our wide range of products and add your favorites to the cart.',
  },
  {
    icon: <ShoppingCart size={48} className="text-primary" />,
    title: '2. Place Your Order',
    description: 'Proceed to checkout, choose your delivery slot, and confirm your order with a single snap.',
  },
  {
    icon: <Truck size={48} className="text-primary" />,
    title: '3. Get It Delivered',
    description: 'Sit back and relax while we pick, pack, and deliver your groceries right to your doorstep.',
  },
];

function HowItWorks() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-primary mb-4">How It Works</h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-16">
          Getting your groceries has never been this easy. Three simple steps to a full fridge.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="flex justify-center items-center h-24 w-24 rounded-full bg-secondary/20 mb-6">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-primary">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
