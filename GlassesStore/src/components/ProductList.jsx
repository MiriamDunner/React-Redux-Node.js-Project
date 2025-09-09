import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../features/products/productsSlice';
import ProductCard from './ProductCard';

function ProductList() {
  const dispatch = useDispatch();
  const { items: products, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filterByCategory = (category) =>
    products.filter((p) => p.category === category);

   



  if (status === 'loading') return <p>🔄 טוען מוצרים...</p>;
  if (status === 'failed') return <p>❌ שגיאה בטעינת מוצרים</p>;

  return (
    <div>
      <h2>🧑‍🏫 משקפי ראייה</h2>
      {filterByCategory('Glasses').map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}


      <h2>🕶️ משקפי שמש</h2>
      {filterByCategory('Sunglasses').map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}

      <h2>👁️ עדשות מגע</h2>
      {filterByCategory('ContactLenses').map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
