import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProduct, fetchProducts } from '../features/products/productsSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddProductPage.css';

function AddProductPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, items: products, error } = useSelector((state) => state.products);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    image: null,
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const validateForm = () => {
    const errors = {};
    if (!formData.id.trim()) errors.id = 'מזהה המוצר הוא שדה חובה';
    else if (products.some((p) => p.id === formData.id)) errors.id = 'מזהה זה כבר קיים';
    if (!formData.name.trim()) errors.name = 'שם המוצר הוא שדה חובה';
    if (!formData.description.trim()) errors.description = 'תיאור המוצר הוא שדה חובה';
    if (!formData.price || isNaN(formData.price) || formData.price <= 0) errors.price = 'מחיר תקין הוא שדה חובה';
    if (!formData.stock || isNaN(formData.stock) || formData.stock < 0) errors.stock = 'כמות תקינה במלאי היא שדה חובה';
    if (!formData.category) errors.category = 'קטגוריה היא שדה חובה';
    if (!formData.image) errors.image = 'תמונה היא שדה חובה';
    return errors;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast.error('אנא מלא את כל השדות כנדרש');
      return;
    }

    try {
      const result = await dispatch(addProduct(formData)).unwrap();
      toast.success('המוצר נוסף בהצלחה!', {
        onClose: () => setTimeout(() => navigate('/products'), 500),
      });
    } catch (err) {
      toast.error(`שגיאה בהוספת מוצר: ${err || 'שגיאה לא ידועה'}`);
    }
  };

  return (
    <div className="order-form-wrapper">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="form-title">הוספת מוצר חדש</h2>
      {error && <div className="error-message">שגיאה: {error}</div>}
      <form className="form-section" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="id">מזהה מוצר</label>
            <input type="text" id="id" name="id" value={formData.id} onChange={handleChange} required className={formErrors.id ? 'error-input' : ''} />
            {formErrors.id && <span className="error-message">{formErrors.id}</span>}
          </div>
          <div className="form-field">
            <label htmlFor="name">שם המוצר</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className={formErrors.name ? 'error-input' : ''} />
            {formErrors.name && <span className="error-message">{formErrors.name}</span>}
          </div>
          <div className="form-field full-width">
            <label htmlFor="description">תיאור המוצר</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange} required className={formErrors.description ? 'error-input' : ''} />
            {formErrors.description && <span className="error-message">{formErrors.description}</span>}
          </div>
          <div className="form-field">
            <label htmlFor="price">מחיר (₪)</label>
            <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} min="0" step="0.01" required className={formErrors.price ? 'error-input' : ''} />
            {formErrors.price && <span className="error-message">{formErrors.price}</span>}
          </div>
          <div className="form-field">
            <label htmlFor="stock">כמות במלאי</label>
            <input type="number" id="stock" name="stock" value={formData.stock} onChange={handleChange} min="0" required className={formErrors.stock ? 'error-input' : ''} />
            {formErrors.stock && <span className="error-message">{formErrors.stock}</span>}
          </div>
          <div className="form-field">
            <label htmlFor="category">קטגוריה</label>
            <select id="category" name="category" value={formData.category} onChange={handleChange} required className={formErrors.category ? 'error-input' : ''}>
              <option value="">בחר קטגוריה</option>
              <option value="Eyeglasses">משקפי ראייה</option>
              <option value="Sunglasses">משקפי שמש</option>
              <option value="ContactLenses">עדשות מגע</option>
            </select>
            {formErrors.category && <span className="error-message">{formErrors.category}</span>}
          </div>
          <div className="form-field">
            <label htmlFor="image">תמונה</label>
            <input type="file" id="image" name="image" accept="image/*" onChange={handleChange} required className={formErrors.image ? 'error-input' : ''} />
            {formErrors.image && <span className="error-message">{formErrors.image}</span>}
          </div>
        </div>
        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'מוסיף...' : 'הוסף מוצר'}
        </button>
      </form>
    </div>
  );
}

export default AddProductPage;
