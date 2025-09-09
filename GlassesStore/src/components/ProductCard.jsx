
import './ProductCard.css';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
  const navigate = useNavigate();

  const goToOrderPage = () => {
    navigate(`/OrderCard/${product.id}`);
  };

  return (
    <div className="product-card" onClick={goToOrderPage}>
      <div className="product-image-wrapper">
        <img
          src={`http://localhost:4000${product.imgUrl}`}
          alt={product.name}
          className="product-image"
        />
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="price">{product.price} ₪</p>
      </div>
    </div>
  );
}

export default ProductCard;
