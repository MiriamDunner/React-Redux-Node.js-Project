import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import { fetchProducts } from '../features/products/productsSlice';
import ProductCard from '../components/ProductCard';
import './ProductsPage.css';


function ProductsPage() {
  const dispatch = useDispatch();
  const { items: products, status } = useSelector((state) => state.products);
  const [selectedCategory, setSelectedCategory] = useState('Eyeglasses'); 

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const filteredProducts = products.filter(
    (product) => product.category === selectedCategory
    
  );

  return (
    <div>
<div style={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '20px 0' }}>
  <button onClick={() => setSelectedCategory('Eyeglasses')} className='category-button'>
    <img src='/images/glass2.png' alt='glasses' className='category-icon' />
  </button>
  <button onClick={() => setSelectedCategory('Sunglasses')} className='category-button'>
    <img src='/images/sun2.jpg' alt='sun' className='category-icon' />
  </button>
  <button onClick={() => setSelectedCategory('ContactLenses') } className='category-button'>
    <img src="/images/contact.png" alt="contact" className='category-icon' />
  </button>
</div>
      {status === 'loading' && <p>טוען מוצרים...</p>}
      {status === 'failed' && <p>שגיאה בטעינה</p>}

    <div className="products-grid">
  {filteredProducts.map((product) => (
    <ProductCard key={product.id} product={product} />
  ))}
</div>

    </div>
  );
}

export default ProductsPage;
