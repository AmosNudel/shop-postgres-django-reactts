import React, { useState, useEffect } from 'react';
import { Category } from './ShopModels';
import { Link } from 'react-router-dom';

const CategoriesComponent: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/categories');
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          console.error('Failed to fetch categories');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <h2 className="mb-4">Categories</h2>
      <div className="d-flex flex-column">
        {categories.map((category) => (
          <Link key={category.id} to={`/category/${category.id}`} className="mb-2">
            <button className="btn btn-primary w-100">{category.name}</button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesComponent;
