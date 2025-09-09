import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { clearCart } from '../features/cart/cartSlice'; 
import './OrderFinishPage.css';

const schema = z.object({
  cardNumber: z.string().min(16, 'יש להזין 16 ספרות').max(16, 'יש להזין 16 ספרות').regex(/^\d+$/, 'מספר לא תקין'),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'פורמט לא תקין, למשל 08/25'),
  cvc: z.string().length(3, 'יש להזין 3 ספרות').regex(/^\d+$/, 'CVC לא תקין'),
  idNumber: z.string().length(9, 'יש להזין 9 ספרות').regex(/^\d+$/, 'ת"ז לא תקינה'),
  address: z.string().min(5, 'כתובת חייבת לכלול לפחות 5 תווים'),
  email: z.string().email('אימייל לא תקין'),
});

function OrderFinishPage() {
  const items = useSelector((state) => state.cart.items);
  const userId = useSelector((state) => state.user.currentUser?.tz || 'אנונימי');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
const {
  control,
  handleSubmit,
  formState: { errors },
} = useForm({
  resolver: zodResolver(schema),
  mode: 'onChange',
  defaultValues: {
    cardNumber: '',
    expiry: '',
    cvc: '',
    idNumber: '',
    address: '',
    email: '',
  },
});
const cleanCartItems = (items) => {
  return items.map(({ id, name, description, price, category, qty }) => ({
    id,
    name,
    description,
    price,
    category,
    prodDate: new Date().toLocaleDateString('he-IL'),
    qty,
  }));
};
const onSubmit = async (formData) => {

  try {
    const cleanedItems = cleanCartItems(items);

    const orderToSend = {
      id: Date.now(),
      tz: formData.idNumber,
      orderDate: new Date().toLocaleDateString('he-IL'),
      userId,
      cart: cleanedItems,
    };

    const response = await fetch('http://localhost:4000/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderToSend),
    });

    if (response.ok) {
       
      dispatch(clearCart());
      alert('ההזמנה נשלחה ונשמרה בהצלחה!');
     
       navigate("/home");
    } else {
      alert('שגיאה בשליחת ההזמנה');
        navigate("/home");
    }
  } catch (error) {
    console.error('שגיאה:', error);
    alert('שגיאה בשליחה');
  }
};
  return (
    <div className="page-background">
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="order-form-wrapper"
      >
        <h2 className="form-title">סיום הזמנה</h2>

        <fieldset className="form-section">
          <legend>פרטי כרטיס אשראי</legend>
          <div className="form-grid">
            <InputField label="מספר כרטיס אשראי" name="cardNumber" control={control} error={errors.cardNumber?.message} />
            <InputField label="תוקף (MM/YY)" name="expiry" control={control} error={errors.expiry?.message} />
            <InputField label="CVC" name="cvc" control={control} error={errors.cvc?.message} />
            <InputField label="תעודת זהות" name="idNumber" control={control} error={errors.idNumber?.message} />
          </div>
        </fieldset>

        <fieldset className="form-section">
          <legend>פרטי משלוח</legend>
          <div className="form-grid">
            <TextareaField label="כתובת למשלוח" name="address" control={control} error={errors.address?.message} />
          </div>
        </fieldset>

        <fieldset className="form-section">
          <legend>אישור</legend>
          <div className="form-grid">
            <InputField label="אימייל לאישור" name="email" control={control} error={errors.email?.message} />
          </div>
        </fieldset>

        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit">
          שלח הזמנה
        </motion.button>
      </motion.form>
    </div>
  );
}

function InputField({ label, name, control, error }) {
  return (
    <div className="form-field">
      <label>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input {...field} className={error ? 'error-input' : ''} />
        )}
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

function TextareaField({ label, name, control, error }) {
  return (
    <div className="form-field full-width">
      <label>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <textarea rows="2" {...field} className={error ? 'error-input' : ''} />
        )}
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default OrderFinishPage;
