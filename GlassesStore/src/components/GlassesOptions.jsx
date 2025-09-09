
// // import { useEffect,useState } from 'react';
// //  import { useDispatch, useSelector } from 'react-redux';
 
// // import './GlassesOptions.css'; 

// //  const options = [
// //    { label: 'מרחק', explanation: 'משקפי ראיה למרחק מיועדים למי שזקוקים לשיפור איכות הראיה בעת נהיגה וצפיה בטלויזיה' },
// //    { label: 'קריאה', explanation: 'משקפי ראיה לקריאה הנקראים ליעיתם גם משקפי ראיה מקרוב,מיועדים למי שמתקשה למקד את הראיה בעת קריאת ספר,צפיה במחשב וכד' },
// //    { label: 'מולטיפוקל', explanation: 'עדשות מולטיפוקל מיועדות לבני 40 ומעלה,כפתרון לזוקן ראיה,העדשות אינן מיועדות לטיפול בבעיות ראיה בינוקלריות.'},
// //   { label: 'ללא מרשם', explanation: 'באלכם על השיק משקפי ראיה כאקססוריז מתוחכם?,שמעתם על היתרונות שבעדשות חוסמות אור כחול?אנחנו איתכם! פשוט תלחצו על הכפתור ללא מרשם' },
// // ];

// // function GlassesOptions() {
// //   const [selected, setSelected] = useState(null);
// //   const [rightEye, setRightEye] = useState('');
// //   const [leftEye, setLeftEye] = useState('');
// //   const [modalText, setModalText] = useState(null);

// //   return (
// //     <div className="glasses-container">
// //         <h2>שימוש המשקפיים</h2>
// //       <p>
// // * בהוספת עדשות אופטיות, המחיר ההתחלתי למשקפיים הינו 299.90 ש"ח.</p>
// //       <div className="options-list">
// //         {options.map((opt) => (
// //           <div
// //             key={opt.label}
// //             className={`option-item ${selected === opt.label ? 'selected' : ''}`}
// //             onClick={() => setSelected(opt.label)}
// //           >
// //             <div className="option-label">
            
// //               {/* <span className="icon">👓</span>  */}
// //               <span>{opt.label}</span>
// //             </div>
// //             {/* <div className="option-help" title={opt.explanation}>?</div>
// //             {selected === opt.label && (
// //               <div className="checkmark">
// //                 ✓
// //               </div>
// //             )} */}
// //             <div
// //         className="option-help"
// //         onClick={(e) => {
// //         e.stopPropagation(); // שלא יפעיל בחירת סוג
// //       setModalText(opt.explanation);
// //          }}
// //          >
// //         ?
// //          </div>

// //           </div>
// //         ))}
// //       </div>

// //       {selected && selected !== 'ללא מרשם' && (
// //         <div className="eye-section">
// //           <h5>בחר מספר לעין:</h5>
// //           <div className="eye-inputs">
// //             <label>
// //               עין ימין:
// //               <input
// //                 type="number"
// //                 value={rightEye}
// //                 onChange={(e) => setRightEye(e.target.value)}
// //                 placeholder="לדוג' -1.25"
// //               />
// //             </label>
// //             <label>
// //               עין שמאל:
// //               <input
// //                 type="number"
// //                 value={leftEye}
// //                 onChange={(e) => setLeftEye(e.target.value)}
// //                 placeholder="לדוג' -1.50"
// //               />
// //             </label>
// //           </div>
// //         </div>
// //       )}
// //       {modalText && (
// //   <div className="modal-overlay" onClick={() => setModalText(null)}>
// //     <div className="modal-content" onClick={(e) => e.stopPropagation()}>
// //       <button className="modal-close" onClick={() => setModalText(null)}>✕</button>
// //       <p>{modalText}</p>
// //       <button className="modal-button" onClick={() => {
// //         setModalText(null);
// //         // אפשר להוסיף כאן גם פעולה של "הוספה לסל"
// //       }}>
// //         הוסף לסל
// //       </button>
// //     </div>
// //   </div>
// // )}

// //     </div>
    
// //   );
  
// // }

// // export default GlassesOptions;
// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { addToCart } from '../features/cart/cartSlice'; 
// import { ToastContainer, toast } from 'react-toastify';

// import './GlassesOptions.css';
// const options = [
//   { label: 'מרחק', explanation: 'משקפי ראיה למרחק מיועדים לשיפור איכות הראיה בעת נהיגה וצפיה בטלויזיה.' },
//   { label: 'קריאה', explanation: 'משקפי ראיה לקריאה מיועדים למי שמתקשה למקד את הראיה בעת קריאת ספר, צפיה במחשב וכדומה.' },
//   { label: 'מולטיפוקל', explanation: 'עדשות מולטיפוקל מיועדות לבני 40 ומעלה כפתרון לזוקן ראיה.' },
//   { label: 'ללא מרשם', explanation: 'משקפי ראיה כאקססוריז אופנתי או חוסמי אור כחול? לחצו על "ללא מרשם".' },
// ];

// function GlassesOptions({ product }) {
//   const [selected, setSelected] = useState(null);
//   const [rightEye, setRightEye] = useState('');
//   const [leftEye, setLeftEye] = useState('');
//   const [explanationText, setExplanationText] = useState(null);
//   const dispatch = useDispatch();

// const isNoPrescription = selected === 'ללא מרשם';
// const isValidEyeValue = (val) =>
//   val !== '' && !isNaN(val) && Math.abs(parseFloat(val)) <= 13;

// const canAddToCart =
//   isNoPrescription || (isValidEyeValue(rightEye) && isValidEyeValue(leftEye));

//   return (
//     <div className="glasses-container">
//       <h2>שימוש המשקפיים</h2>
//       <p>* בהוספת עדשות אופטיות, המחיר ההתחלתי למשקפיים הינו 299.90 ש"ח.</p>

//       <div className="options-list">
//         {options.map((opt) => (
//           <div
//             key={opt.label}
//             className={`option-item ${selected === opt.label ? 'selected' : ''}`}
//             onClick={() => setSelected(opt.label)}
//           >
//             <span>{opt.label}</span>
//             <span
//               className="option-help"
//               title="למידע נוסף"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setExplanationText(opt.explanation);
//               }}
//             >
//               ➕
//             </span>
//           </div>
//         ))}
//       </div>

//       {selected && selected !== 'ללא מרשם' && (
//         <div className="eye-section">
//           <h5>בחר מספר לעין:</h5>
//           <div className="eye-inputs">
//             <label>
//               עין ימין:
//               {/* <input
//                 type="number"
//                 value={rightEye}
//                 onChange={(e) => setRightEye(e.target.value)}
//                 placeholder="לדוג' -1.25"
//               /> */}
//               <input
//   type="number"
//   value={rightEye}
//   onChange={(e) => {
//     const val = e.target.value;
//     if (val === '' || Math.abs(parseFloat(val)) <= 13) {
//       setRightEye(val);
//     }
//   }}
//   placeholder="לדוג' -1.25"
//   />
//             </label>
//             <label>
//               עין שמאל:
//               {/* <input
//                 type="number"
//                 value={leftEye}
//                 onChange={(e) => setLeftEye(e.target.value)}
//                 placeholder="לדוג' -1.50"
//               /> */}
//               <input
//   type="number"
//   value={leftEye}
//   onChange={(e) => {
//     const val = e.target.value;
//     if (val === '' || Math.abs(parseFloat(val)) <= 13) {
//       setLeftEye(val);
//     }
//   }}
//   placeholder="לדוג' -1.50"
//  />

//             </label>
//           </div>
//         </div>
//       )}

//       {explanationText && (
//         <div className="modal-overlay" onClick={() => setExplanationText(null)}>
//           <div className="modal-content" role="dialog" aria-modal="true">

//             <button className="modal-close" onClick={() => setExplanationText(null)}>✕</button>
//             <p>{explanationText}</p>
//             <button
//               className="modal-button"
//               onClick={() => {
//                 setExplanationText(null);
                
//               }}
//             >
             
//             </button>
//           </div>
//         </div>
        
//       )}

// {/* <button
//   className="modal-button"
//   onClick={() => {
//     dispatch(addToCart({
//       ...product,
//       lensType: selected,
//       rightEye,
//       leftEye
//     }));
//     setExplanationText(null);
//     toast.success('המוצר נוסף לסל בהצלחה!', {
//   position: 'bottom-right',
//   autoClose: 3000,
// });

//   }}
// >
//   הוסף לסל
// </button> */}
// <button
//   className="modal-button"
//   disabled={!canAddToCart}
//   onClick={() => {
//     dispatch(addToCart({
//       ...product,
//       lensType: selected,
//       rightEye: isNoPrescription ? null : rightEye,
//       leftEye: isNoPrescription ? null : leftEye
//     }));
//     setExplanationText(null);
//     toast.success('המוצר נוסף לסל בהצלחה!', {
//       position: 'bottom-right',
//       autoClose: 3000,
//     });
//   }}
// >
//   הוסף לסל
// </button>

//  <ToastContainer />
//     </div>
//   );
 
// }

// export default GlassesOptions;

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; // ← חדש
import './GlassesOptions.css';

const options = [
  { label: 'מרחק', explanation: 'משקפי ראיה למרחק מיועדים לשיפור איכות הראיה בעת נהיגה וצפיה בטלויזיה.' },
  { label: 'קריאה', explanation: 'משקפי ראיה לקריאה מיועדים למי שמתקשה למקד את הראיה בעת קריאת ספר, צפיה במחשב וכדומה.' },
  { label: 'מולטיפוקל', explanation: 'עדשות מולטיפוקל מיועדות לבני 40 ומעלה כפתרון לזוקן ראיה.' },
  { label: 'ללא מרשם', explanation: 'משקפי ראיה כאקססוריז אופנתי או חוסמי אור כחול? לחצו על "ללא מרשם".' },
];

function GlassesOptions({ product }) {
  const [selected, setSelected] = useState(null);
  const [rightEye, setRightEye] = useState('');
  const [leftEye, setLeftEye] = useState('');
  const [explanationText, setExplanationText] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false); 
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const isNoPrescription = selected === 'ללא מרשם';
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

    setAddedToCart(true); // ← הפעל את המצב
    setExplanationText(null);
  };

  return (
    <div className="glasses-container">
      <h2>שימוש המשקפיים</h2>
      <p>* בהוספת עדשות אופטיות, המחיר ההתחלתי למשקפיים הינו 299.90 ש"ח.</p>

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

      {selected && selected !== 'ללא מרשם' && (
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

export default GlassesOptions;
