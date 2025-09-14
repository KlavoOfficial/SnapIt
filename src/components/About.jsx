import React from 'react';
import { Award, Zap, Smile } from 'lucide-react';

const features = [
  {
    icon: <Award size={40} className="text-secondary" />,
    title: 'Quality First',
    description: 'We source the freshest products from trusted partners to ensure you get the best quality every time.',
  },
  {
    icon: <Zap size={40} className="text-secondary" />,
    title: 'Lightning Fast',
    description: 'Our delivery network is optimized for speed, getting your order to you when you need it.',
  },
  {
    icon: <Smile size={40} className="text-secondary" />,
    title: 'Customer Happiness',
    description: 'Your satisfaction is our priority. Our support team is always ready to help with any questions.',
  },
];

function About() {
  return (
    <section id="about" className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">Why Choose Us?</h2>
        <p className="max-w-2xl mx-auto text-lg text-white/80 mb-12">
          We're more than just a delivery service. We're a promise of quality, speed, and a hassle-free grocery experience.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div key={index} className="bg-primary-dark p-8 rounded-2xl shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
              <div className="flex justify-center items-center h-20 w-20 rounded-full bg-primary mx-auto mb-6">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-secondary">{feature.title}</h3>
              <p className="text-white/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
