import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addToCart } from '../features/cart/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; 



const options = [
  { label: 'מרחק', explanation: 'משקפי ראיה למרחק מיועדים לשיפור איכות הראיה בעת נהיגה וצפיה בטלויזיה.' },
  { label: 'מולטיפוקל', explanation: 'עדשות מולטיפוקל מיועדות לבני 40 ומעלה כפתרון לזוקן ראיה.' },
  { label: 'עדשות צבעוניות', explanation: 'באלך עניים כחולות? ירוקות? או סתם  גיוון? בחרו ב,עדשות צבעוניות' },
];

function ContactLensOptions({ product }) {
  const [selected, setSelected] = useState(null);
  const [rightEye, setRightEye] = useState('');
  const [leftEye, setLeftEye] = useState('');
  const [explanationText, setExplanationText] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false); 
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const isNoPrescription = selected === 'עדשות צבעוניות';
  const isValidEyeValue = (val) =>
    val !== '' && !isNaN(val) && Math.abs(parseFloat(val)) <= 13;

  const canAddToCart =
    isNoPrescription || (isValidEyeValue(rightEye) && isValidEyeValue(leftEye));

  const handleAddToCart = () => {
    const cartItem = {
      ...product,
      lensType: selected,
      rightEye: isNoPrescription ? null : rightEye,
      leftEye: isNoPrescription ? null : leftEye
    };

    dispatch(addToCart(cartItem));
    toast.success('המוצר נוסף לסל בהצלחה!', {
      position: 'bottom-right',
      autoClose: 3000,
    });

    setAddedToCart(true); 
    setExplanationText(null);
  };

  return (
    <div className="glasses-container">
      <h2> שימוש העדשות</h2>
      <div className="options-list">
        {options.map((opt) => (
          <div
            key={opt.label}
            className={`option-item ${selected === opt.label ? 'selected' : ''}`}
            onClick={() => setSelected(opt.label)}
          >
            <span>{opt.label}</span>
            <span
              className="option-help"
              title="למידע נוסף"
              onClick={(e) => {
                e.stopPropagation();
                setExplanationText(opt.explanation);
              }}
            >
              ➕
            </span>
          </div>
        ))}
      </div>

      {selected && selected !== 'עדשות צבעוניות' && (
        <div className="eye-section">
          <h5>בחר מספר לעין:</h5>
          <div className="eye-inputs">
            <label>
              עין ימין:
              <input
                type="number"
                value={rightEye}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === '' || Math.abs(parseFloat(val)) <= 13) {
                    setRightEye(val);
                  }
                }}
                placeholder="לדוג' -1.25"
              />
            </label>
            <label>
              עין שמאל:
              <input
                type="number"
                value={leftEye}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === '' || Math.abs(parseFloat(val)) <= 13) {
                    setLeftEye(val);
                  }
                }}
                placeholder="לדוג' -1.50"
              />
            </label>
          </div>
        </div>
      )}

      {explanationText && (
        <div className="modal-overlay" onClick={() => setExplanationText(null)}>
          <div className="modal-content" role="dialog" aria-modal="true">
            <button className="modal-close" onClick={() => setExplanationText(null)}>✕</button>
            <p>{explanationText}</p>
          </div>
        </div>
      )}

      {addedToCart ? (
        <button className="modal-button" onClick={() => navigate('/cart')}>
          מעבר לסל 🛒
        </button>
      ) : (
        <button
          className="modal-button"
          disabled={!canAddToCart}
          onClick={handleAddToCart}
        >
          הוסף לסל
        </button>
      )}

      <ToastContainer />
    </div>
  );
}

export default ContactLensOptions;