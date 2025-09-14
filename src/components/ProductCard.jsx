import React from 'react';
import { Plus } from 'lucide-react';

const ProductCard = ({ product }) => {
  const imageUrl = product.images && product.images.length > 0 ? product.images[0].url : 'https://img-wrapper.vercel.app/image?url=https://placehold.co/400x400/purple/white?text=SnapIt';
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden group transition-all duration-300 hover:shadow-xl">
      <div className="relative">
        <img className="w-full h-48 object-cover" src={imageUrl} alt={product.name} />
        <div className="absolute top-2 right-2">
            <button className="bg-secondary text-primary h-10 w-10 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <Plus size={24} />
            </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 truncate">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{product.category}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-black text-primary">${product.price.toFixed(2)}</span>
          <span className="text-xs text-gray-500">/ {product.unit}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
