// import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';

// const VirtualTryOn = () => {
//   const location = useLocation();
//   const selectedGlasses = location.state?.product;
//   const [customerImage, setCustomerImage] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState('');

//   // מיקום וגודל המשקפיים - מדינאמיים
//   const [glassesPosition, setGlassesPosition] = useState({ top: 35, left: 25 });
//   const [glassesWidth, setGlassesWidth] = useState(50);

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setCustomerImage(file);
//       setPreviewUrl(URL.createObjectURL(file));
//     }
//   };

//   const handleDrag = (e) => {
//     e.preventDefault();
//     const rect = e.currentTarget.parentElement.getBoundingClientRect();

//     let newLeft = e.clientX - rect.left;
//     let newTop = e.clientY - rect.top;

//     // להבטיח שהערכים יישארו בתוך התמונה
//     if (newLeft < 0) newLeft = 0;
//     if (newLeft > rect.width) newLeft = rect.width;
//     if (newTop < 0) newTop = 0;
//     if (newTop > rect.height) newTop = rect.height;

//     setGlassesPosition({
//       top: (newTop / rect.height) * 100,
//       left: (newLeft / rect.width) * 100,
//     });
//   };

// //   const glassesImage = selectedGlasses?.imgUrl || '';
// const glassesImage=`http://localhost:4000${selectedGlasses.imgUrl}`|| '';
// console.log(selectedGlasses);
//   const hasGlasses = glassesImage.trim() !== '';

//   return (
//     <div className="p-4 max-w-md mx-auto">
//       <h2 className="text-xl font-bold text-center mb-4">✨ מדידת משקפיים וירטואלית</h2>

//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleImageUpload}
//         className="mb-4 block mx-auto"
//       />

//       {previewUrl && hasGlasses ? (
//         <div className="relative w-64 h-64 mx-auto border rounded overflow-hidden shadow">
//           <img
//             src={previewUrl}
//             alt="תמונת לקוח"
//             className="w-full h-full object-cover"
//           />

//           {/* משקפיים עם אפשרות לגרור */}
//           <img
//             src={glassesImage}
//             alt="משקפיים"
//             style={{
//               position: 'absolute',
//               top: `${glassesPosition.top}%`,
//               left: `${glassesPosition.left}%`,
//               width: `${glassesWidth}%`,
//               cursor: 'move',
//               transform: 'translate(-50%, -50%)',
//               opacity: 0.9,
//               pointerEvents: 'auto',
//               userSelect: 'none',
//             }}
//             draggable
//             onDrag={handleDrag}
//           />

//           {/* שליטה על גודל המשקפיים */}
//           <div className="mt-2 flex justify-center gap-2">
//             <label>
//               גודל משקפיים:
//               <input
//                 type="range"
//                 min="20"
//                 max="100"
//                 value={glassesWidth}
//                 onChange={(e) => setGlassesWidth(Number(e.target.value))}
//               />
//             </label>
//           </div>
//         </div>
//       ) : previewUrl && !hasGlasses ? (
//         <p className="text-center text-sm text-red-500 mt-2">
//           אנא בחרי משקפיים תחילה.
//         </p>
//       ) : null}
//     </div>
//   );
// };

// export default VirtualTryOn;
import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const VirtualTryOn = () => {
  const location = useLocation();
  const selectedGlasses = location.state?.product;

  const containerRef = useRef(null);
  const [customerImage, setCustomerImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [glassesPosition, setGlassesPosition] = useState({ top: 40, left: 50 });
  const [glassesWidth, setGlassesWidth] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCustomerImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    let newLeft = e.clientX - rect.left;
    let newTop = e.clientY - rect.top;

    if (newLeft < 0) newLeft = 0;
    if (newLeft > rect.width) newLeft = rect.width;
    if (newTop < 0) newTop = 0;
    if (newTop > rect.height) newTop = rect.height;

    setGlassesPosition({
      top: (newTop / rect.height) * 100,
      left: (newLeft / rect.width) * 100,
    });
  };

  const glassesImageUrl = selectedGlasses?.imgUrl
    ? `http://localhost:4000${selectedGlasses.imgUrl}`
    : null;

  return (
    <div className="p-4 max-w-md mx-auto select-none">
      <h2 className="text-xl font-bold text-center mb-4">✨ מדידת משקפיים וירטואלית</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-4 block mx-auto"
      />

      {previewUrl && (
        <div
          ref={containerRef}
          className="relative w-64 h-64 mx-auto border rounded overflow-hidden shadow"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <img
            src={previewUrl}
            alt="תמונה שלך"
            className="w-full h-full object-cover"
          />

          {glassesImageUrl && (
            <img
              src={glassesImageUrl}
              alt="משקפיים"
              style={{
                position: 'absolute',
                top: `${glassesPosition.top}%`,
                left: `${glassesPosition.left}%`,
                width: `${glassesWidth}%`,
                transform: 'translate(-50%, -50%)',
                cursor: 'grab',
                pointerEvents: 'auto',
                userSelect: 'none',
                opacity: 0.9,
              }}
              onMouseDown={handleMouseDown}
              draggable={false}
            />
          )}
        </div>
      )}

      {previewUrl && glassesImageUrl && (
        <div className="mt-4 text-center">
          <label className="block mb-2">🔧 שנה גודל משקפיים:</label>
          <input
            type="range"
            min="20"
            max="100"
            value={glassesWidth}
            onChange={(e) => setGlassesWidth(Number(e.target.value))}
          />
        </div>
      )}
    </div>
  );
};

export default VirtualTryOn;
