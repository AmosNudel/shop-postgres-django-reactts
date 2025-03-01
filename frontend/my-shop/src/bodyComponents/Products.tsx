import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from './ShopModels';
import AmountControl from './AmountControl';

interface ProductsComponentProps {
  addToCart: (product: Product) => void;
}

const ProductsComponent: React.FC<ProductsComponentProps> = ({ addToCart }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/products?category=${id}`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    if (id) {
      fetchProducts();
    }
  }, [id]);

  return (
    <div>
      <h2 className="mb-4">Products</h2>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Price: ${product.price}</p>
                <AmountControl
                  productName={product.name}
                  productPrice={product.price}
                  addToCart={() => addToCart(product)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsComponent;
