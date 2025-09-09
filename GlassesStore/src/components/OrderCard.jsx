// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProducts } from '../features/products/productsSlice';
// import { useParams } from 'react-router-dom';
// import { Link } from 'react-router-dom';

// import ZoomableImage from './ZoomableImage';
// import GlassesOptions from './GlassesOptions';
// import SunglassesOptions from './SunglassesOptions';
// import ContactLensOptions from './ContactLensOptions';
// import './OrderCard.css';

// function OrderCard(){
//     const { id } = useParams();
//    const products = useSelector((state) => state.products.items); 
//   const product = products.find(p => String(p.id) === id); 
//   const [showOptions, setShowOptions] = useState(false);

//  if (!product) {
//     return <div>404 not found</div>; 
//   }

// function renderOptionsByCategory(product) {
//   switch (product.category) {
//     case 'Eyeglasses':
//       return <GlassesOptions product={product} />;
//     case 'Sunglasses':
//       return <SunglassesOptions product={product} />;
//     case 'ContactLenses':
//       return <ContactLensOptions product={product} />;
//     default:
//       return <GlassesOptions product={product} />;
//   }
// }



// //  return (
// //     <div className="orderPageLayout" style={{ display: 'flex', gap: '30px' }}>
// //       <h2>{product.name}</h2>
// //       <p>{product.description}</p>
// //       <p>מחיר: {product.price} ₪</p>
      
// //        <ZoomableImage
// //         src={`http://localhost:4000${product.imgUrl}`}
// //         alt={product.name}
// //       />
// //       <div style={{ flex: '0 0 300px' }}>
// //    <div>
// //       {/* <button onClick={() => setShowOptions(!showOptions)}>בחירת עדשה</button>
// //       {showOptions && renderOptionsByCategory(product)} */}
// //      {!showOptions && (
// //     <button onClick={() => setShowOptions(true)}>בחירת עדשה</button>
// //     )}
// //     {showOptions && renderOptionsByCategory(product)}


// //   </div>
   
// //   </div>
// //        <Link to="/products">חזרה לדף המוצרים</Link>
// //     </div>
    
// //   );
// // }
// return (
//   <div className="orderPageLayout">
//     <div className="orderImageWrapper">
//       <ZoomableImage
//         src={`http://localhost:4000${product.imgUrl}`}
//         alt={product.name}
//       />
//     </div>

//     <div className="orderDetails">
//   <div className="productInfo">
//     <h2>{product.name}</h2>
//     <p>{product.description}</p>
//     <p> {product.price} ₪</p>
//   </div>

//   {!showOptions && (
//     <button onClick={() => setShowOptions(true)}>בחירת עדשה</button>
//   )}
//   {showOptions && renderOptionsByCategory(product)}

//   <Link to="/products" className="backButton">חזרה לדף המוצרים</Link>

// </div>
//   </div>
// );
// }
// export default OrderCard;

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchProducts, deleteProduct, addProduct } from '../features/products/productsSlice';


import ZoomableImage from './ZoomableImage';
import GlassesOptions from './GlassesOptions';
import SunglassesOptions from './SunglassesOptions';
import ContactLensOptions from './ContactLensOptions';
import { updateProduct } from '../features/products/productsSlice';
import './OrderCard.css';
import { toast } from 'react-hot-toast';

function OrderCard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const products = useSelector((state) => state.products.items);
  const product = products.find(p => String(p.id) === id);
  const user = useSelector((state) => state.user.currentUser);


  const [showOptions, setShowOptions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    image: null,
  });
  
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  useEffect(() => {
    if (product) {
      setEditData({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category: product.category,
        image: null,
      });
    }
  }, [product]);

  if (!product) return <div className="notFound">404 - המוצר לא נמצא</div>;

  const renderOptionsByCategory = (product) => {
    switch (product.category) {
      case 'Eyeglasses':
        return <GlassesOptions product={product} />;
      case 'Sunglasses':
        return <SunglassesOptions product={product} />;
      case 'ContactLenses':
        return <ContactLensOptions product={product} />;
      default:
        return null;
    }
  };

  const handleDelete = async () => {
  if (window.confirm('האם אתה בטוח שברצונך למחוק את המוצר?')) {
    try {
      await dispatch(deleteProduct(product.id)).unwrap();
      toast.success('המוצר נמחק בהצלחה 🗑️');
      navigate('/products');
    } catch (err) {
      toast.error('שגיאה במחיקה ❌');
    }
  }
};


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setEditData(prev => ({ ...prev, image: files[0] }));
    } else {
      setEditData(prev => ({ ...prev, [name]: value }));
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const updatedProduct = {
    id: product.id,
    ...editData,
  };
  try {
    await dispatch(updateProduct(updatedProduct)).unwrap();
    toast.success('המוצר עודכן בהצלחה ✅');
    setIsEditing(false);
    dispatch(fetchProducts());
  } catch (err) {
    toast.error('שגיאה בעדכון ❌');
  }
};


  return (
    <div className="orderPageLayout">
      <div className="orderImageWrapper">
        <ZoomableImage
          src={`http://localhost:4000${product.imgUrl}`}
          alt={product.name}
        />
      </div>

      <div className="orderDetails">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="editForm">
            <label>
              שם:
              <input type="text" name="name" value={editData.name} onChange={handleChange} required />
            </label>
            <label>
              תיאור:
              <textarea name="description" value={editData.description} onChange={handleChange} required />
            </label>
            <label>
              מחיר:
              <input type="number" name="price" value={editData.price} onChange={handleChange} required />
            </label>
            <label>
              מלאי:
              <input type="number" name="stock" value={editData.stock} onChange={handleChange} required />
            </label>
            <label>
              קטגוריה:
              <select name="category" value={editData.category} onChange={handleChange} required>
                <option value="Eyeglasses">משקפיים</option>
                <option value="Sunglasses">משקפי שמש</option>
                <option value="ContactLenses">עדשות מגע</option>
              </select>
            </label>
            {/* <label>
              תמונה חדשה:
              <input type="file" name="image" onChange={handleChange} />
            </label> */}
            <div className="editButtons">
              <button type="submit">💾 </button>
              <button type="button" onClick={() => setIsEditing(false)}>❌</button>
            </div>
          </form>
        ) : (
          <>
            <div className="productInfo">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              {/* <Link to="/try-glasses">
  <button className="bg-blue-500 text-white rounded px-4 py-2">
    נסה משקפיים על הפנים שלך
  </button>
</Link> */}



              <p>מחיר: {product.price} ₪</p>
              {user?.isAdmin && (
  <>
    <p>מלאי: {product.stock}</p>
    {product.stock < 50 && (
      <p style={{ color: 'red' }}>⚠️ המלאי אוזל!</p>
    )}
  </>
)}

            </div>
{user && !user.isAdmin && (
  <>
    {!showOptions && (
      <button onClick={() => setShowOptions(true)}>בחירת עדשה</button>
    )}
    {showOptions && renderOptionsByCategory(product)}
  </>
)}

            {user && user.isAdmin && (

              <div className="adminButtons">
                <button onClick={() => setIsEditing(true)}>✏️</button>
                <button
                  onClick={handleDelete}
                  className="deleteButton"
                >
                  🗑️ 
                </button>
              </div>
            )}
          </>
        )}

        <Link to="/products" className="backButton">← חזרה למוצרים</Link>
      </div>
    </div>
  );
}

export default OrderCard;
