
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import './MyOrdersPage.css';

// function MyOrdersPage() {
//   const userTz = useSelector((state) => state.user.currentUser?.tz || 'אנונימי');
//   const navigate = useNavigate();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     console.log('userTz:', userTz);
//     if (userTz === 'אנונימי') {
//       console.log('מפנה ל-/login כי המשתמש לא מחובר');
//       setError('אנא התחבר כדי לראות את ההזמנות שלך');
//       setLoading(false);
//       navigate('/login');
//       return;
//     }

//     const fetchOrders = async () => {
//       try {
//         console.log('שולף הזמנות עבור tz:', userTz);
//         const response = await fetch(`http://localhost:4000/order/orders/tz/${userTz}`);
//         if (!response.ok) {
//           const errorText = await response.text();
//           console.log('תגובת שגיאה מה-API:', errorText, 'סטטוס:', response.status);
//           if (response.status === 404) {
//             setOrders([]);
//             setLoading(false);
//             return;
//           }
//           throw new Error(errorText || 'שגיאה בשליפת ההזמנות');
//         }
//         const data = await response.json();
//         console.log('הזמנות התקבלו:', data);
//         setOrders(data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//         console.error('שגיאה בשליפת ההזמנות:', err);
//       }
//     };

//     fetchOrders();
//   }, [userTz, navigate]);

//   return (
//     <div className="my-orders-container">
//       <h2 className="my-orders-title">ההזמנות שלי</h2>
//       {loading && (
//         <div className="loading">
//           <div className="spinner"></div>
//           טוען הזמנות...
//         </div>
//       )}
//       {error && <div className="error">שגיאה: {error}</div>}
//       {!loading && !error && orders.length === 0 && (
//         <p className="no-orders">אין הזמנות להצגה</p>
//       )}
//       {!loading && !error && orders.length > 0 && (
//         <ul className="orders-list">
//           {orders.map((order, index) => (
//             <li key={order.id} className="order-item" style={{ animationDelay: `${index * 0.1}s` }}>
//               <div className="order-details">
//                 <p><span className="order-label">מספר הזמנה:</span> {order.id}</p>
//                 <p><span className="order-label">תאריך:</span> {order.orderDate}</p>
//                 <p><span className="order-label">פריטים:</span> {order.cart.map(item => `${item.name} (כמות: ${item.qty})`).join(', ')}</p>
//                 <p><span className="order-label">סה"כ:</span> {order.cart.reduce((total, item) => total + (item.price * item.qty), 0)} ₪</p>
//                 <button className="details-button" >
//                   פרטים נוספים
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default MyOrdersPage;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './MyOrdersPage.css';

function MyOrdersPage() {
  const userTz = useSelector((state) => state.user.currentUser?.tz || 'אנונימי');
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('userTz:', userTz);
    if (userTz === 'אנונימי') {
      console.log('מפנה ל-/login כי המשתמש לא מחובר');
      setError('אנא התחבר כדי לראות את ההזמנות שלך');
      setLoading(false);
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        console.log('שולף הזמנות עבור tz:', userTz);
        const response = await fetch(`http://localhost:4000/order/orders/tz/${userTz}`);
        if (!response.ok) {
          const errorText = await response.text();
          console.log('תגובת שגיאה מה-API:', errorText, 'סטטוס:', response.status);
          if (response.status === 404) {
            setOrders([]);
            setLoading(false);
            return;
          }
          throw new Error(errorText || 'שגיאה בשליפת ההזמנות');
        }
        const data = await response.json();
        console.log('הזמנות התקבלו:', data);
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error('שגיאה בשליפת ההזמנות:', err);
      }
    };

    fetchOrders();
  }, [userTz, navigate]);

  return (
    <div className="my-orders-container">
      <h2 className="my-orders-title">ההזמנות שלי</h2>
      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          טוען הזמנות...
        </div>
      )}
      {error && <div className="error">שגיאה: {error}</div>}
      {!loading && !error && orders.length === 0 && (
        <p className="no-orders">אין הזמנות להצגה</p>
      )}
      {!loading && !error && orders.length > 0 && (
        <ul className="orders-list">
          {orders.map((order, index) => (
            <li key={order.id} className="order-item" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="order-details">
                <p><span className="order-label">מספר הזמנה:</span> {order.id}</p>
                <p><span className="order-label">תאריך:</span> {order.orderDate}</p>
                <div className="order-items">
                  <span className="order-label">פריטים:</span>
                  {order.cart.map((item, idx) => (
                    <p key={idx} className="cart-item">
                      {item.name} (כמות: {item.qty})
                    </p>
                  ))}
                </div>
                <p><span className="order-label">סה"כ:</span> {order.cart.reduce((total, item) => total + (item.price * item.qty), 0)} ₪</p>
                <button className="details-button">
                  פרטים נוספים
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyOrdersPage;