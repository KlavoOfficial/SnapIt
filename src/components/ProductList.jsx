import React, { useState, useEffect } from 'react';
import { productAPI } from '../utils/api';
import ProductCard from './ProductCard';
import { LoaderCircle } from 'lucide-react';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productAPI.getProducts({ limit: 8 }); // Fetch 8 products
        if (response.success) {
          setProducts(response.data.products);
        } else {
          setError('Failed to load products.');
        }
      } catch (err) {
        setError(err.message || 'An error occurred while fetching products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section id="products" className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Featured Products</h2>
          <p className="max-w-2xl mx-auto text-lg text-white/80">
            Handpicked for you. The freshest and finest, ready to be snapped up.
          </p>
        </div>

        {loading && (
          <div className="flex justify-center items-center text-white">
            <LoaderCircle className="animate-spin mr-2" />
            <span>Loading Products...</span>
          </div>
        )}

        {error && <p className="text-center text-red-400">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductList;
