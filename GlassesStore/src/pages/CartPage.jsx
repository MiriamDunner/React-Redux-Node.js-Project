import { useSelector, useDispatch } from 'react-redux';
import { increaseQty, decreaseQty, removeFromCart, clearCart } from '../features/cart/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useNavigate, Link } from 'react-router-dom';

import './CartPage.css';

function CartPage() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleOrder = async () => {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items,
        userId: state.currentUser.id
      })
    });

    if (response.ok) {
      dispatch(clearCart());
      alert("הזמנה בוצעה בהצלחה!");
    }
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">סל קניות</h2>
      {items.length === 0 ? (
        <p className="cart-empty">אין מוצרים בעגלה.</p>
      ) : (
        <>
          <ul className="cart-list">
            {items.map((item) => (
              <li key={item.id} className="cart-item">
                <img
                  src={`http://localhost:4000${item.imgUrl}`}
                  alt={item.name}
                  className="cart-image"
                />
                <div className="cart-details">
                  <span className="cart-name">{item.name}</span>
                  <span className="cart-price">מחיר: {item.price} ₪</span>
                  <div className="cart-qty">
                                        <button onClick={() => {
  
          dispatch(decreaseQty(item.id));
       toast.info('הכמות הוקטנה.', { position: 'bottom-right' });
      }}
>
  ➖
</button>

                    <span>{item.qty}</span>
                    <button
  onClick={() => {
    dispatch(increaseQty(item.id));
    toast.success('הכמות עודכנה בהצלחה!', { position: 'bottom-right' });
  }}
>
  ➕
</button>

                  </div>
                  <span className="cart-total">סה"כ: {(item.price * item.qty).toFixed(2)} ₪</span>
                                    <button
  className="remove-btn"
  onClick={() => {
    dispatch(removeFromCart(item.id));
    toast.error('הפריט הוסר מהעגלה.', { position: 'bottom-right' });
  }}
>
  🗑️
</button>

                </div>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <h3>סך הכל לתשלום: {total.toFixed(2)} ₪</h3>
            <button className="order-btn"  onClick={() => {
       navigate('/OrderFinish');
         }}  >בצע הזמנה</button>
          </div>
        </>
      )}
      <ToastContainer />

    </div>
  );
}

export default CartPage;
