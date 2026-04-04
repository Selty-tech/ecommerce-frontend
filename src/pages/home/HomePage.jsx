import { Header } from '../../Components/Header';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ProductsGrid } from './ProductsGrid';
import './HomePage.css';
import { useSearchParams } from 'react-router';

export function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search') || '';
  const [inputValue, setInputValue] = useState(search);

  useEffect(() => {
    const getHomeData = async () => {
      const urlPath = search
        ? `/api/products?search=${search}`
        : '/api/products';

      const response = await axios.get(urlPath);
      setProducts(response.data);
    };

    getHomeData();
  }, [search]);

  function handleSearch() {
    setSearchParams({ search: inputValue });
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }

  return (
    <>
      <Header cart={cart} />

      <div className="home-page">
        {/* 🔍 Search Bar */}
        <div style={{ marginBottom: '20px' }}>
          <input
            placeholder="Search products..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}